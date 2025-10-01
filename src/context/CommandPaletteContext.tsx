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

    apiRef?: React.RefObject<CommandPaletteApi | null>;
};

export const CommandPaletteContext = createContext<CommandPaletteContextValue | null>(null);

export const CommandPaletteProvider = forwardRef<CommandPaletteApi, CommandPaletteProviderProps>(({
    children,

    commands: commandsSource,
    globals,

    options = {},
    shortcut = SHORTCUTS.COMMAND, // default to Ctrl+K or Cmd+K
    apiRef
}: CommandPaletteProviderProps, ref) => {
    const [commands, setCommands] = useState<Command[]>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [query, setQuery] = useState<string>("");

    const inputId = "input-field-search-command-palette";

    const debouncedQuery = useDebounce(query, 300);
    const lastQueryRef = useRef("");

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
            console.log("[CommandPalette] state", { isOpen, query, commands }),
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
                console.log("[CommandPalette] state", { isOpen, query, commands }),
        };

        apiRef.current = api;
        return () => {
            if (apiRef.current === api) {
                apiRef.current = null;
            }
        };
    }, [apiRef, isOpen, query, commands, setQuery]);

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

        async function load() {
            if (globals && query.startsWith(globals.shortcut)) {
                setCommands(
                    globals.commands.map((c) => ({
                        ...c,
                        category: globals.label ?? "Global Commands",
                    }))
                );
                setLoading(false);
                return;
            }

            if (
                typeof commandsSource === "function" &&
                debouncedQuery === lastQueryRef.current &&
                debouncedQuery.trim() !== ""
            ) return;

            lastQueryRef.current = debouncedQuery;
            setLoading(true);

            try {
                if (typeof commandsSource === "function" && commandsSource.length > 0) {
                    const result = await commandsSource(debouncedQuery);
                    if (isMounted) setCommands(result);
                }
                else if (commandsSource && "then" in commandsSource) {
                    const result = await commandsSource;
                    if (isMounted) setCommands(result);
                }
                else if (typeof commandsSource === "function") {
                    const result = await commandsSource(debouncedQuery);
                    if (isMounted) setCommands(result);
                }
                else {
                    setCommands(commandsSource ?? []);
                }
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

                open: () => setIsOpen(true),
                close: () => setIsOpen(false),
                toggle: () => setIsOpen((o) => !o),
                setQuery,
            }}
        >
            {children}
            {isOpen && (
                <CommandPalette />
            )}
        </CommandPaletteContext.Provider>
    )
});

CommandPaletteProvider.displayName = "CommandPaletteProvider";