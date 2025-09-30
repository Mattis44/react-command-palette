import { useRef } from "react";
import type { CommandPaletteApi } from "../types/api";

/**
 * Creates a ref to control the Command Palette imperatively.
 *
 * @example
 * const apiRef = useApiRef();
 * apiRef.current?.open();
 */
export function useApiRef() {
    return useRef<CommandPaletteApi>(null);
}