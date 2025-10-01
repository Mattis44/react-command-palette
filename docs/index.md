---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "React Command Palette"
  text: "A fully customizable command palette for React"
  tagline: "Bring GitHub-style quick actions to your app in minutes."
  actions:
    - theme: brand
      text: Get started
      link: /guide/get-started
    - theme: alt
      text: GitHub
      link: https://github.com/Mattis44/react-command-palette

features:
  - title: Fast & Lightweight
    details: |
      Built for instant response — the palette opens and filters results in milliseconds, even with hundreds of commands.
      It ships with zero external UI dependencies and avoids unnecessary re-renders for snappy UX.

  - title: Fully Customizable
    details: |
      Control every part of the experience — from container layout and input styling to item rendering and helper hints.
      Override inline styles or use CSS variables for full theming flexibility.

  - title: Async & Dynamic Commands
    details: |
      Load commands from APIs or async sources on the fly.
      React Command Palette supports promises, debounced queries, and async filtering out of the box.

  - title: Global Shortcuts & Modes
    details: |
      Trigger special "modes" with custom prefixes like "/" or ">" to swap to a dedicated command set.
      Perfect for separating search contexts or exposing quick actions.

  - title: Native React Integration
    details: |
      Written in TypeScript and designed for React hooks.
      Works seamlessly in modern SPAs, Next.js apps, and other frameworks thanks to SSR-safe guards.

  - title: Styled & Accessible by Default
    details: |
      Ships with an accessible dark/light baseline, keyboard navigation, and ARIA roles.
      Use the provided CSS variables or override inline styles to match your design system.
---
