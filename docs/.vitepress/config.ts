import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/react-command-palette/',
  lang: 'en-US',
  title: "React Command Palette",
  description: "A fully customizable command palette for React — inspired by GitHub’s Command Palette (Ctrl+K). Supports keyboard shortcuts, global commands, async fetching, and theming.",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: "./ReactCommandPalette.png",
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/get-started' },
      {
        text: 'v1.0.0-alpha',
        items: [
          { text: 'Changelog', link: 'https://github.com/Mattis44/react-command-palette/blob/main/changelog.md' },
        ]
      }
    ],
    search: {
      provider: 'local'
    },

    sidebar: [
      {
        text: 'Introduction',
        items: [
          {
            text: 'Get Started',
            link: '/guide/get-started',
          },
          {
            text: 'Commands',
            link: '/guide/commands',
          },
          {
            text: 'Shortcuts',
            link: '/guide/shortcuts',
          },
          {
            text: 'Accessibility',
            link: '/guide/accessibility',
          },
        ]
      },
      {
        text: 'Advanced',
        items: [
          {
            text: 'Props',
            link: '/guide/props',
          },
          {
            text: 'Hooks',
            link: '/guide/hooks',
          },
          {
            text: 'API',
            link: '/guide/api',
          },
          {
            text: 'Customize',
            link: '/guide/customize',
          }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Mattis44/react-command-palette' }
    ]
  }
})
