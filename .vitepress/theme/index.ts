import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import DittoHome from './components/DittoHome.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {})
  },
  enhanceApp({ app, router }) {
    app.component('DittoHome', DittoHome)

    if (typeof window !== 'undefined') {
      const docsPaths = ['/docs', '/nostr-101', '/philosophy', '/hacking', '/self-hosting', '/reference']

      // Intercept clicks on the logo link in the capture phase so it fires
      // before VitePress's own router link handler.
      document.addEventListener('click', (e) => {
        const link = (e.target as HTMLElement).closest?.('.VPNavBarTitle a')
        if (!link) return
        const path = window.location.pathname
        const inDocs = docsPaths.some((p) => path === p || path.startsWith(p + '/'))
        if (inDocs) {
          e.preventDefault()
          e.stopPropagation()
          router.go('/docs')
        }
      }, true)
    }

    if (typeof window !== 'undefined' && import.meta.env.VITE_PLAUSIBLE_DOMAIN) {
      import('@plausible-analytics/tracker').then(({ init }) => {
        init({
          domain: import.meta.env.VITE_PLAUSIBLE_DOMAIN,
          ...(import.meta.env.VITE_PLAUSIBLE_ENDPOINT ? { endpoint: import.meta.env.VITE_PLAUSIBLE_ENDPOINT } : {}),
        })
      })
    }
  },
} satisfies Theme
