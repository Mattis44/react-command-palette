import React, { useEffect, useState, createContext, useRef, forwardRef, useImperativeHandle } from "react";

import type { Command, CommandPaletteContextValue, CommandPaletteOptions, CommandSource, GlobalCommands } from "../types/palette";
import type { CommandPaletteApi } from "../types/api"
import { SHORTCUTS, type ShortcutValue } from "../constants/shortcuts";

import { CommandPalette } from "../components/CommandPalette";

function useDebounce<T>(value: T, delay: number) {
    const [debounced, setDebounced] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => setDebounced(value), delay);
        return () => clearTimeout(handler);
    }, [value, delay]);
    return debounced;
}

type CommandPaletteProviderProps = {
    children: React.ReactNode;

    commands?: CommandSource;
    globals?: GlobalCommands;

    options?: CommandPaletteOptions;
    shortcut?: ShortcutValue;

    /**
     * When true, the palette mounts in an open state. Useful for tests and playgrounds.
     */
    initialOpen?: boolean;

    /**
     * Render the default CommandPalette overlay managed by the provider. Disable to supply your own.
     */
    renderPalette?: boolean;

    apiRef?: React.RefObject<CommandPaletteApi | null>;
};

export const CommandPaletteContext = createContext<CommandPaletteContextValue | null>(null);

export const CommandPaletteProvider = forwardRef<CommandPaletteApi, CommandPaletteProviderProps>(({
    children,

    commands: commandsSource,
    globals,

    options = {},
    shortcut = SHORTCUTS.COMMAND, // default to Ctrl+K or Cmd+K
    initialOpen = false,
    renderPalette = true,
    apiRef
}: CommandPaletteProviderProps, ref) => {
    const [commands, setCommands] = useState<Command[]>([]);
    const [isOpen, setIsOpen] = useState<boolean>(initialOpen);
    const [loading, setLoading] = useState<boolean>(false);
    const [query, setQuery] = useState<string>("");
    const [history, setHistory] = useState<string[]>([]);

    const inputId = "input-field-search-command-palette";

    const debouncedQuery = useDebounce(query, 300);
    const lastQueryRef = useRef("");
    const lastGlobalTriggerRef = useRef<string | null>(null);

    const enableHistory = options.enableHistory ?? false;
    const maxHistorySize = options.maxHistorySize ?? 8;

    const addToHistory = React.useCallback((id: string) => {
        if (!enableHistory) return;
        setHistory((prev) => {
            const next = [id, ...prev.filter((existing) => existing !== id)];
            return next.slice(0, maxHistorySize);
        });
    }, [enableHistory, maxHistorySize]);

    useEffect(() => {
        if (!enableHistory) {
            setHistory([]);
            return;
        }
        setHistory((prev) => prev.slice(0, maxHistorySize));
    }, [enableHistory, maxHistorySize]);

    useImperativeHandle(ref, () => ({
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
        toggle: () => setIsOpen(o => !o),
        focus: () => document.getElementById(inputId)?.focus(),
        isOpen: () => isOpen,
        setQuery,
        getQuery: () => query,
        addCommands: (cmds) => setCommands(prev => [...prev, ...cmds]),
        clearCommands: () => setCommands([]),
        logState: () =>
            console.log("[CommandPalette] state", { isOpen, query, commands, history }),
    }));

    useEffect(() => {
        if (!apiRef) return;
        const api: CommandPaletteApi = {
            open: () => setIsOpen(true),
            close: () => setIsOpen(false),
            toggle: () => setIsOpen(o => !o),
            focus: () => document.getElementById(inputId)?.focus(),
            isOpen: () => isOpen,
            setQuery,
            getQuery: () => query,
            addCommands: (cmds) => setCommands(prev => [...prev, ...cmds]),
            clearCommands: () => setCommands([]),
            logState: () =>
                console.log("[CommandPalette] state", { isOpen, query, commands, history }),
        };

        apiRef.current = api;
        return () => {
            if (apiRef.current === api) {
                apiRef.current = null;
            }
        };
    }, [apiRef, isOpen, query, commands, setQuery]);

    useEffect(() => {
        lastGlobalTriggerRef.current = null;
    }, [globals?.shortcut]);

    useEffect(() => {
        const { combo } = shortcut;
        if (!combo) return;

        const parts = combo.split("+");

        const handler = (ev: KeyboardEvent) => {
            if (ev.key === "Escape") {
                if (isOpen) {
                    ev.preventDefault();
                    setIsOpen(false);
                    setQuery("");
                }
                return;
            }

            const isMatch = parts.every((part) => {
                const key = part.toLowerCase().trim();
                if (key === "ctrl") return ev.ctrlKey;
                if (key === "shift") return ev.shiftKey;
                if (key === "alt") return ev.altKey;
                return ev.key.toLowerCase() === key;
            });

            if (isMatch) {
                ev.preventDefault();
                setIsOpen((o) => !o);
                setQuery("");
            }
        };

        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [shortcut, isOpen]);


    useEffect(() => {
        let isMounted = true;

        const resolveCommands = async (): Promise<Command[]> => {
            if (globals && query.startsWith(globals.shortcut)) {
                if (lastGlobalTriggerRef.current !== globals.shortcut) {
                    globals.onTrigger?.();
                    lastGlobalTriggerRef.current = globals.shortcut;
                }

                return globals.commands.map((c) => ({
                    ...c,
                    category: globals.label ?? "Global Commands",
                }));
            }

            lastGlobalTriggerRef.current = null;

            if (!commandsSource) return [];

            if (typeof commandsSource === "object" && "kind" in commandsSource) {
                if (commandsSource.kind === "static") return commandsSource.commands;
                if (commandsSource.kind === "promise") return await commandsSource.promise;
                if (commandsSource.kind === "async") return await commandsSource.loader(debouncedQuery);
            }

            if (Array.isArray(commandsSource)) return commandsSource;
            if (typeof commandsSource === "function") return await commandsSource(debouncedQuery);
            if ("then" in commandsSource) return await commandsSource;

            return [];
        };

        async function load() {
            if (
                typeof commandsSource === "function" &&
                commandsSource.length > 0 &&
                debouncedQuery === lastQueryRef.current &&
                debouncedQuery.trim() !== ""
            ) {
                // avoid duplicate call for same debounced query
                return;
            }

            lastQueryRef.current = debouncedQuery;
            setLoading(true);

            try {
                const result = await resolveCommands();
                if (isMounted) setCommands(result);
            } catch (err) {
                console.error("[CommandPalette] load() failed:", err);
            } finally {
                if (isMounted) setLoading(false);
            }
        }

        load();
        return () => {
            isMounted = false;
        };
    }, [commandsSource, debouncedQuery, query, globals]);

    return (
        <CommandPaletteContext.Provider
            value={{
                isOpen,
                commands,
                options,
                query,
                loading,
                globals,
                history,

                open: () => setIsOpen(true),
                close: () => setIsOpen(false),
                toggle: () => setIsOpen((o) => !o),
                setQuery,
                addToHistory,
            }}
        >
            {children}
            {renderPalette !== false && isOpen && (
                <CommandPalette />
            )}
        </CommandPaletteContext.Provider>
    )
});

CommandPaletteProvider.displayName = "CommandPaletteProvider";