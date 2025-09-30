// src/types/api.ts
import type { Command } from "./palette";

export type CommandPaletteApi = {
  /** Opens the command palette */
  open: () => void;

  /** Closes the command palette */
  close: () => void;

  /** Toggles between open and closed */
  toggle: () => void;

  /** Focuses the search input if available */
  focus: () => void;

  /** Returns whether the palette is currently open */
  isOpen: () => boolean;

  /** Updates the current search query */
  setQuery: (q: string) => void;

  /** Returns the current query */
  getQuery: () => string;

  /** Adds new commands dynamically */
  addCommands: (cmds: Command[]) => void;

  /** Clears all commands */
  clearCommands: () => void;

  /** Logs internal state (for debugging) */
  logState?: () => void;
};
