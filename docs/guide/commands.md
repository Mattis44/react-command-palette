# Commands

Commands power the palette. Each command describes what should appear in the list (icon, label, helper text) and which action to run when selected. This guide covers the command shape, how to load them, and how global modes work.

::: info
When a command’s `action` completes, the palette closes automatically. Set [`options.closeOnSelect`](./customize.md#keeping-the-palette-open-after-selecting-a-command) to `false` if you want to keep it open.
:::

## Command structure

```ts
import type { Command } from "@mattis44/react-command-palette";

const command: Command = {
  id: "open-settings",     // Unique identifier used as React key
  icon: <SettingsIcon />,    // Optional React node rendered before the label
  label: "Open Settings",   // Main text shown in the list
  action: () => {},          // Invoked when the user selects the command
  category: "Navigation",   // Group header used for sorting + separators
  keywords: ["preferences"],// Extra search terms
  helper: "⌘ ,",             // Optional hint rendered on the right
};
```

All properties are optional except `id`, `label`, and `category`.

## Command sources

The `commands` prop accepts several shapes so you can keep data static, fetch it on demand, or resolve it later.

| Type | Description |
| --- | --- |
| `Command[]` | Static list loaded on mount. |
| `Promise<Command[]>` | Promise resolved once when the provider mounts. Useful for lazy imports. |
| `() => Promise<Command[]>` | Async loader invoked immediately, without receiving the search query. |
| `(query: string) => Promise<Command[]>` | Async loader invoked with the debounced search term. Ideal for API-backed search. |

When you provide an async function, it is called with the **debounced query** (300 ms) to prevent duplicate requests. The provider also caches the last query so it won’t refetch with the exact same term twice in a row.

## Static example

```tsx
import { CommandPaletteProvider, type Command } from "@mattis44/react-command-palette";

const commands: Command[] = [
  {
    id: "new-project",
    label: "Create project",
    category: "Actions",
    action: () => alert("Creating project"),
    keywords: ["new", "add"],
  },
  {
    id: "goto-settings",
    label: "Open settings",
    category: "Navigation",
    action: () => alert("Opening settings"),
    helper: "S",
  },
];

export function App() {
  return (
    <CommandPaletteProvider commands={commands}>
      <YourApp />
    </CommandPaletteProvider>
  );
}
```

## Async example

```tsx
async function fetchRemoteCommands(query: string) {
  const res = await fetch(`/api/commands?q=${encodeURIComponent(query)}`);
  const data = await res.json();

  return data.items.map((item: any) => ({
    id: item.id,
    label: item.title,
    category: item.group,
    action: () => window.open(item.url, "_blank"),
  }));
}

<CommandPaletteProvider commands={fetchRemoteCommands} />;
```

> Errors thrown inside your loader are caught and logged as `[CommandPalette] load() failed` without breaking the app.

## Helpers (optional UI hints)

Helpers display small tips below the search input (e.g. keyboard hints). Provide them via `options.helper`:

```tsx
<CommandPaletteProvider
  commands={commands}
  options={{
    helper: [
      { text: "Press", keys: ["Enter"], description: "to run a command" },
      { text: "Type", keys: ["/"], description: "for global mode" },
    ],
  }}
/>
```

## Global commands

Global commands let you trigger a dedicated command set using a prefix such as `/`, `>`, or `?`. This behaves like GitHub’s global search.

```tsx
<CommandPaletteProvider
  commands={fetchRemoteCommands}
  globals={{
    shortcut: "/",
    label: "Global commands",
    commands: [
      { id: "search-users", label: "Search users", action: () => console.log("Users"), helper: "Enter" },
      { id: "search-repos", label: "Search repositories", action: () => console.log("Repos") },
    ],
    onTrigger: () => console.log("Entered global mode"),
  }}
/>
```

Behaviour notes:

- The palette stays in global mode while the query starts with the prefix (e.g. `/users`).
- `globals.onTrigger` fires **once** every time the user transitions into global mode. Use it to lazy-load data or track analytics.
- Global commands inherit the `label` as their category so they group nicely in the list.

## Query behaviour

- Matching is case-insensitive and checks both `label` and `keywords`.
- When using async loaders, the current debounced query is passed in, so you can filter server-side.
- The palette displays “Loading commands…” while fetching initial data, and “Searching for …” while filtering an existing list.
