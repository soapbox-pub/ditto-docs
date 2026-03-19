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

      const updateLogoLink = () => {
        const path = window.location.pathname
        const inDocs = docsPaths.some((p) => path === p || path.startsWith(p + '/'))
        const logoLink = document.querySelector('.VPNavBarTitle a.title') as HTMLAnchorElement | null
        if (logoLink) {
          logoLink.setAttribute('href', inDocs ? '/docs' : '/')
          logoLink.onclick = (e) => {
            e.preventDefault()
            router.go(inDocs ? '/docs' : '/')
          }
        }
      }

      router.onAfterRouteChanged = updateLogoLink
      // Initial run after first paint
      requestAnimationFrame(() => requestAnimationFrame(updateLogoLink))
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
