# Props

`CommandPaletteProvider` accepts a small set of props to configure shortcuts, provide commands, and customise the UI. This page summarises every option with defaults and usage notes.

## Component signature

```tsx
<CommandPaletteProvider
  commands={commands}
  globals={globals}
  options={options}
  shortcut={SHORTCUTS.COMMAND}
  apiRef={apiRef}
>
  {children}
</CommandPaletteProvider>
```

## Prop reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `commands` | [`CommandSource`](./commands.md#command-sources) | `[]` | Primary list of commands to render. Accepts an array, promise, or async function receiving the current query. |
| `globals` | [`GlobalCommands`](./commands.md#global-commands) | `undefined` | Configure a prefixed “global mode” (e.g. `/` or `>`). When triggered, the palette swaps to these commands and fires the optional `onTrigger` callback once. |
| `options` | [`CommandPaletteOptions`](./customize.md#options-structure) | `{}` | Inline style overrides and behavioural toggles (helpers, `closeOnSelect`, overlay styling, etc.). |
| `shortcut` | [`ShortcutValue`](./shortcuts.md) | `SHORTCUTS.COMMAND` | Keyboard combo that toggles the palette. Accepts a preset or a `{ combo, display }` object. |
| `apiRef` | `RefObject<CommandPaletteApi>` | `undefined` | Exposes the [imperative API](./api.md#methods) so you can open, close, or update the palette outside React state. The ref value is `null` until the provider mounts. |
| `children` | `React.ReactNode` | **required** | Your application tree. The palette is rendered above these children when opened. |

## Notes

- `commands` is optional — you can provide an empty array and dynamically add items later via `apiRef.current?.addCommands()`.
- When both `commands` and `globals` are provided, global commands take precedence while the user types the configured prefix.
- `options.closeOnSelect` defaults to `true`. Set it to `false` if you need to trigger multiple actions without closing the palette between selections.
- Any shortcut registered by the provider also listens for `Escape` to close the palette and clear the query.

## Example

```tsx
import {
  CommandPaletteProvider,
  SHORTCUTS,
  useApiRef,
  type Command,
} from "@mattis/react-command-palette";

const commands: Command[] = [
  { id: "docs", label: "Open documentation", category: "Navigation" },
  { id: "create", label: "Create issue", category: "Actions" },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const apiRef = useApiRef();

  return (
    <CommandPaletteProvider
      commands={commands}
      shortcut={SHORTCUTS.COMMAND_P}
      options={{
        helper: [
          { text: "Press", keys: ["Enter"], description: "to run command" },
          { text: "Type", keys: ["/"], description: "for global mode" },
        ],
      }}
      apiRef={apiRef}
    >
      {children}
    </CommandPaletteProvider>
  );
}
```
