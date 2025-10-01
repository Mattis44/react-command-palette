# Accessibility & Keyboard Support

The command palette is designed to be accessible out of the box. It follows the [WAI-ARIA best practices for listbox widgets](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/) and includes full keyboard navigation.

## Keyboard navigation

- **Arrow Up / Arrow Down** cycle through visible commands.
- **Enter** activates the highlighted command.
- **Space** also activates the highlighted command when focus is on the list.
- **Escape** closes the palette and clears the current query.

Items expose a visual “active” state so users can see which command will run before pressing Enter.

## Focus management

- The search input receives focus automatically when the palette opens, allowing users to start typing immediately.
- Calling `close()` (via hook, API, or clicking the overlay) restores focus to the previously active element thanks to the browser’s default behaviour.
- The [`focus()`](./api.md#methods) method lets you refocus the input if you render custom UI inside the palette.

## ARIA attributes

Internally, the palette renders:

- `role="listbox"` on the command list container.
- `role="option"` on each command item with `aria-selected` reflecting the active state.
- `aria-busy="true"` while async commands are loading, enabling screen readers to announce progress.

These defaults make the palette usable with screen readers and assistive technology. If you customise the rendering heavily, keep these attributes intact or provide equivalent semantics.

## Overlay interactions

The translucent backdrop behind the palette closes it when clicked. You can style it via [`options.overlayStyle`](./customize.md#customizable-sections) while keeping the click-to-close behaviour. This gives mouse users a clear escape hatch without relying on keyboard shortcuts.

## Helper text

Helper hints (configured through `options.helper`) are rendered using semantic HTML (`<kbd>` elements) to describe keyboard keys. This ensures screen readers announce them correctly and they visually match native keyboard shortcuts.
