import { useContext } from "react";
import { CommandPaletteContext } from "../context/CommandPaletteContext";

export function useCommandPalette() {
    const ctx = useContext(CommandPaletteContext);
    if (!ctx) throw new Error("useCommandPalette must be used within provider.");
    return ctx;
}