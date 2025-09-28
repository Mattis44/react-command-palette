const isMac = navigator.platform.toUpperCase().includes("MAC");

export const SHORTCUTS = {
  COMMAND: isMac
    ? { combo: "meta+k", display: "⌘+K" }
    : { combo: "ctrl+k", display: "Ctrl+K" },
  SEARCH: isMac
    ? { combo: "meta+p", display: "⌘+P" }
    : { combo: "ctrl+p", display: "Ctrl+P" },
  TOGGLE_THEME: isMac
    ? { combo: "meta+t", display: "⌘+T" }
    : { combo: "ctrl+t", display: "Ctrl+T" },
  TOGGLE_SIDEBAR: isMac
    ? { combo: "meta+b", display: "⌘+B" }
    : { combo: "ctrl+b", display: "Ctrl+B" },
  NEW_FILE: isMac
    ? { combo: "meta+n", display: "⌘+N" }
    : { combo: "ctrl+n", display: "Ctrl+N" },
  OPEN_FILE: isMac
    ? { combo: "meta+o", display: "⌘+O" }
    : { combo: "ctrl+o", display: "Ctrl+O" },
  SAVE_FILE: isMac
    ? { combo: "meta+s", display: "⌘+S" }
    : { combo: "ctrl+s", display: "Ctrl+S" },
  CLOSE_PALETTE: { combo: "escape", display: "Esc" },
} as const;

export type ShortcutValue = (typeof SHORTCUTS)[keyof typeof SHORTCUTS];