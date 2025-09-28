import React, { useEffect, useState, createContext } from "react";

import type { Command, CommandPaletteContextValue, CommandPaletteOptions, GlobalCommands } from "../types/palette";
import { SHORTCUTS, type ShortcutValue } from "../constants/shortcuts";

import { CommandPalette } from "../components/CommandPalette";

type CommandPaletteProviderProps = {
    children: React.ReactNode;

    commands?: Command[];
    globals?: GlobalCommands[];

    options?: CommandPaletteOptions;
    shortcut?: ShortcutValue;
};
export const CommandPaletteContext = createContext<CommandPaletteContextValue | null>(null);

export const CommandPaletteProvider = ({
    children,

    commands = [],
    globals = [],

    options = {},
    shortcut = SHORTCUTS.COMMAND, // default to Ctrl+K or Cmd+K
}: CommandPaletteProviderProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(true);
    const [query, setQuery] = useState<string>("");

    useEffect(() => {
        const { combo } = shortcut;
        if (!combo) return;

        const parts = combo.split("+");

        const handler = (ev: KeyboardEvent) => {
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
            }
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [shortcut])

    return (
        <CommandPaletteContext.Provider
            value={{
                isOpen,
                commands,
                options,
                query,

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
};