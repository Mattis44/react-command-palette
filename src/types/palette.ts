import type { CSSProperties } from "react";

/** Base commands */
export type Command = {
    id: string;
    icon?: React.ReactNode;
    label: string;
    action?: () => void;

    category: string;
    keywords?: string[];
    helper?: string;
};

export type CommandSource =
    | Command[]
    | Promise<Command[]>
    | (() => Promise<Command[]>)
    | ((query: string) => Promise<Command[]>);

/**
 * Represents the global commands configuration for the command palette.
 *
 * @property shortcut - The character that triggers the global command query (e.g. "/", ">", "@").
 */
export type GlobalCommands = {
    shortcut: string;
    label?: string;
    commands: Omit<Command, "category">[];
    onTrigger?: () => void;
}

export type CommandPaletteOptions = {
    containerStyle?: CSSProperties;
    containerInputFieldStyle?: CSSProperties
    inputFieldStyle?: CSSProperties;

    listStyle?: CSSProperties;
    itemStyle?: CSSProperties;
    categoryItemStyle?: CSSProperties;

    overlayStyle?: CSSProperties;

    helper?: {
        text: string; // Press
        keys: string[]; // ["Enter"]
        description: string; // To run a command

        style?: CSSProperties;
        keyStyle?: CSSProperties; // Main <kbd/> override
    }[];
};

export type CommandPaletteContextValue = {
    isOpen: boolean;
    open: () => void;
    close: () => void;
    toggle: () => void;
    loading: boolean;

    commands: Command[];
    globals?: GlobalCommands;

    options?: CommandPaletteOptions;

    query: string;
    setQuery: (q: string) => void;
};