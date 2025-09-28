import "./index.css";

export { CommandPaletteProvider } from "./context/CommandPaletteContext";
export { useCommandPalette } from "./hooks/useCommandPalette";
export type { Command, CommandPaletteContextValue } from "./types/palette";
export { SHORTCUTS, type ShortcutValue } from "./constants/shortcuts";