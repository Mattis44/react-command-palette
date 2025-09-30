# Api
Use the `apiRef` to access the calendar's internal methods and state. This allows you to interact with the calendar programmatically, such as changing the current date, and more.

## Methods
The `apiRef` provides access to the following methods:
-  `goToToday()`: Navigates the calendar to today's date.
-  `setMonth(month: number)`: Sets the calendar to a specific month (0-11).
-  `setYear(year: number)`: Sets the calendar to a specific year.
-  `setDate(date: Date)`: Sets the calendar to a specific date.

## Accessing the API
You can create a ref using the `useApiRef` hook and pass it to the `FastCalendar` component via the `apiRef` prop.
```javascript
import { FastCalendar, useApiRef, CalendarEvent } from "fast-react-calendar"
import { useEffect } from "react";

const MyCalendar = () => {
    const apiRef = useApiRef();

    useEffect(() => {
        // Example: Navigate to today's date on mount
        apiRef.current?.goToToday();
    }, [apiRef]);

    const handleAddEvent = (event: CalendarEvent) => {
        // Example: Set the current date to the start of the newly added event
        apiRef.current?.setDate(event.start);
    };

    return (
        <FastCalendar
            apiRef={apiRef}
            onAddEvent={handleAddEvent}
            // other props...
        />
    );
};
```