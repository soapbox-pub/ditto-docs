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
  enhanceApp({ app }) {
    app.component('DittoHome', DittoHome)

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
