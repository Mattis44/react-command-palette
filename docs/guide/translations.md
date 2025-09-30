# Translations
The `translations` prop allows you to customize the text displayed in the calendar. This is particularly useful for internationalization or simply to change the default text to something more suitable for your application.

## Available Translations
The `translations` prop accepts an object `Translations`:
```typescript
interface Translations {
    header: {
        month: string;
        today: string;
        addEvent: string;
    };
    addEvent: {
        title: string;
        icon: string;
        color: string;
        description: string;
        descriptionPlaceholder: string;
        startDate: string;
        endDate: string;
        cancel: string;
        add: string;
    };
}
```

## Example Usage
You can pass a `translations` object to the `FastCalendar` component like this:
```javascript
import { FastCalendar } from "fast-react-calendar";
import fr from "../translations/fr.json";
const MyCalendar = () => {
    return (
        <FastCalendar
            translations={fr}
            // other props...
        />
    );
};
```
## Customizing Translations
You can create your own translations by defining an object that matches the `Translations` interface. For example:
```javascript
const customTranslations = {
    header: {
    },
    addEvent: {
    },
};
```

You can then pass this object to the `translations` prop of the `FastCalendar` component.
```javascript
const MyCalendar = () => {
    return (
        <FastCalendar
            translations={customTranslations}
            // other props...
        />
    );
};
```