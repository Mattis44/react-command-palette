import type { CSSProperties } from "react";

/** Base commands */
export type Command = {
    id: string;
    label: string;
    action?: () => void;

    category?: string;
    keywords?: string[];
};

/**
 * Represents the global commands configuration for the command palette.
 *
 * @property shortcut - The character that triggers the global command query (e.g. "/", ">", "@").
 */
export type GlobalCommands = {
    shortcut: string;
    label?: string;
    commands?: Command[];
    onTrigger?: () => void;
}

export type CommandPaletteOptions = {
    containerStyle?: CSSProperties;
    containerInputFieldStyle?: CSSProperties
    inputFieldStyle?: CSSProperties;
    listStyle?: CSSProperties;
    itemStyle?: CSSProperties;
    overlayStyle?: CSSProperties;
};

export type CommandPaletteContextValue = {
    isOpen: boolean;
    open: () => void;
    close: () => void;
    toggle: () => void;

    commands: Command[];
    globals?: GlobalCommands[];

    options?: CommandPaletteOptions;

    query: string;
    setQuery: (q: string) => void;
};