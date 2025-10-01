# Hooks

React Command Palette exposes two hooks:

- `useCommandPalette` — access palette state and high-level actions from any component within the provider.
- `useApiRef` — create a ref used to drive the imperative [runtime API](./api.md).

## `useCommandPalette`

This hook returns the context value provided by `CommandPaletteProvider`.

```ts
import { useCommandPalette } from "react-command-palette";

const {
  isOpen,
  open,
  close,
  toggle,
  loading,
  query,
  setQuery,
  commands,
  options,
  globals,
} = useCommandPalette();
```

### Common use cases

- Render a button that opens or closes the palette.
- Display the active shortcut or helper text somewhere else in your UI.
- Build custom analytics around `isOpen` or the current `query`.

Because the hook throws an error outside the provider, you’ll notice issues immediately during development.

## `useApiRef`

`useApiRef` returns a `RefObject<CommandPaletteApi>` that you pass to the provider via the `apiRef` prop. The ref exposes the same methods documented on the [API page](./api.md#methods) and always stays up to date with the latest state.

```tsx
import { CommandPaletteProvider, useApiRef, type Command } from "react-command-palette";

const commands: Command[] = [
  { id: "docs", label: "Open docs", category: "Navigation" },
];

const apiRef = useApiRef();

<CommandPaletteProvider apiRef={apiRef} commands={commands}>
  <button type="button" onClick={() => apiRef.current?.focus()}>
    Focus palette
  </button>
</CommandPaletteProvider>;
```

Use this hook when a component outside the provider tree needs to react to palette state (open/close) or to orchestrate advanced flows such as pre-filling the query.
