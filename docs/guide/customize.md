# Customize
You can customize the `FastCalendar` component in several ways to fit your application's needs.
::: danger IN PROGRESS
This prop is still under development. Please wait for a pull request to be merged before using it.
:::
## Custom Components
You can override the default components used in the calendar by providing a `components` prop. This allows you to customize the appearance and behavior of various parts of the calendar.
```javascript
import { FastCalendar, CalendarComponents } from "fast-react-calendar";
import { MyCustomHeader } from "./MyCustomHeader";
const customComponents: CalendarComponents = {
    Header: MyCustomHeader,
    // You can override other components as needed
};
const MyCalendar = () => {
    return (
        <FastCalendar
            components={customComponents}
            // other props...
        />
    );
};
```
## Custom Styles
You can customize the styles of the calendar using the `sx` prop, which accepts a style object compatible with MUI's styling system. This allows you to apply custom styles to the calendar and its components.
```javascript
const MyCalendar = () => {
    return (
        <FastCalendar
            sx={{
                // Custom styles here
                backgroundColor: "lightblue",
                "& .fast-calendar-header": {
                    color: "darkblue",
                },
            }}
            // other props...
        />
    );
};
```

## Custom Events
You can customize how events are displayed in the calendar by providing a custom `EventComponent`. This component will receive the event data and can render it as needed.
```javascript
import { FastCalendar, CalendarEvent, CalendarEventComponent } from "fast-react-calendar";
const MyCustomEvent: CalendarEventComponent = ({ event }) => {
    return (
        <div style={{ backgroundColor: event.color }}>
            <strong>{event.title}</strong>
            <p>{event.description}</p>
        </div>
    );
};
const MyCalendar = () => {
    return (
        <FastCalendar
            components={{ 
                Event: MyCustomEvent 
            }}
            // other props...
        />
    );
};
```

## Custom Add Event Dialog
You can customize the "Add Event" dialog by providing a custom `AddEventDialog` component. This allows you to change the form fields, layout, and styling of the dialog.
```javascript
import { FastCalendar, AddEventDialogComponent } from "fast-react-calendar";
const MyCustomAddEventDialog: AddEventDialogComponent = ({ onClose, onAdd })
=> {
    return (
        <div>
            <h2>Add Custom Event</h2>
            {/* Custom form fields here */}
            <button onClick={onAdd}>Add Event</button>
            <button onClick={onClose}>Cancel</button>
        </div>
    );
};
const MyCalendar = () => {
    return (
        <FastCalendar
            components={{ 
                AddEventDialog: MyCustomAddEventDialog,
            }}
            // other props...
        />
    );
};
```