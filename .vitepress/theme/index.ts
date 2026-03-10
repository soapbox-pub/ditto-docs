import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import DittoHome from './components/DittoHome.vue'
import './style.css'

declare const __PLAUSIBLE_DOMAIN__: string
declare const __PLAUSIBLE_API_HOST__: string

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {})
  },
  enhanceApp({ app, router }) {
    app.component('DittoHome', DittoHome)

    if (typeof window !== 'undefined' && __PLAUSIBLE_DOMAIN__) {
      import('@plausible-analytics/tracker').then(({ init }) => {
        init({
          domain: __PLAUSIBLE_DOMAIN__,
          ...(__PLAUSIBLE_API_HOST__ ? { endpoint: `${__PLAUSIBLE_API_HOST__}/api/event` } : {}),
        })
      })
    }
  },
} satisfies Theme
