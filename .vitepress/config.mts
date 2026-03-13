import { defineConfig, type HeadConfig } from 'vitepress'

const SITE_URL = 'https://about.ditto.pub'
const OG_IMAGE = `${SITE_URL}/og-image.gif`
const DEFAULT_DESCRIPTION = 'A social platform for people who want to have fun, not feed the Big Tech machine. Open source, decentralized, and entirely yours.'

export default defineConfig({
  srcDir: 'docs',
  cleanUrls: true,

  vite: {
    envDir: process.cwd(),
  },

  title: 'Ditto',
  description: DEFAULT_DESCRIPTION,

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    ['meta', { name: 'theme-color', content: '#7c52e0' }],
  ],

  transformHead({ pageData }) {
    const head: HeadConfig[] = []

    const title = pageData.frontmatter.title || pageData.title
    const description = pageData.frontmatter.description || pageData.description || DEFAULT_DESCRIPTION
    const ogTitle = title ? `${title} | Ditto` : 'Ditto'
    const pagePath = pageData.relativePath.replace(/((^|\/)index)?\.md$/, '')
    const ogUrl = pagePath ? `${SITE_URL}/${pagePath}` : SITE_URL

    head.push(['meta', { property: 'og:type', content: 'website' }])
    head.push(['meta', { property: 'og:title', content: ogTitle }])
    head.push(['meta', { property: 'og:description', content: description }])
    head.push(['meta', { property: 'og:url', content: ogUrl }])
    head.push(['meta', { property: 'og:image', content: OG_IMAGE }])
    head.push(['meta', { name: 'twitter:card', content: 'summary_large_image' }])
    head.push(['meta', { name: 'twitter:title', content: ogTitle }])
    head.push(['meta', { name: 'twitter:description', content: description }])
    head.push(['meta', { name: 'twitter:image', content: OG_IMAGE }])

    return head
  },

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
