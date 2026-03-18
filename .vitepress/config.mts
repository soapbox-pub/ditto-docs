import { defineConfig, type HeadConfig } from 'vitepress'

const SITE_URL = 'https://about.ditto.pub'
const OG_IMAGE = `${SITE_URL}/og-image.gif`
const DEFAULT_DESCRIPTION = 'A social platform for people who want to have fun, not feed the Big Tech machine. Open source, decentralized, and entirely yours.'

const docsSidebar = [
  {
    text: 'Learn',
    items: [
      { text: 'What is Nostr?', link: '/what-is-nostr' },
      { text: 'Ditto Philosophy', link: '/philosophy' },
    ],
  },
  {
    text: 'Development',
    items: [
      { text: 'Ditto Nostr Reference', link: '/nostr-reference' },
      { text: 'Self-Hosting', link: '/self-hosting' },
    ],
  },
]

export default defineConfig({
  srcDir: 'docs',
  cleanUrls: true,

  vite: {
    envDir: process.cwd(),
  },

  markdown: {
    typographer: true,
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
    const ogImage = pageData.frontmatter.og_image ? `${SITE_URL}${pageData.frontmatter.og_image}` : OG_IMAGE

    head.push(['meta', { property: 'og:type', content: 'website' }])
    head.push(['meta', { property: 'og:title', content: ogTitle }])
    head.push(['meta', { property: 'og:description', content: description }])
    head.push(['meta', { property: 'og:url', content: ogUrl }])
    head.push(['meta', { property: 'og:image', content: ogImage }])
    head.push(['meta', { name: 'twitter:card', content: 'summary_large_image' }])
    head.push(['meta', { name: 'twitter:title', content: ogTitle }])
    head.push(['meta', { name: 'twitter:description', content: description }])
    head.push(['meta', { name: 'twitter:image', content: ogImage }])

    return head
  },

  themeConfig: {
    logo: '/logo.svg',

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Docs', link: '/docs' },
      {
        text: 'Launch Ditto',
        link: 'https://ditto.pub',
      },
    ],

    sidebar: {
      '/docs/': docsSidebar,
      '/what-is-nostr': docsSidebar,
      '/philosophy': docsSidebar,
      '/self-hosting': docsSidebar,
      '/nostr-reference': docsSidebar,
    },


    search: {
      provider: 'local',
    },
  },
})
