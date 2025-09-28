import type { CSSProperties } from "react";

export function mergeStyle(defaults: CSSProperties, overrides?: CSSProperties) {
  return { ...defaults, ...overrides };
}
