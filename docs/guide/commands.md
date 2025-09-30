# Events
Commands are the main point of your command palette, allowing you to display and interact with your items. Each command is represented as an object with specific properties.

## Command Structure
Commands are objects with the following structure:

```typescript
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

You can import the `Command` type from the library:

```typescript
import { type Command } from "react-command-palette";
```

## Providing Commands
You can pass your commands statically or dynamically (via API) to the CommandPaletteProvider.

### Static Commands

```javascript
import { CommandPaletteProvider, SHORTCUTS, type Command } from "react-command-palette";

const commands: Command[] = [
  {
    id: "1",
    label: "Open Settings",
    category: "Navigation",
    action: () => alert("Settings opened"),
  },
  {
    id: "2",
    label: "Create Project",
    category: "Actions",
    action: () => alert("New project created"),
    keywords: ["new", "add"],
  },
];

export default function App() {
  return (
    <CommandPaletteProvider commands={commands} shortcut={SHORTCUTS.COMMAND}>
      <div>My App</div>
    </CommandPaletteProvider>
  );
}
```

### Async Commands

The palette supports async loading of commands — perfect for fetching data from APIs.
Your commands prop can be a function returning a Promise<Command[]>.

```javascript
async function fetchCommands(query: string): Promise<Command[]> {
  // Optional query argument for filtering
  const res = await fetch(`/api/commands?q=${query}`);
  const data = await res.json();

  return data.map((item: any) => ({
    id: item.id,
    label: item.name,
    category: "API",
    action: () => console.log("Selected:", item.name),
  }));
}

<CommandPaletteProvider
  commands={fetchCommands}
  shortcut={SHORTCUTS.COMMAND}
/>
```
> The palette automatically debounces API calls (default: 300ms) to prevent spam.

### Helpers (Optional UI hints)

Helpers let you display small tips below the search bar — for example keyboard hints or instructions.

```javascript
<CommandPaletteProvider
  commands={commands}
  shortcut={SHORTCUTS.COMMAND}
  options={{
    helper: [
      {
        text: "Press",
        keys: ["Enter"],
        description: "to run a command",
      },
      {
        text: "Type",
        keys: ["/"],
        description: "to enter global mode",
      },
    ],
  }}
/>
```

### Global Commands

Global commands are special shortcuts triggered by a prefix like / or > — just like on GitHub.

They allow you to define an alternative context, for example, “Search Users” or “Search Projects”.

```javascript
<CommandPaletteProvider
  commands={fetchCommands}
  globals={{
    shortcut: "/",
    label: "Global Commands",
    commands: [
      {
        id: "search-users",
        label: "Search users",
        category: "Global",
        action: () => alert("Searching users..."),
      },
      {
        id: "search-repos",
        label: "Search repositories",
        category: "Global",
        action: () => alert("Searching repos..."),
      },
    ],
  }}
  shortcut={SHORTCUTS.COMMAND}
/>
```

#### Query Behavior

- The search is case-insensitive and matches both label and keywords.
- Async command sources receive the debounced query.
- When in global mode (/), the palette filters text after the shortcut, e.g. /user.

## Example

```javascript
import { CommandPaletteProvider, SHORTCUTS } from "react-command-palette";

async function searchCommands(query: string) {
  return [
    { id: "1", label: `Search for "${query}"`, category: "Search", action: () => alert(query) },
  ];
}

export default function App() {
  return (
    <CommandPaletteProvider
      commands={searchCommands}
      shortcut={SHORTCUTS.COMMAND}
      globals={{
        shortcut: "/",
        label: "Global Search",
        commands: [
          { id: "global-users", label: "Search Users", category: "Global", action: () => alert("Users") },
        ],
      }}
    >
      <div>Type ⌘K or Ctrl+K to open the palette</div>
    </CommandPaletteProvider>
  );
}
```