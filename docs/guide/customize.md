# Customize
You can easily customize the look and feel of the Command Palette using the options prop.
This prop accepts a CommandPaletteOptions object, which allows you to style every part of the palette — container, input field, items, categories, and more.

The component is designed with inline style overrides in mind, meaning you can directly inject CSSProperties objects to change visuals without touching CSS files.

## Options Structure
```javascript
type CommandPaletteOptions = {
  containerStyle?: CSSProperties;
  containerInputFieldStyle?: CSSProperties;
  inputFieldStyle?: CSSProperties;

  listStyle?: CSSProperties;
  itemStyle?: CSSProperties;
  categoryItemStyle?: CSSProperties;

  overlayStyle?: CSSProperties;

  closeOnSelect?: boolean;

  helper?: {
    text: string;            // e.g. "Press"
    keys: string[];          // e.g. ["Enter"]
    description: string;     // e.g. "to run a command"
    style?: CSSProperties;   // Custom style for the helper container
    keyStyle?: CSSProperties; // Custom style for the <kbd> elements
  }[];
};
```

## Skeleton
![Command Palette Skeleton](/doc_style.png)

## Example Usage
You can pass your customization directly through the options prop of the CommandPaletteProvider.
```javascript
import { CommandPaletteProvider, SHORTCUTS } from "react-command-palette";
import SearchIcon from "./SearchIcon";

const customOptions = {
  containerStyle: {
    backgroundColor: "#0d1117",
    border: "1px solid #30363d",
    borderRadius: "12px",
    padding: "1rem",
  },
  containerInputFieldStyle: {
    borderBottom: "1px solid #30363d",
    padding: "0.5rem 1rem",
  },
  inputFieldStyle: {
    color: "#fff",
    fontSize: "1rem",
    outline: "none",
  },
  itemStyle: {
    padding: "0.75rem 1rem",
    borderRadius: "8px",
    cursor: "pointer",
  },
  categoryItemStyle: {
    fontSize: "0.75rem",
    color: "#aaa",
    padding: "0.25rem 1rem",
    textTransform: "uppercase",
  },
  helper: [
    {
      text: "Press",
      keys: ["Enter"],
      description: "to run a command",
      style: { color: "#999", fontSize: "0.85rem" },
      keyStyle: {
        backgroundColor: "#1f6feb",
        color: "white",
        borderRadius: "4px",
        padding: "2px 6px",
      },
    },
  ],
};

export default function App() {
  return (
    <CommandPaletteProvider
      shortcut={SHORTCUTS.COMMAND}
      commands={[
        { id: "1", label: "Say Hello", category: "General", action: () => alert("Hello!") },
      ]}
      options={customOptions}
    >
      <button onClick={() => console.log("Open with ⌘+K or Ctrl+K")}>Open Palette</button>
    </CommandPaletteProvider>
  );
}
```

## Customizable Sections
| Option                     | Description                                                                              |
| -------------------------- | ---------------------------------------------------------------------------------------- |
| `containerStyle`           | Styles the main wrapper of the command palette (positioned in the center of the screen). |
| `containerInputFieldStyle` | Styles the section containing the search input and icons.                                |
| `inputFieldStyle`          | Directly styles the text input (placeholder, font, colors…).                             |
| `listStyle`                | Styles the list container that holds all commands.                                       |
| `itemStyle`                | Styles each individual command item (hover, spacing, layout).                            |
| `categoryItemStyle`        | Styles the category headers shown before each command group.                             |
| `overlayStyle`             | Styles the background overlay that appears behind the command palette.                   |
| `closeOnSelect`            | Controls whether the palette automatically closes after running a command (default: `true`). |
| `helper`                   | Defines helper hints (bottom text with keyboard keys like “Press ⏎ to confirm”).         |


## Example Result
With the example above, your palette will:

- Use a dark GitHub-like theme.

- Show a helper under the input: “Press ⏎ to run a command”.

- Render items with rounded corners and soft spacing.

- Use a styled input with white text and no borders.

## Keeping the palette open after selecting a command

By default the palette closes immediately after executing a command. If you need to run multiple actions in a row — for example when building a bulk-selection workflow — you can disable this behaviour with the `closeOnSelect` option.

```tsx
<CommandPaletteProvider
  commands={commands}
  options={{
    closeOnSelect: false,
  }}
>
  {children}
</CommandPaletteProvider>
```

When `closeOnSelect` is set to `false`, the command palette will remain visible after a command runs, allowing the user to trigger additional actions without reopening it.

