# @mattis/react-command-palette

A flexible, accessible command palette component for React applications. Provide instant keyboard-driven navigation, run custom actions, and surface global shortcuts with a single provider.

![npm version](https://img.shields.io/npm/v/%40mattis%2Freact-command-palette?style=flat-square)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/%40mattis%2Freact-command-palette?style=flat-square)
![build](https://img.shields.io/github/actions/workflow/status/mattisnaud/react-command-palette/ci.yml?style=flat-square)
![coverage](https://img.shields.io/codecov/c/github/mattisnaud/react-command-palette?style=flat-square)
![license](https://img.shields.io/github/license/mattisnaud/react-command-palette?style=flat-square)

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Configuring Commands](#configuring-commands)
- [Customising the Palette](#customising-the-palette)
- [Keyboard Shortcuts](#keyboard-shortcuts)
- [Documentation](#documentation)
- [Development](#development)
- [Contributing](#contributing)

## Features
- **Drop-in provider** – Wrap your app with `CommandPaletteProvider` to make the palette available everywhere.
- **Async-ready commands** – Load commands from APIs or other async sources with built-in debounce handling.
- **Global command modes** – Offer alternative contexts (like GitHub-style `/` search) with prefixes and helper text.
- **Design flexibility** – Override every part of the UI with inline styles, helper hints, and layout options.
- **Accessible interactions** – Keyboard navigation, focus management, and customisable shortcuts keep power users in flow.

## Installation

Install the package from npm:

```bash
npm install @mattis/react-command-palette
```

This library follows React 19’s peer dependency requirements. Ensure your project already depends on `react` and `react-dom`.

## Quick Start

```tsx
import { CommandPaletteProvider, SHORTCUTS, type Command } from "@mattis/react-command-palette";

const commands: Command[] = [
  {
    id: "open-settings",
    label: "Open Settings",
    category: "Navigation",
    action: () => alert("Settings opened"),
  },
  {
    id: "create-project",
    label: "Create Project",
    category: "Actions",
    action: () => alert("New project created"),
    keywords: ["new", "add"],
  },
];

export function App() {
  return (
    <CommandPaletteProvider commands={commands} shortcut={SHORTCUTS.COMMAND}>
      <YourApplication />
    </CommandPaletteProvider>
  );
}
```

Wrap your routes or layout with the provider to expose the palette. Users can open it with `⌘K` / `Ctrl+K` by default.

## Configuring Commands

Commands are simple objects describing how each item should behave:

```ts
import type { Command } from "@mattis/react-command-palette";

type Command = {
  id: string;
  icon?: React.ReactNode;
  label: string;
  action?: () => void;
  category: string;
  keywords?: string[];
  helper?: string;
};
```

You can provide commands in three different ways:

1. **Static array** – Pass an array of command objects via the `commands` prop.  
2. **Async function** – Provide a `(query: string) => Promise<Command[]>` to fetch on demand. The query is debounced by default for smoother UX.  
3. **Promise** – Supply a promise that resolves to a command list when the palette mounts.

### Global commands

Use the `globals` prop to define prefix-driven modes, such as `/` to search across entities. These commands appear when the user types the shortcut prefix:

```tsx
<CommandPaletteProvider
  commands={fetchCommands}
  globals={{
    shortcut: "/",
    label: "Global Commands",
    commands: [
      { id: "search-users", label: "Search users", category: "Global", action: () => alert("Searching users…") },
      { id: "search-repos", label: "Search repositories", category: "Global", action: () => alert("Searching repos…") },
    ],
  }}
>
  {children}
</CommandPaletteProvider>
```

## Customising the Palette

Pass a `CommandPaletteOptions` object through the `options` prop to tweak the UI or behaviour. Every key accepts inline `CSSProperties` so you can integrate with your design system without maintaining extra CSS files.

```tsx
import type { CommandPaletteOptions } from "@mattis/react-command-palette";

const options: CommandPaletteOptions = {
  containerStyle: {
    backgroundColor: "#0d1117",
    border: "1px solid #30363d",
    borderRadius: "12px",
  },
  containerInputFieldStyle: {
    padding: "0.5rem 1rem",
  },
  itemStyle: {
    padding: "0.75rem 1rem",
    borderRadius: "8px",
  },
  helper: [
    { text: "Press", keys: ["Enter"], description: "to run a command" },
  ],
  closeOnSelect: false,
};
```

Key highlights:

- **`closeOnSelect`** defaults to `true`. Set it to `false` to keep the palette open after running a command—useful for bulk actions.  
- **`helper` hints** display contextual keyboard tips below the input.  
- **Style overrides** exist for the container, list, items, overlay, categories, and more.  

Explore `docs/guide/customize.md` for a complete breakdown of available options.

## Keyboard Shortcuts

The provider ships with a `SHORTCUTS` helper for common key combos (`⌘K`, `Ctrl+Shift+P`, etc.). You can also pass a custom shortcut definition:

```tsx
<CommandPaletteProvider
  commands={commands}
  shortcut={{ combo: "Ctrl+Shift+P", description: "Open command palette" }}
/>
```

Pressing `Esc` always closes the palette. You can interact with the imperative API via the `apiRef` prop if you need programmatic control.

## Documentation

Full usage guides, API references, and walkthroughs live in the [`docs/`](./docs) directory. You can run the VitePress site locally:

```bash
npm run docs:dev
```

## Development

Clone the repository and install dependencies:

```bash
npm install
```

Available scripts:

- `npm run dev` – Build the library in watch mode with tsup.  
- `npm run build` – Generate the production bundles in `dist/`.  
- `npm run docs:dev` – Start the docs site locally.  
- `npm run docs:build` – Build the static documentation site.  
- `npm run docs:preview` – Preview the generated docs output.  

Before publishing, ensure the build passes and that `dist/` reflects the latest compiled output.

## Contributing

Issues and pull requests are welcome!  
If you’re planning a large contribution, open an issue to discuss your idea first. Follow the existing code style (TypeScript, hooks-based React) and include updates to the documentation when behaviour changes.
