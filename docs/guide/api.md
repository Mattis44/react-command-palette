# API

The imperative API gives you programmatic control over the command palette. You can open/close it, inspect its state, or add commands dynamically — perfect for integrating custom UI triggers or analytics.

::: warning
Reach for the API only when necessary. Most scenarios can be handled declaratively via props and React state.
:::

## Accessing the API

Use the `useApiRef` hook to create a ref and pass it to the provider via the `apiRef` prop. The ref is populated once the provider mounts.

```tsx
import {
  CommandPaletteProvider,
  useApiRef,
  type Command,
} from "react-command-palette";
import { useEffect } from "react";

const commands: Command[] = [
  { id: "hello", label: "Say hello", category: "Example", action: () => alert("Hello!") },
];

export function App() {
  const apiRef = useApiRef();

  useEffect(() => {
    apiRef.current?.open();
    apiRef.current?.setQuery("search");
  }, [apiRef]);

  return (
    <CommandPaletteProvider commands={commands} apiRef={apiRef}>
      <button type="button" onClick={() => apiRef.current?.toggle()}>
        Toggle palette
      </button>
    </CommandPaletteProvider>
  );
}
```

The ref value is `null` on the server and until the provider mounts on the client.

## Methods

| Method | Description |
| --- | --- |
| `open()` | Opens the palette. |
| `close()` | Closes the palette. |
| `toggle()` | Toggles the palette open/closed. |
| `focus()` | Focuses the search input if the palette is open. |
| `isOpen()` | Returns `true` if the palette is currently open. |
| `setQuery(query: string)` | Updates the search query programmatically. |
| `getQuery()` | Returns the current search query. |
| `addCommands(commands: Command[])` | Appends additional commands to the existing list. |
| `clearCommands()` | Removes all commands. |
| `logState()` | Logs `{ isOpen, query, commands }` for debugging. |

All methods are stable across renders and always read the latest state thanks to internal refs.

## Example use cases

- Provide a custom “Command Palette” button in your header that calls `apiRef.current?.open()`.
- Pre-fill the search query after navigating to a specific route.
- Append contextual commands (e.g. document actions) when a certain view mounts, then call `clearCommands()` when it unmounts.
- Inspect the palette state in development by calling `logState()` from the browser console.
