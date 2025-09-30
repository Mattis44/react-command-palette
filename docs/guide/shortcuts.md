# Shortcuts

Shortcuts define how users open the command palette or trigger special modes.
By default, React Command Palette comes with cross-platform key combos (Ctrl+K or ⌘K).

You can use the built-in shortcuts from SHORTCUTS, or provide your own custom key combination.

## Shortcut Constants

The library provides a set of predefined shortcuts for both Windows and Mac users.

```javascript
import { SHORTCUTS, type ShortcutValue } from "react-command-palette";
```

Example:

```javascript
SHORTCUTS.COMMAND        // "⌘+K" (Mac) or "Ctrl+K" (Windows)
SHORTCUTS.COMMAND_P      // "⌘+P" or "Ctrl+P"
SHORTCUTS.COMMAND_SHIFT_P // "⌘+Shift+P" or "Ctrl+Shift+P"
SHORTCUTS.HELP           // "⌘+/" or "Ctrl+/"
SHORTCUTS.TOGGLE_THEME   // "⌘+T" or "Ctrl+T"
```

You can use these values directly in your provider:

```javascript
<CommandPaletteProvider shortcut={SHORTCUTS.COMMAND}>
  <App />
</CommandPaletteProvider>
```

## Custom Shortcuts

You can define your own key combination using the valid object structure, for example:

```javascript
<CommandPaletteProvider
    shortcut={{ combo: "shift+k", display: "Shift+K"}}
>
</CommandPaletteProvider>
```

## Shortcut Constants Reference

| Name                        | Windows/Linux | macOS    | Description                 |
| --------------------------- | ------------- | -------- | --------------------------- |
| `SHORTCUTS.COMMAND`         | Ctrl+K        | ⌘K       | Default to open the palette |
| `SHORTCUTS.COMMAND_P`       | Ctrl+P        | ⌘P       | Alternate open shortcut     |
| `SHORTCUTS.COMMAND_SHIFT_P` | Ctrl+Shift+P  | ⌘Shift+P | Open in “command mode”      |
| `SHORTCUTS.HELP`            | Ctrl+/        | ⌘/       | Show help                   |
| `SHORTCUTS.TOGGLE_THEME`    | Ctrl+T        | ⌘T       | Toggle app theme            |
| `SHORTCUTS.TOGGLE_SIDEBAR`  | Ctrl+B        | ⌘B       | Example custom usage        |
