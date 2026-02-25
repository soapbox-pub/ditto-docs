import { defineConfig } from 'vitepress'

export default defineConfig({
  srcDir: 'docs',

  title: 'Ditto',
  description: 'Your social media, your way. A fun, customizable Nostr client that puts you in control.',

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    ['meta', { name: 'theme-color', content: '#7c52e0' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'Ditto - Your Social Media, Your Way' }],
    ['meta', { property: 'og:description', content: 'A fun, customizable Nostr client that puts you in control. Express yourself with custom themes, decentralized social networking, and open source freedom.' }],
    ['meta', { property: 'og:url', content: 'https://ditto.pub' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
  ],

  themeConfig: {
    logo: '/logo.svg',

    nav: [
      { text: 'Home', link: '/' },
      {
        text: 'Learn',
        items: [
          { text: 'What is Nostr?', link: '/learn/what-is-nostr' },
          { text: 'Getting Started', link: '/learn/getting-started' },
          { text: 'Why Ditto?', link: '/learn/why-ditto' },
        ],
      },
      {
        text: 'Guides',
        items: [
          { text: 'Custom Themes', link: '/guides/themes' },
          { text: 'Self-Hosting', link: '/guides/self-hosting' },
          { text: 'Configuration', link: '/guides/configuration' },
        ],
      },
      {
        text: 'Open Ditto',
        link: 'https://ditto.pub',
      },
    ],

    sidebar: {
      '/learn/': [
        {
          text: 'Learn',
          items: [
            { text: 'What is Nostr?', link: '/learn/what-is-nostr' },
            { text: 'Getting Started', link: '/learn/getting-started' },
            { text: 'Why Ditto?', link: '/learn/why-ditto' },
          ],
        },
      ],
      '/guides/': [
        {
          text: 'Guides',
          items: [
            { text: 'Custom Themes', link: '/guides/themes' },
            { text: 'Self-Hosting', link: '/guides/self-hosting' },
            { text: 'Configuration', link: '/guides/configuration' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/ectosquad/ditto' },
    ],

    footer: {
      message: 'Released under the MIT License. Built with fun.',
      copyright: 'Made with love by the Ditto community',
    },

    search: {
      provider: 'local',
    },
  },
})
