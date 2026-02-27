<template>
  <div
    class="ditto-home"
    ref="homeRef"
    :style="homeStyles"
  >
    <!-- Background image layer -->
    <div
      v-if="activeTheme?.background"
      class="theme-bg-image"
      :style="{
        backgroundImage: `url(${activeTheme.background.url})`,
        backgroundSize: activeTheme.background.mode === 'tile' ? 'auto' : 'cover',
        backgroundRepeat: activeTheme.background.mode === 'tile' ? 'repeat' : 'no-repeat',
      }"
    />

    <!-- Semi-transparent overlay for readability -->
    <div
      class="theme-bg-overlay"
      :style="{ background: overlayColor }"
    />

    <!-- ============================================================
         TRANSPARENT NAV: Overlays the hero
         ============================================================ -->
    <nav class="home-nav">
      <div class="home-nav-inner">
        <a href="/" class="home-nav-logo">
          <img src="/logo.svg" alt="Ditto" />
          <span>Ditto</span>
        </a>
        <div class="home-nav-links">
          <a href="/learn/what-is-nostr">Learn</a>
          <a href="/guides/themes">Guides</a>
          <a href="https://ditto.pub" target="_blank" class="home-nav-cta">Open Ditto</a>
        </div>
      </div>
    </nav>

    <!-- ============================================================
         HERO: Giant title, floating emojis, pure energy
         ============================================================ -->
    <section class="hero">
      <div class="hero-emojis" aria-hidden="true">
        <span class="float-emoji e1">🎨</span>
        <span class="float-emoji e2">✨</span>
        <span class="float-emoji e3">🦋</span>
        <span class="float-emoji e4">🎸</span>
        <span class="float-emoji e5">🌈</span>
        <span class="float-emoji e6">🔮</span>
        <span class="float-emoji e7">🎪</span>
        <span class="float-emoji e8">💜</span>
        <span class="float-emoji e9">⚡</span>
        <span class="float-emoji e10">🎭</span>
        <span class="float-emoji e11">🌸</span>
        <span class="float-emoji e12">🚀</span>
      </div>
      <div class="hero-content">
        <h1 class="hero-title">
          <span class="hero-name">Ditto</span>
        </h1>
        <p class="hero-text">Social media that's actually fun.</p>
        <p class="hero-sub">
          A Nostr client for people who want to <em>express themselves</em>,
          not feed an algorithm. Open source, decentralized, and entirely yours to customize.
        </p>
        <div class="hero-actions">
          <a href="https://ditto.pub" target="_blank" class="btn btn-primary">
            <span>Open Ditto</span>
            <span class="btn-emoji">🚀</span>
          </a>
          <a href="/learn/what-is-nostr" class="btn btn-ghost">
            What is Nostr?
          </a>
        </div>
      </div>
    </section>

    <!-- ============================================================
         VIBES: Big emotional statement
         ============================================================ -->
    <section class="vibes">
      <div class="vibes-inner">
        <div class="vibes-emoji">🎉</div>
        <h2>Remember when the internet was a playground?</h2>
        <p>
          When you could customize your page. Pick your own colors. Express who you actually are.
          Before everything became the same feed, the same font, the same vibe.
        </p>
        <p class="vibes-punchline">Ditto brings that energy back.</p>
      </div>
    </section>

    <!-- ============================================================
         THEMES: Visual showcase of Y2K theme presets
         ============================================================ -->
    <section class="themes-section">
      <div class="section-inner">
        <div class="section-header">
          <span class="mega-emoji">🎨</span>
          <h2>Your vibe. Your colors. Your rules.</h2>
          <p>7 built-in Y2K themes. Wild fonts. Background art. Make it look like <em>you</em>.</p>
        </div>
        <div class="theme-strips">
          <button
            v-for="theme in allThemes"
            :key="theme.key"
            class="theme-strip"
            :class="{ 'theme-strip-active': theme.key === currentThemeKey }"
            :style="stripStyle(theme)"
            @click="applyTheme(theme.key)"
          >
            <span class="strip-emoji">{{ theme.emoji }}</span>
            <span class="strip-name">{{ theme.label }}</span>
            <span v-if="theme.key === currentThemeKey" class="strip-active-badge">active</span>
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
          <span class="mega-emoji">⚡</span>
          <h2>Not just another feed app.</h2>
          <p>Ditto is a playground. Here's some of what you can do.</p>
        </div>

        <div class="powers-list">
          <div class="power-item">
            <div class="power-emoji">📝</div>
            <div class="power-content">
              <h3>Post what you want</h3>
              <p>Short thoughts, long rants, content warnings, emoji reactions. The basics, done right. 5,000 character limit because sometimes you have things to say.</p>
            </div>
          </div>

          <div class="power-item">
            <div class="power-emoji">⚡</div>
            <div class="power-content">
              <h3>Zap people with real money</h3>
              <p>Send Bitcoin Lightning tips to anyone, right from their post. No "likes" that mean nothing. Send actual value to people who make your timeline better.</p>
            </div>
          </div>

          <div class="power-item">
            <div class="power-emoji">📰</div>
            <div class="power-content">
              <h3>Long-form articles</h3>
              <p>Write and read full blog posts right in Ditto. Not everything fits in a tweet-sized box.</p>
            </div>
          </div>

          <div class="power-item">
            <div class="power-emoji">🎬</div>
            <div class="power-content">
              <h3>Videos and live streams</h3>
              <p>Short-form videos. Live streams with chat. All integrated, no separate app needed.</p>
            </div>
          </div>

          <div class="power-item">
            <div class="power-emoji">📊</div>
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
        <span class="mega-emoji">🔑</span>
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
          <span class="mega-emoji">🏗️</span>
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
      <div class="final-cta-emojis" aria-hidden="true">
        <span class="float-emoji f1">🎊</span>
        <span class="float-emoji f2">💫</span>
        <span class="float-emoji f3">🌟</span>
        <span class="float-emoji f4">🎆</span>
        <span class="float-emoji f5">💜</span>
        <span class="float-emoji f6">🪩</span>
      </div>
      <div class="final-cta-inner">
        <h2>Ready?</h2>
        <p>No sign-up forms. No email. No phone number.<br>Just you and a Nostr key.</p>
        <div class="hero-actions">
          <a href="https://ditto.pub" target="_blank" class="btn btn-primary btn-lg">
            <span>Let's go</span>
            <span class="btn-emoji">✨</span>
          </a>
        </div>
      </div>
    </section>

    <!-- Theme Switcher FAB -->
    <ThemeSwitcher
      :currentThemeKey="currentThemeKey"
      @select="applyTheme"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { themes as allThemes, getTheme, randomThemeKey, deriveTokens, hslToCSS } from '../themes';
import type { Y2KTheme } from '../themes';
import ThemeSwitcher from './ThemeSwitcher.vue';

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
  const font = fontLoaded.value
    ? `'${theme.font.family}', 'Inter', sans-serif`
    : `'Inter', sans-serif`;

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
    '--theme-font': font,
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
    fontFamily: font,
  } as Record<string, string>;
});

const overlayColor = computed(() => {
  const theme = activeTheme.value;
  if (!theme) return 'transparent';
  // Use the theme background color with opacity for readability over the bg image
  const bg = theme.colors.background;
  return `hsla(${bg}, 0.7)`;
});

// ─── Theme strip styles ──────────────────────────────────────────────

function stripStyle(theme: Y2KTheme) {
  return {
    '--strip-bg': `linear-gradient(135deg, ${hslToCSS(theme.colors.background)}, ${hslToCSS(theme.colors.primary)})`,
    color: hslToCSS(theme.colors.text),
  };
}

// ─── Font loading ─────────────────────────────────────────────────────

const loadedFonts = new Set<string>();

async function loadFont(theme: Y2KTheme): Promise<void> {
  if (loadedFonts.has(theme.key)) {
    fontLoaded.value = true;
    return;
  }

  const styleId = `theme-font-${theme.key}`;
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      @font-face {
        font-family: '${theme.font.family}';
        src: url('${theme.font.url}') format('woff2');
        font-display: swap;
        font-weight: 400;
        font-style: normal;
      }
    `;
    document.head.appendChild(style);
  }

  try {
    await document.fonts.load(`400 16px "${theme.font.family}"`);
    loadedFonts.add(theme.key);
    fontLoaded.value = true;
  } catch {
    // Font failed to load, keep using Inter
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
