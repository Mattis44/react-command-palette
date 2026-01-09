import type { CSSProperties, ReactNode } from "react";

export type MaybePromise<T> = T | Promise<T>;

/** Base commands */
export type Command = {
    id: string;
    icon?: React.ReactNode;
    label: string;
    action?: () => MaybePromise<void>;

    category: string;
    keywords?: string[];
    helper?: string;
};

type StaticCommandSource = { kind: "static"; commands: Command[] };
type PromiseCommandSource = { kind: "promise"; promise: Promise<Command[]> };
type AsyncCommandSource = { kind: "async"; loader: (query: string) => Promise<Command[]> };

/**
 * CommandSource supports legacy forms and discriminated unions for stricter typing.
 */
export type CommandSource =
    | Command[]
    | Promise<Command[]>
    | (() => Promise<Command[]>)
    | ((query: string) => Promise<Command[]>)
    | StaticCommandSource
    | PromiseCommandSource
    | AsyncCommandSource;

/**
 * Represents the global commands configuration for the command palette.
 *
 * @property shortcut - The character that triggers the global command query (e.g. "/", ">", "@").
 * @property onTrigger - Optional callback fired once each time the user enters global mode, after the palette swaps to the global command list.
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
    /** Style applied when an item is hovered */
    itemHoverStyle?: CSSProperties;
    /** Style applied when an item is active/selected */
    itemActiveStyle?: CSSProperties;
    itemStyle?: CSSProperties;
    categoryItemStyle?: CSSProperties;

    /** Style applied to highlighted text inside results. */
    highlightStyle?: CSSProperties;

    overlayStyle?: CSSProperties;

    closeOnSelect?: boolean;
    /** Enable storing and resurfacing recently used commands. */
    enableHistory?: boolean;
    /** Max number of commands kept in history (default: 8). */
    maxHistorySize?: number;
    /** Limit the number of displayed commands (after filtering). */
    maxResults?: number;

    /** Customize the list scrollbar via CSS variables applied inline */
    listScrollbar?: {
        /** Width of the scrollbar (e.g., '10px') */
        width?: number | string;
        /** Thumb color (e.g., 'rgba(255,255,255,0.18)') */
        thumbColor?: string;
        /** Thumb hover color */
        thumbHoverColor?: string;
        /** Track color */
        trackColor?: string;
    };

    /** Customize animations. All values are optional. */
    animations?: {
        /** Enable/disable palette animations (default: true). */
        enabled?: boolean;
        /** Duration in milliseconds (default: 180). */
        durationMs?: number;
        /** CSS easing string (default: cubic-bezier(0.22, 1, 0.36, 1)). */
        easing?: string;
    };

    fuzzySearch?: {
        /** Threshold for fuzzy matching. Lower = more strict (0.0 - 1.0). Default: 0.4 */
        threshold?: number;
        /** Minimum character length for a match. Default: 1 */
        minMatchCharLength?: number;
    };

    /** Custom empty state. Accepts a ReactNode or a function of the current query. */
    emptyState?: ReactNode | ((query: string) => ReactNode);

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

    /** Recently executed command ids (most recent first) */
    history: string[];
    addToHistory: (id: string) => void;
};