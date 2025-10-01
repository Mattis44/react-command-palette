::: warning WARNING
Use this API only if necessary. Most use cases can be handled with props and state.
:::
# Api
The `apiRef` allows you to programmatically control the Command Palette — open or close it, update its query, add commands dynamically, and more.
This is useful if you want to trigger or modify the palette outside of its default keyboard shortcut.

For example, if you want to open the palette programmatically in a component higher up in the tree, or if you want to add commands based on user actions.

## Methods
| Method                             | Description                                                                                |
| ---------------------------------- | ------------------------------------------------------------------------------------------ |
| `open()`                           | Opens the command palette.                                                                 |
| `close()`                          | Closes the command palette.                                                                |
| `toggle()`                         | Toggles the palette open/close state.                                                      |
| `focus()`                          | Focuses the search input field if the palette is open.                                     |
| `isOpen()`                         | Returns `true` if the palette is currently open.                                           |
| `setQuery(query: string)`          | Programmatically sets the search query text.                                               |
| `getQuery()`                       | Returns the current search query value.                                                    |
| `addCommands(commands: Command[])` | Dynamically appends one or multiple commands to the existing list.                         |
| `clearCommands()`                  | Removes all registered commands.                                                           |
| `logState()`                       | Logs the current palette state (open state, query, commands) to the console for debugging. |


## Accessing the API
You can use the `useApiRef` hook to create a reference, and pass it to the `CommandPaletteProvider` via the apiRef prop.
This gives you full programmatic control over the Command Palette.
```javascript
import { CommandPaletteProvider, useApiRef, type Command } from "react-command-palette";
import { useEffect } from "react";

const commands: Command[] = [
  { id: "1", label: "Say Hello", action: () => alert("Hello!"), category: "Example" },
];

export default function App() {
  const apiRef = useApiRef();

  useEffect(() => {
    // Open palette and set query on mount
    apiRef.current?.open();
    apiRef.current?.setQuery("search");
  }, [apiRef]);

  const addDynamicCommand = () => {
    apiRef.current?.addCommands([
      { id: "new", label: "Dynamic Command", category: "Added", action: () => alert("New Command!") },
    ]);
  };

  return (
    <CommandPaletteProvider
      apiRef={apiRef}
      commands={commands}
    >
      <button onClick={() => apiRef.current?.toggle()}>Toggle Palette</button>
      <button onClick={addDynamicCommand}>Add Command</button>
    </CommandPaletteProvider>
  );
}
```

## Example Use Cases

- Open the palette automatically when a user presses a custom button.

- Pre-fill the search query when navigating between app sections.

- Dynamically inject new commands based on app context or API results.

- Reset or clear commands after certain actions.