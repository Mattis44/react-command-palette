# Shortcuts

Shortcuts define how users open the palette or trigger special modes. React Command Palette ships with platform-aware presets and lets you register your own key combos.

## Built-in shortcuts

Import `SHORTCUTS` to access ready-to-use combinations. Each preset displays a macOS-friendly symbol but falls back to the Windows/Linux equivalent automatically.

```ts
import { SHORTCUTS } from "@mattis44/react-command-palette";

SHORTCUTS.COMMAND         // ⌘K / Ctrl+K
SHORTCUTS.COMMAND_P       // ⌘P / Ctrl+P
SHORTCUTS.COMMAND_SHIFT_P // ⌘⇧P / Ctrl+Shift+P
SHORTCUTS.HELP            // ⌘/ / Ctrl+/
```

Use them in the provider:

```tsx
<CommandPaletteProvider shortcut={SHORTCUTS.COMMAND}>
  <App />
</CommandPaletteProvider>
```

The provider automatically listens for `Escape` to close the palette and clear the current query.

## Custom shortcuts

You can supply your own shortcut by passing an object with two fields:

```ts
import type { ShortcutValue } from "@mattis44/react-command-palette";

const myShortcut: ShortcutValue = {
  combo: "ctrl+shift+l", // actual keyboard event combo to listen for
  display: "Ctrl+Shift+L", // string rendered in the UI helper
};
```

The `combo` string is split on `+` and matched against `KeyboardEvent` modifiers (`ctrl`, `alt`, `shift`) and the final key. Keys are matched case-insensitively.

## Global prefixes

Global commands use a different mechanism: instead of key combos, you provide a **prefix** (single character) via the `globals.shortcut` option. When the user types this prefix as the first character of their query, the palette swaps to the global command list. See the [Global commands section](./commands.md#global-commands) for details.

## Server-side rendering

Shortcut detection only runs in the browser. Guards inside the library ensure `navigator` and `window` access is skipped during SSR, so you can safely use the provider in Next.js or Remix without additional checks.
