<template>
  <div
    class="ditto-home"
    ref="homeRef"
    :style="homeStyles"
  >
    <!-- Background wallpaper layer (behind everything) -->
    <div
      v-if="activeTheme?.background"
      class="theme-bg-image"
      :style="{
        backgroundImage: `url(${activeTheme.background.bg})`,
        backgroundSize: activeTheme.background.mode === 'tile' ? 'auto' : 'cover',
        backgroundRepeat: activeTheme.background.mode === 'tile' ? 'repeat' : 'no-repeat',
      }"
    />

    <!-- Theme switcher (top-right, homepage only) -->
    <div class="home-theme-switcher">
      <ThemeSwitcher
        :currentThemeKey="currentThemeKey"
        @select="applyTheme"
      />
    </div>

    <!-- CSS screen frame wraps the content -->
    <ScreenFrame :theme="currentThemeKey">

    <!-- ============================================================
         HERO: Giant title, floating emojis, pure energy
         ============================================================ -->
    <section class="hero">
      <div class="hero-content">
        <h1 class="hero-title">
          <span class="hero-name">Ditto</span>
        </h1>
        <p class="hero-sub">
           A social platform for people who want to <em>have&nbsp;fun</em>,
          not feed an algorithm. Open source, decentralized, and entirely yours to customize and build upon.
        </p>
        <div class="hero-actions">
          <a href="/learn/what-is-nostr" class="btn btn-ghost">
            What is Nostr?
          </a>
          <a href="/guides/themes" class="btn btn-ghost">
            Guides
          </a>
          <a href="https://ditto.pub" target="_blank" class="btn btn-primary">
            <span>Launch Ditto &#8599;</span>
          </a>
        </div>
      </div>
    </section>

    <!-- ============================================================
         THEMES: Visual showcase of Y2K theme presets
         ============================================================ -->
    <section class="themes-section">
      <div class="section-inner">
        <div class="section-header">
          <h2>Your content. Your vibe. Your&nbsp;rules.</h2>
          <p>Customize and share themes with colors, background art, fonts, and more.</p>
        </div>
        <div class="theme-grid">
          <button
            v-for="theme in allThemes"
            :key="theme.key"
            class="theme-card"
            :class="{ 'theme-card-active': theme.key === currentThemeKey }"
            @click="applyTheme(theme.key)"
          >
            <div
              class="theme-card-bg"
              :style="{ backgroundImage: `url(${theme.background.bg})` }"
            />
            <div class="theme-card-overlay" />
            <span
              class="theme-card-name"
              :style="{ fontFamily: `'${theme.font.family}', sans-serif`, fontSize: `calc(18px * ${theme.headingScale / 0.9})` }"
            >{{ theme.label }}</span>
          </button>
        </div>
      </div>
    </section>

    <!-- ============================================================
         WHAT YOU CAN DO: Not a grid of icons. A story.
         ============================================================ -->
    <section class="powers-section">
      <div class="section-inner">
        <div class="section-header">
          <h2>Not just another feed app.</h2>
          <p>Ditto is a playground. Here's some of what you can do.</p>
        </div>

        <div class="powers-list">
          <div class="power-item">
            <div class="power-content">
              <h3>Post what you want</h3>
              <p>Short thoughts, long rants, content warnings, emoji reactions. The basics, done right. 5,000 character limit because sometimes you have things to say.</p>
            </div>
          </div>

          <div class="power-item">
            <div class="power-content">
              <h3>Zap people with real money</h3>
              <p>Send Bitcoin Lightning tips to anyone, right from their post. No "likes" that mean nothing. Send actual value to people who make your timeline better.</p>
            </div>
          </div>

          <div class="power-item">
            <div class="power-content">
              <h3>Long-form articles</h3>
              <p>Write and read full blog posts right in Ditto. Not everything fits in a tweet-sized box.</p>
            </div>
          </div>

          <div class="power-item">
            <div class="power-content">
              <h3>Videos and live streams</h3>
              <p>Short-form videos. Live streams with chat. All integrated, no separate app needed.</p>
            </div>
          </div>

          <div class="power-item">
            <div class="power-content">
              <h3>Polls, follow packs, colors, games...</h3>
              <p>The Nostr ecosystem is wild. Ditto plugs into all of it -- polls, curated follow lists, color palettes, Magic: The Gathering decks, geocaching, and sandboxed mini-apps. Yes, really.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ============================================================
         OWNERSHIP: The "why decentralized" pitch
         ============================================================ -->
    <section class="ownership-section">
      <div class="ownership-inner">
        <h2>You own this.</h2>
        <p>
          Your account is a cryptographic key. Not an email address some company controls.
          Your posts live on relays you choose, not servers you rent.
          Your social graph follows you between apps. Switch clients whenever you want.
          Nothing is locked in. Nothing is locked down.
        </p>
        <p class="ownership-kicker">
          Decentralization isn't the point. <strong>Freedom</strong> is the point.<br>
          Decentralization is just how we get there.
        </p>
      </div>
    </section>

    <!-- ============================================================
         SELF-HOST: For the builders
         ============================================================ -->
    <section class="selfhost-section">
      <div class="section-inner">
        <div class="section-header">
          <h2>Run your own.</h2>
          <p>Ditto builds to static files. Deploy it on a $5 VPS, GitHub Pages, Netlify, or a Raspberry Pi in your closet. One config file. Your domain. Your community.</p>
        </div>
        <div class="selfhost-steps">
          <div class="step">
            <div class="step-num">1</div>
            <div class="step-text">
              <code>git clone</code> and <code>bun install</code>
            </div>
          </div>
          <div class="step-arrow">→</div>
          <div class="step">
            <div class="step-num">2</div>
            <div class="step-text">
              Drop in your <code>ditto.json</code>
            </div>
          </div>
          <div class="step-arrow">→</div>
          <div class="step">
            <div class="step-num">3</div>
            <div class="step-text">
              <code>bun run build</code> and ship it
            </div>
          </div>
        </div>
        <div class="selfhost-cta">
          <a href="/guides/self-hosting" class="btn btn-ghost">Read the self-hosting guide →</a>
        </div>
      </div>
    </section>

    <!-- ============================================================
         FINAL CTA: Let's go
         ============================================================ -->
    <section class="final-cta">
      <div class="final-cta-inner">
        <h2>Ready?</h2>
        <p>No email. No phone number.<br>Just you and a Nostr key.</p>
        <div class="hero-actions">
          <a href="https://ditto.pub" target="_blank" class="btn btn-primary btn-lg">
            <span>Let's go</span>
          </a>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="home-footer">
      <p class="home-footer-message">&hearts;2026 Copying is not theft.</p>
      <p class="home-footer-credit">Made by <a href="https://soapbox.pub" target="_blank">Soapbox</a></p>
    </footer>

    </ScreenFrame>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { themes as allThemes, getTheme, randomThemeKey, deriveTokens, hslToCSS } from '../themes';
import type { Y2KTheme } from '../themes';
import ThemeSwitcher from './ThemeSwitcher.vue';
import ScreenFrame from './ScreenFrame.vue';

// ─── Module-level state (survives SPA navigation, resets on refresh) ──

// This variable persists across SPA route changes but resets on full page reload,
// giving us the "random on refresh, stable on navigate" behavior for free.
let _persistedThemeKey: string | null = null;

// ─── Reactive state ───────────────────────────────────────────────────

const currentThemeKey = ref('');
const activeTheme = ref<Y2KTheme | null>(null);
const homeRef = ref<HTMLElement | null>(null);
const fontLoaded = ref(false);

// ─── Computed styles ──────────────────────────────────────────────────

const homeStyles = computed(() => {
  const theme = activeTheme.value;
  if (!theme) return {};

  const tokens = deriveTokens(theme.colors);
  const displayFont = fontLoaded.value
    ? `'${theme.font.family}', ${theme.bodyFont}`
    : theme.bodyFont;
  const bodyFont = theme.bodyFont;

  const primaryHsl = theme.colors.primary;

  return {
    '--theme-bg': hslToCSS(tokens.background),
    '--theme-text': hslToCSS(tokens.foreground),
    '--theme-primary': hslToCSS(tokens.primary),
    '--theme-primary-fg': hslToCSS(tokens.primaryForeground),
    '--theme-card': hslToCSS(tokens.card),
    '--theme-card-fg': hslToCSS(tokens.cardForeground),
    '--theme-secondary': hslToCSS(tokens.secondary),
    '--theme-secondary-fg': hslToCSS(tokens.secondaryForeground),
    '--theme-muted': hslToCSS(tokens.muted),
    '--theme-muted-fg': hslToCSS(tokens.mutedForeground),
    '--theme-accent': hslToCSS(tokens.accent),
    '--theme-accent-fg': hslToCSS(tokens.accentForeground),
    '--theme-border': hslToCSS(tokens.border),
    '--theme-ring': hslToCSS(tokens.ring),
    '--theme-font': displayFont,
    '--theme-body-font': bodyFont,
    '--theme-heading-scale': String(theme.headingScale),
    '--theme-primary-hsl': primaryHsl,
    // Map to VitePress variables for components that use them
    '--vp-c-text-1': hslToCSS(tokens.foreground),
    '--vp-c-text-2': hslToCSS(tokens.mutedForeground),
    '--vp-c-text-3': hslToCSS(tokens.mutedForeground),
    '--vp-c-brand-1': hslToCSS(tokens.primary),
    '--vp-c-brand-2': hslToCSS(tokens.primary),
    '--vp-c-brand-3': hslToCSS(tokens.primary),
    '--vp-c-brand-soft': hslToCSS(tokens.primary).replace(')', ', 0.16)').replace('hsl(', 'hsla('),
    '--vp-c-bg': hslToCSS(tokens.background),
    '--vp-c-bg-soft': hslToCSS(tokens.secondary),
    '--vp-c-divider': hslToCSS(tokens.border),
    color: hslToCSS(tokens.foreground),
  } as Record<string, string>;
});

// ─── Font loading ─────────────────────────────────────────────────────

const loadedFonts = new Set<string>();

async function loadFont(theme: Y2KTheme): Promise<void> {
  if (loadedFonts.has(theme.key)) {
    fontLoaded.value = true;
    return;
  }

  // Build @font-face declarations for display font + optional body font
  const styleId = `theme-font-${theme.key}`;
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style');
    style.id = styleId;

    let css = `
      @font-face {
        font-family: '${theme.font.family}';
        src: url('${theme.font.url}') format('woff2');
        font-display: swap;
        font-weight: 400;
        font-style: normal;
      }
    `;

    // Load body font from CDN if specified
    if (theme.bodyFontUrl) {
      const bodyFamily = theme.bodyFont.split(',')[0].replace(/'/g, '').trim();
      css += `
        @font-face {
          font-family: '${bodyFamily}';
          src: url('${theme.bodyFontUrl}') format('woff2');
          font-display: swap;
          font-weight: 400;
          font-style: normal;
        }
      `;
    }

    style.textContent = css;
    document.head.appendChild(style);
  }

  try {
    const loads = [document.fonts.load(`400 16px "${theme.font.family}"`)];
    if (theme.bodyFontUrl) {
      const bodyFamily = theme.bodyFont.split(',')[0].replace(/'/g, '').trim();
      loads.push(document.fonts.load(`400 16px "${bodyFamily}"`));
    }
    await Promise.all(loads);
    loadedFonts.add(theme.key);
    fontLoaded.value = true;
  } catch {
    // Font failed to load, use fallbacks
    fontLoaded.value = true;
  }
}

// ─── Theme application ────────────────────────────────────────────────

async function applyTheme(key: string) {
  const theme = getTheme(key);
  if (!theme) return;

  currentThemeKey.value = key;
  activeTheme.value = theme;
  _persistedThemeKey = key;

  // Reset font loaded state before loading new font
  fontLoaded.value = false;
  await loadFont(theme);
}

// ─── Initialization ───────────────────────────────────────────────────

onMounted(() => {
  // If we have a persisted key from SPA navigation, use it.
  // Otherwise pick a random one. Module-level variable resets on full page reload.
  const key = _persistedThemeKey || randomThemeKey();
  applyTheme(key);
});
</script>
