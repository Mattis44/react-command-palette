# Get Started

React Command Palette helps you ship a GitHub-like launcher that surfaces commands, links, and shortcuts from anywhere in your app.
This guide walks you through installation, setup, and your first commands.

## Installation

### Prerequisites
- A React 18+ project (Vite, Next.js, Remix, CRA, etc.).
- `react` and `react-dom` must be installed as peer dependencies.

Install the library via npm (or your favourite package manager):

```bash
npm install @mattis44/react-command-palette
# or
pnpm add @mattis44/react-command-palette
# or
yarn add @mattis44/react-command-palette
```

## Bootstrapping the provider

Wrap your application with the `CommandPaletteProvider`. This registers the keyboard shortcut, renders the overlay, and provides context for the hooks.

```tsx
import { CommandPaletteProvider, SHORTCUTS } from "@mattis44/react-command-palette";
import type { Command } from "@mattis44/react-command-palette";

const commands: Command[] = [
  {
    id: "open-settings",
    label: "Open Settings",
    category: "Navigation",
    action: () => console.log("Navigating to settings"),
  },
];

export function App() {
  return (
    <CommandPaletteProvider
      commands={commands}
      shortcut={SHORTCUTS.COMMAND} // Ctrl+K / ⌘K
    >
      <YourRoutes />
    </CommandPaletteProvider>
  );
}
```

> The provider automatically injects the default stylesheet (`index.css`). You can override every part of the UI later through the [`options`](./customize.md) prop or your own CSS.

## Adding commands from an API

The `commands` prop accepts either an array **or** an async function that returns a list of commands. Async functions receive the debounced query so you can implement server-side filtering.

```tsx
async function searchCommands(query: string) {
  const response = await fetch(`/api/commands?q=${encodeURIComponent(query)}`);
  const payload = await response.json();

  return payload.map((item: any) => ({
    id: item.id,
    label: item.name,
    category: item.group ?? "Remote",
    action: () => console.log("Selected", item.id),
  }));
}

export function App() {
  return (
    <CommandPaletteProvider commands={searchCommands}>
      <YourRoutes />
    </CommandPaletteProvider>
  );
}
```

The palette debounces calls by 300 ms and caches the last query to avoid firing the same request twice.

## Opening the palette manually

Besides keyboard shortcuts, you can open or close the palette from anywhere using the `useCommandPalette` hook:

```tsx
import { useCommandPalette } from "@mattis44/react-command-palette";

function HeaderShortcut() {
  const { open } = useCommandPalette();
  return (
    <button type="button" onClick={open}>
      Open command palette
    </button>
  );
}
```

For more advanced control (setting queries, appending commands, etc.), use [`useApiRef`](./hooks.md#useapiref) and the imperative [runtime API](./api.md).

## Next steps

- Browse the [Commands guide](./commands.md) for the full command object reference.
- Review [Shortcuts](./shortcuts.md) to customise keyboard triggers and global modes.
- Visit [Customize](./customize.md) to tailor the layout, overlay, and helper hints.
