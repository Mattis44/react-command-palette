# Get Started
React Command Palette is designed to be easy to use and integrate into your React applications.
Follow these steps to get started quickly. 

## Installation

### Prerequisites
- Ensure you have a [React](https://react.dev) project set up. If you don't have one, you can create a new React app using [Vite](https://vite.dev) (recommended) or your preferred method.
- Make sure you have all peer-dependencies such as react, and react-dom.

Install React Command Palette using npm:

```bash
npm install react-command-palette
```
## Basic Usage

To use React Command Palette, import the provider `CommandPaletteProvider` and place it between your main components in your App.tsx/Main.tsx :

```jsx
import React from 'react';
import { CommandPaletteProvider } from 'react-command-palette';

function App() {
  return (
    <CommandPaletteProvider>
      <MyRoutes />
    </CommandPaletteProvider>
  );
}
export default App;
```
This will make sure that the command palette can access context, now go place some [props](./props).
