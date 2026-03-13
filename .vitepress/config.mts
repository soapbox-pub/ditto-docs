import { defineConfig } from 'vitepress'

export default defineConfig({
  srcDir: 'docs',
  cleanUrls: true,

  vite: {
    envDir: process.cwd(),
  },

  title: 'Ditto',
  description: 'A social platform for people who want to have fun, not feed the Big Tech machine. Open source, decentralized, and entirely yours.',

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    ['meta', { name: 'theme-color', content: '#7c52e0' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'Ditto - Fun Social Media' }],
    ['meta', { property: 'og:description', content: 'A social platform for people who want to have fun, not feed the Big Tech machine. Open source, decentralized, and entirely yours to customize and build upon.' }],
    ['meta', { property: 'og:url', content: 'https://ditto.pub' }],
    ['meta', { property: 'og:image', content: 'https://docs.ditto.pub/og-image.gif' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:image', content: 'https://docs.ditto.pub/og-image.gif' }],
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
          { text: 'Philosophy', link: '/learn/philosophy' },
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
        text: 'Specs',
        items: [
          { text: 'Event Kinds', link: '/specs/kinds' },
        ],
      },
      {
        text: 'Launch Ditto ↗',
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
            { text: 'Philosophy', link: '/learn/philosophy' },
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
      '/specs/': [
        {
          text: 'Specs',
          items: [
            { text: 'Event Kinds', link: '/specs/kinds' },
          ],
        },
      ],
    },


    search: {
      provider: 'local',
    },
  },
})
