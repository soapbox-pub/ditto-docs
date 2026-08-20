import { writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { defineConfig, type HeadConfig } from 'vitepress'

const SITE_URL = 'https://about.ditto.pub'
const OG_IMAGE = `${SITE_URL}/og-image-home.jpg`
const DEFAULT_DESCRIPTION = 'A social platform for people who want to have fun, not feed the Big Tech machine. Open source, decentralized, and entirely yours.'

// The nsite gateway serves this site under `script-src 'self'`, so every inline
// <script> is blocked. VitePress emits two of them into <head> (the FOUC dark
// mode check and the macOS class toggle); hoist their bodies verbatim into a
// real file, which the CSP does allow. `metaChunk: true` below deals with the
// third one -- the __VP_SITE_DATA__ blob, whose absence crashes the app on boot.
const CSP_INIT_FILE = 'csp-init.js'
const inlineScripts = new Map<string, string>()

const docsSidebar = [
  {
    text: 'Learn',
    items: [
      { text: 'What is Nostr?', link: '/nostr-101' },
      { text: 'Ditto Philosophy', link: '/philosophy' },
    ],
  },
  {
    text: 'Development',
    items: [
      { text: 'Hacking on Ditto', link: '/hacking' },
      { text: 'Contributing', link: '/contributing' },
      { text: 'Ditto Nostr Reference', link: '/reference' },
      { text: 'Self-Hosting', link: '/self-hosting' },
    ],
  },
  {
    items: [
      { text: '\u2190 Landing page', link: '/' },
    ],
  },
]

export default defineConfig({
  srcDir: 'docs',
  cleanUrls: true,
  appearance: 'dark',
  metaChunk: true,

  sitemap: {
    hostname: SITE_URL,
  },

  vite: {
    envDir: process.cwd(),
  },

  markdown: {
    typographer: true,
    externalLinks: { target: '_blank', rel: 'noopener noreferrer' },
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

  // Strip VitePress's inline <script id="..."> tags and point at the external
  // copy written by buildEnd, keeping their original position in <head> so the
  // dark mode check still runs before first paint.
  transformHtml(code) {
    let injected = false

    const html = code.replace(
      /<script id="([\w-]+)">([\s\S]*?)<\/script>/g,
      (_match, id: string, body: string) => {
        inlineScripts.set(id, body)
        if (injected) return ''
        injected = true
        return `<script src="/${CSP_INIT_FILE}"></script>`
      },
    )

    if (!injected) {
      throw new Error(
        `No inline <script id="..."> found to externalize. VitePress probably changed how it emits them; ` +
          `re-check the CSP workaround in .vitepress/config.mts.`,
      )
    }

    return html
  },

  async buildEnd({ outDir }) {
    await writeFile(join(outDir, CSP_INIT_FILE), [...inlineScripts.values()].join('\n'))
  },

  themeConfig: {
    logo: '/logo.svg',
    logoLink: '/docs',

    nav: [
      {
        text: 'Launch Ditto',
        link: 'https://ditto.pub',
      },
    ],

    sidebar: {
      '/docs/': docsSidebar,
      '/nostr-101': docsSidebar,
      '/philosophy': docsSidebar,
      '/hacking': docsSidebar,
      '/contributing': docsSidebar,
      '/self-hosting': docsSidebar,
      '/reference': docsSidebar,
    },


    search: {
      provider: 'local',
    },
  },
})
