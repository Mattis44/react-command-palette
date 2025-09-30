# Props
Here is a list of all the props that can be used in the `PaletteCommandProvider` component

## List of Props
`*: Required`

`?: Optional`

| Prop Name   | Type                                     | Default             | Description                                                                                                                                                                                         |
| ----------- | ---------------------------------------- | ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `commands*` | `Command[]` | `() => Promise<Command[]>` | `[]`                | The main list of [commands](./commands.md) to display inside the palette. You can pass a static array or an async function that returns commands (with optional query filtering).                   |
| `shortcut?` | `ShortcutValue`                          | `SHORTCUTS.COMMAND` | Defines the keyboard combination that opens the palette. You can use built-in shortcuts or define your own (e.g. `"Ctrl+Shift+K"`). See [Shortcuts](./shortcuts.md).                                |
| `options?`  | `CommandPaletteOptions`                  | `{}`                | Customize layout, style, and helper hints. Includes keys like `containerStyle`, `inputFieldStyle`, and `helper`. See [Options](./options.md) for details.                                           |
| `globals?`  | `GlobalCommands`                         | `undefined`         | Defines a **global mode**, triggered by a prefix (like `/` or `>`), that loads a static set of commands. Useful for GitHub-style global searches. See [Commands](./commands.md#🌐-global-commands). |
| `children*` | `React.ReactNode`                        | `undefined`         | The main application tree that should be wrapped by the provider. The palette will appear over this content when opened.                                                                            |


::: warning 
use `apiRef` prop only if you need to access the calendar API methods imperatively. Most use cases can be handled declaratively through props and callbacks.
:::

##  Usage Example
```javascript
import { FastCalendar } from "fast-react-calendar";
import { useEvents, type CalendarEvent } from "fast-react-calendar";

const fetchEvents = async (): Promise<CalendarEvent[]> => {
    // Fetch events from an API or database
    return events;
};
const { events, loading, error, refresh } = useEvents({ fetchEvents });
const apiRef = useApiRef();

return (
    <FastCalendar
        apiRef={apiRef}
        events={events}
        locale="fr-FR"
        onAddEvent={(event) => console.log("Event added:", event)}
        onDeleteEvent={(event) => console.log("Event deleted:", event)}
        onUpdateEvent={(event) => console.log("Event updated:", event)}
        dataState={{ loading, error, refresh }}
    />
);
```