---
outline: deep
---

# Examples

A few end-to-end examples showing how to compose the building blocks exposed by React Command Palette.

## Basic palette with static commands

```tsx
import { CommandPaletteProvider, SHORTCUTS, type Command } from "react-command-palette";

const commands: Command[] = [
  { id: "docs", label: "Open documentation", category: "Navigation", action: () => window.open("/docs", "_self") },
  { id: "create-issue", label: "Create issue", category: "Actions", action: () => console.log("Creating issue") },
];

export function App() {
  return (
    <CommandPaletteProvider commands={commands} shortcut={SHORTCUTS.COMMAND}>
      <YourApp />
    </CommandPaletteProvider>
  );
}
```

## Async commands with helpers

```tsx
async function searchDocs(query: string) {
  const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
  const data = await res.json();

  return data.results.map((result: any) => ({
    id: result.id,
    label: result.title,
    category: result.section,
    action: () => window.open(result.url, "_blank"),
  }));
}

<CommandPaletteProvider
  commands={searchDocs}
  options={{
    helper: [
      { text: "Use", keys: ["↑", "↓"], description: "to navigate" },
      { text: "Press", keys: ["Enter"], description: "to run a command" },
    ],
  }}
/>;
```

## Global mode to jump between resources

```tsx
<CommandPaletteProvider
  commands={searchDocs}
  globals={{
    shortcut: ">",
    label: "Jump to",
    commands: [
      { id: "goto-issues", label: "Issues", action: () => window.open("/issues", "_self") },
      { id: "goto-pull-requests", label: "Pull requests", action: () => window.open("/pulls", "_self") },
    ],
  }}
/>;
```

## Imperative control with `useApiRef`

```tsx
import { CommandPaletteProvider, useApiRef } from "react-command-palette";

function PaletteToggle() {
  const apiRef = useApiRef();

  return (
    <CommandPaletteProvider commands={[]} apiRef={apiRef}>
      <button type="button" onClick={() => apiRef.current?.open()}>
        Open command palette
      </button>
    </CommandPaletteProvider>
  );
}
```

Combine these snippets with the guides in the sidebar to tailor the palette to your product.
