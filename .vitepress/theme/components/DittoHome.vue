<template>
  <div
    class="ditto-home"
    :class="currentThemeKey ? `theme-${currentThemeKey}` : ''"
    ref="homeRef"
    :style="homeStyles"
  >
    <!-- Background wallpaper layer (behind everything) -->
    <div
      v-if="activeTheme?.background?.bg"
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
          not feed the Big Tech machine. Open source, decentralized, and entirely yours to customize and build upon.
        </p>
        <div class="hero-actions">
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
          <p>Customize your profile and theme with color palettes, background images, fonts, and more. Copy and share public themes!</p>
        </div>
        <div class="theme-grid scroll-reveal" ref="themeGridRef">
          <button
            v-for="theme in desktopThemes"
            :key="theme.key"
            class="theme-card"
            :class="{ 'theme-card-active': theme.key === currentThemeKey }"
            @click="applyTheme(theme.key)"
          >
            <div
              class="theme-card-bg"
              :class="{ 'theme-card-bg--light': theme.key === 'light', 'theme-card-bg--dark': theme.key === 'dark' }"
              :style="{ backgroundImage: theme.background.bg ? `url(${theme.background.bg})` : 'none', backgroundColor: `hsl(${theme.colors.background})` }"
            />
            <div class="theme-card-overlay" />
            <span
              class="theme-card-name"
              :style="{ fontFamily: `'${theme.font.family}', sans-serif`, fontSize: `calc(18px * ${theme.headingScale / 0.9})` }"
            >{{ theme.label }}</span>
          </button>
        </div>

        <!-- iPad theme examples carousel -->
        <div class="theme-carousel scroll-reveal" ref="themeCarouselRef">
          <div class="theme-carousel-track" ref="themeCarouselTrackRef">
            <img
              v-for="(img, i) in themeCarouselImages"
              :key="i"
              :src="img.src"
              :alt="img.alt"
              class="theme-carousel-slide"
              loading="lazy"
            />
          </div>
        </div>

      </div>
    </section>

    <!-- ============================================================
         WHAT YOU CAN DO: Not a grid of icons. A story.
         ============================================================ -->
    <section class="powers-section">
      <div class="section-inner">
        <div class="section-header">
          <h2>Infinite Content Types.</h2>
          <p>Ditto is a playground. Discover what you can do.</p>
        </div>

        <div ref="fakeDittoRef" class="scroll-reveal">
          <FakeDitto :themeBg="activeTheme?.background?.bg" />
        </div>

        <div class="powers-cta">
          <a href="https://ditto.pub" target="_blank" class="btn btn-primary">Try Ditto &#8599;</a>
        </div>
      </div>
    </section>

    <!-- ============================================================
         COMMENT ON ANYTHING: NIP-22 universal comments
         ============================================================ -->
    <section class="comments-section" ref="commentsSectionRef">
      <div class="section-inner">
        <div class="section-header">
          <h2>Comment on anything.</h2>
          <p>Posts. Countries. Links. Profiles. Books. Treasures. If it exists, you can discuss it.</p>
        </div>

        <div class="comments-mosaic">
          <!-- 1: Web URL -->
          <div class="comment-card" :class="{ 'comment-card--visible': commentsVisible }" style="--delay: 0; --rotate: -1.5deg;">
            <div class="comment-target">
              <span class="comment-target-icon">&#x1F517;</span>
              <span class="comment-target-label">nytimes.com/2026/nostr-protocol...</span>
            </div>
            <div class="comment-bubble">
              <img src="https://i.pravatar.cc/80?u=alice-comment" class="comment-avatar" />
              <div>
                <span class="comment-author">Alice</span>
                <p>Finally someone in the mainstream gets it.</p>
              </div>
            </div>
          </div>

          <!-- 2: Country -->
          <div class="comment-card" :class="{ 'comment-card--visible': commentsVisible }" style="--delay: 1; --rotate: 1deg;">
            <div class="comment-target">
              <span class="comment-target-icon">&#x1F1E7;&#x1F1F7;</span>
              <span class="comment-target-label">Brazil</span>
            </div>
            <div class="comment-bubble">
              <img src="https://i.pravatar.cc/80?u=carlos" class="comment-avatar" />
              <div>
                <span class="comment-author">Carlos</span>
                <p>Best Bitcoin community in the world, hands down.</p>
              </div>
            </div>
          </div>

          <!-- 3: Profile -->
          <div class="comment-card" :class="{ 'comment-card--visible': commentsVisible }" style="--delay: 2; --rotate: -0.8deg;">
            <div class="comment-target">
              <span class="comment-target-icon">&#x1F464;</span>
              <span class="comment-target-label">@fiatjaf's wall</span>
            </div>
            <div class="comment-bubble">
              <img src="https://i.pravatar.cc/80?u=river-wall" class="comment-avatar" />
              <div>
                <span class="comment-author">River</span>
                <p>Legend. The protocol wouldn't exist without this guy.</p>
              </div>
            </div>
          </div>

          <!-- 4: Post -->
          <div class="comment-card comment-card--wide comment-card--mobile-hide" :class="{ 'comment-card--visible': commentsVisible }" style="--delay: 3; --rotate: 0.5deg;">
            <div class="comment-target">
              <span class="comment-target-icon">&#x1F4AC;</span>
              <span class="comment-target-label">Post by @ODELL</span>
            </div>
            <div class="comment-bubble">
              <img src="https://i.pravatar.cc/80?u=mia-reply" class="comment-avatar" />
              <div>
                <span class="comment-author">Mia</span>
                <p>This is the most important thing anyone has said today. Reposting.</p>
              </div>
            </div>
          </div>

          <!-- 5: Book -->
          <div class="comment-card" :class="{ 'comment-card--visible': commentsVisible }" style="--delay: 4; --rotate: 2deg;">
            <div class="comment-target">
              <span class="comment-target-icon">&#x1F4D6;</span>
              <span class="comment-target-label">The Sovereign Individual</span>
            </div>
            <div class="comment-bubble">
              <img src="https://i.pravatar.cc/80?u=sam-book" class="comment-avatar" />
              <div>
                <span class="comment-author">Sam</span>
                <p>Chapter 7 changed how I think about money forever.</p>
              </div>
            </div>
          </div>

          <!-- 6: Treasure -->
          <div class="comment-card comment-card--mobile-hide" :class="{ 'comment-card--visible': commentsVisible }" style="--delay: 5; --rotate: -1.2deg;">
            <div class="comment-target">
              <span class="comment-target-icon">&#x1F4CD;</span>
              <span class="comment-target-label">Satoshi's Cache</span>
            </div>
            <div class="comment-bubble">
              <img src="https://i.pravatar.cc/80?u=hiker" class="comment-avatar" />
              <div>
                <span class="comment-author">BitcoinHiker</span>
                <p>Found it! Under the bench near the fountain. &#x1F389;</p>
              </div>
            </div>
          </div>

          <!-- 7: Article -->
          <div class="comment-card" :class="{ 'comment-card--visible': commentsVisible }" style="--delay: 6; --rotate: 0.8deg;">
            <div class="comment-target">
              <span class="comment-target-icon">&#x1F4DD;</span>
              <span class="comment-target-label">Why Nostr Will Win</span>
            </div>
            <div class="comment-bubble">
              <img src="https://i.pravatar.cc/80?u=priya-article" class="comment-avatar" />
              <div>
                <span class="comment-author">Priya</span>
                <p>This should be required reading for every developer.</p>
              </div>
            </div>
          </div>

          <!-- 8: Vine -->
          <div class="comment-card" :class="{ 'comment-card--visible': commentsVisible }" style="--delay: 7; --rotate: -1.8deg;">
            <div class="comment-target">
              <span class="comment-target-icon">&#x1F3AC;</span>
              <span class="comment-target-label">Vine by @Luna</span>
            </div>
            <div class="comment-bubble">
              <img src="https://i.pravatar.cc/80?u=zack-vine" class="comment-avatar" />
              <div>
                <span class="comment-author">Zack</span>
                <p>I've rewatched this 10 times already lol</p>
              </div>
            </div>
          </div>

          <!-- 9: Country -->
          <div class="comment-card comment-card--mobile-hide" :class="{ 'comment-card--visible': commentsVisible }" style="--delay: 8; --rotate: 1.5deg;">
            <div class="comment-target">
              <span class="comment-target-icon">&#x1F1FA;&#x1F1F8;</span>
              <span class="comment-target-label">United States</span>
            </div>
            <div class="comment-bubble">
              <img src="https://i.pravatar.cc/80?u=derek-usa" class="comment-avatar" />
              <div>
                <span class="comment-author">Derek</span>
                <p>The regulatory landscape is finally shifting. Bullish.</p>
              </div>
            </div>
          </div>

          <!-- 10: Hashtag -->
          <div class="comment-card comment-card--mobile-hide" :class="{ 'comment-card--visible': commentsVisible }" style="--delay: 9; --rotate: -0.5deg;">
            <div class="comment-target">
              <span class="comment-target-icon">#</span>
              <span class="comment-target-label">bitcoin</span>
            </div>
            <div class="comment-bubble">
              <img src="https://i.pravatar.cc/80?u=pleb" class="comment-avatar" />
              <div>
                <span class="comment-author">Pleb</span>
                <p>Stack sats. Stay humble. &#x1F9E1;</p>
              </div>
            </div>
          </div>

          <!-- 11: Reaction -->
          <div class="comment-card" :class="{ 'comment-card--visible': commentsVisible }" style="--delay: 10; --rotate: 1.2deg;">
            <div class="comment-target">
              <span class="comment-target-icon">&#x1F602;</span>
              <span class="comment-target-label">@Greg laughed at "I lost my job today"</span>
            </div>
            <div class="comment-bubble">
              <img src="https://i.pravatar.cc/80?u=connie-react" class="comment-avatar" />
              <div>
                <span class="comment-author">Connie</span>
                <p>You laugh reacted at someone losing their job? Really, Greg?</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ============================================================
         BRIDGE TO THE OPEN WEB: Logo grid of connected apps
         ============================================================ -->
    <section class="bridge-section">
      <div class="section-inner">
        <div class="section-header">
          <h2>A Bridge to the Open Web</h2>
          <p>No more managing separate accounts for every new platform. Ditto connects to <a href="https://soapbox.pub/blog/comparing-protocols" target="_blank"><em>Bluesky</em></a>, <a href="https://soapbox.pub/blog/comparing-protocols" target="_blank"><em>Mastodon</em></a>, and a growing universe of <em>Nostr</em> apps. Ditto is your homebase on the indie web.</p>
        </div>

        <div class="bridge-grid scroll-reveal" ref="bridgeRef">
          <a
            v-for="app in bridgeApps"
            :key="app.name"
            :href="app.url"
            target="_blank"
            class="bridge-app"
            :class="'bridge-app--' + app.protocol"
          >
            <div class="bridge-app-icon">
              <img :src="app.logo" :alt="app.name + ' logo'" loading="lazy" />
            </div>
            <span class="bridge-app-name">{{ app.name }}</span>
          </a>
        </div>
      </div>
    </section>

    <!-- ============================================================
         OWNERSHIP: What makes Ditto different?
         ============================================================ -->
    <section class="ownership-section">
      <div class="ownership-inner">
        <h2>What makes Ditto different?</h2>

        <div class="ownership-grid scroll-reveal" ref="ownershipRef">
          <div class="ownership-card" style="--delay: 0; --grad-angle: 135deg;">
            <h3>You own your data</h3>
            <p>We don't control your Ditto account. <a href="/learn/what-is-nostr">Your identity</a>, your content, your connections&nbsp;&mdash; they belong to&nbsp;you. No platform lock-in, no hostage data. Leave anytime and take everything with&nbsp;you.</p>
          </div>
          <div class="ownership-card" style="--delay: 1; --grad-angle: 180deg;">
            <h3>The community owns the&nbsp;project</h3>
            <p>Ditto is <a href="https://gitlab.com/soapbox-pub/ditto" target="_blank">open source</a>, free software&nbsp;&mdash; anyone can copy, improve, and build on our&nbsp;work. Built on the free and open Nostr protocol, the project belongs to&nbsp;everyone.</p>
          </div>
          <div class="ownership-card" style="--delay: 2; --grad-angle: 225deg;">
            <h3>No Big Tech</h3>
            <p>No central corporation controlling the data. Community servers keep things decentralized. No&nbsp;ads, no data mining, no tracking, no algorithms you're forced&nbsp;into. Read our <a href="https://soapbox.pub/ethics/" target="_blank">ethics pledge</a>.</p>
          </div>
        </div>

        <p class="ownership-kicker">
          Because we think <strong>Fun</strong> requires&nbsp;<strong>Freedom</strong>.
        </p>
      </div>
    </section>

    <!-- ============================================================
         BUILD ON DITTO: Open source, easy to customize
         ============================================================ -->
    <section class="selfhost-section">
      <div class="section-inner">
        <div class="section-header">
          <h2>Made for hacking on.</h2>
          <p>Ditto is open source and designed to work with tools like <a href="https://soapbox.pub/tools/shakespeare" target="_blank">Shakespeare</a> so you can fully control and customize your platform beyond themes. Add new features, change your feed, or even completely redesign the UI to fit your wants and dreams.</p>
        </div>

        <div class="build-showcase scroll-reveal" ref="shakespeareRef">
          <a href="https://shakespeare.diy/clone?url=https%3A%2F%2Fgitlab.com%2Fsoapbox-pub%2Fditto.git" target="_blank"><img src="/edit-ditto-in-shakespeare.png" alt="Edit Ditto with Shakespeare" class="build-screenshot" /></a>
        </div>

        <div class="build-actions">
          <a href="https://shakespeare.diy/clone?url=https%3A%2F%2Fgitlab.com%2Fsoapbox-pub%2Fditto.git" target="_blank" class="btn btn-primary">Edit in Shakespeare</a>
          <a href="https://gitlab.com/soapbox-pub/ditto" target="_blank" class="btn btn-ghost">View Source</a>
        </div>

        <div class="selfhost-blurb">
          <p>Ditto builds to static files. Deploy it on a $5 VPS, GitHub Pages, Netlify, or a Raspberry Pi in your closet. One config file. Your domain. Your community.</p>
          <div class="build-actions">
            <a href="/guides/self-hosting" class="btn btn-ghost">Read the self-hosting&nbsp;guide&nbsp;→</a>
          </div>
        </div>
      </div>
    </section>

    <!-- ============================================================
         FINAL CTA: Let's go
         ============================================================ -->
    <section class="final-cta">
      <div class="final-cta-inner">
        <h2>Ready?</h2>
        <p>No email. No phone number.<br>Just you and a <a href="https://soapbox.pub/blog/managing-nostr-keys" target="_blank">Nostr&nbsp;key</a>.</p>
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
      <p class="home-footer-credit">Made by <a href="https://soapbox.pub" target="_blank">Soapbox</a> &middot; <a href="https://gitlab.com/soapbox-pub" target="_blank">GitLab</a></p>
    </footer>

    </ScreenFrame>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { themes as allThemes, desktopThemes, getTheme, randomThemeKey, deriveTokens, hslToCSS } from '../themes';
import type { Y2KTheme } from '../themes';
import ThemeSwitcher from './ThemeSwitcher.vue';
import ScreenFrame from './ScreenFrame.vue';
import FakeDitto from './FakeDitto.vue';

// ─── Module-level state (survives SPA navigation, resets on refresh) ──

// This variable persists across SPA route changes but resets on full page reload,
// giving us the "random on refresh, stable on navigate" behavior for free.
let _persistedThemeKey: string | null = null;

// ─── Reactive state ───────────────────────────────────────────────────

const currentThemeKey = ref('');
const activeTheme = ref<Y2KTheme | null>(null);
const homeRef = ref<HTMLElement | null>(null);
const fontLoaded = ref(false);
const commentsSectionRef = ref<HTMLElement | null>(null);
const commentsVisible = ref(false);
const fakeDittoRef = ref<HTMLElement | null>(null);
const themeGridRef = ref<HTMLElement | null>(null);
const shakespeareRef = ref<HTMLElement | null>(null);
const bridgeRef = ref<HTMLElement | null>(null);
const ownershipRef = ref<HTMLElement | null>(null);
const themeCarouselRef = ref<HTMLElement | null>(null);
const themeCarouselTrackRef = ref<HTMLElement | null>(null);

// ─── Theme carousel data ──────────────────────────────────────────────

const themeImageFiles = [
  'bubblegum-ipad.png',
  'clackophile-ipad.png',
  'derek-ipad.png',
  'gamer-ipad.png',
  'grunge-ipad.png',
  'hacker-ipad.png',
  'hiker-ipad.png',
  'impossible-ipad.png',
  'kawaii-ipad.png',
  'mkcottage-ipad.png',
  'paint-ipad.png',
  'skater-ipad.png',
  'solarpunk-ipad.png',
];

// Double the images for seamless infinite loop
const themeCarouselImages = [
  ...themeImageFiles,
  ...themeImageFiles,
].map((file, i) => ({
  src: `/themes/${file}`,
  alt: file.replace('-ipad.png', '').replace(/^\w/, c => c.toUpperCase()) + ' theme',
}));

let carouselInterval: ReturnType<typeof setInterval> | null = null;

// ─── Bridge apps data ─────────────────────────────────────────────────

interface BridgeApp {
  name: string;
  url: string;
  logo: string;
  protocol: 'bluesky' | 'mastodon' | 'nostr';
}

const bridgeApps: BridgeApp[] = [
  // Cross-protocol bridges
  { name: 'Bluesky', url: 'https://bsky.app', logo: '/logos/bluesky.svg', protocol: 'bluesky' },
  { name: 'Mastodon', url: 'https://joinmastodon.org', logo: '/logos/mastodon.svg', protocol: 'mastodon' },
  // Nostr apps
  { name: 'diVine', url: 'https://divine.video', logo: 'https://fetch.ditto.pub/favicon/divine.video', protocol: 'nostr' },
  { name: 'webxdc', url: 'https://webxdc.org', logo: 'https://fetch.ditto.pub/favicon/webxdc.org', protocol: 'nostr' },
  { name: 'zap.stream', url: 'https://zap.stream', logo: 'https://fetch.ditto.pub/favicon/zap.stream', protocol: 'nostr' },
  { name: 'Blossom', url: 'https://blossom.hzrd149.com', logo: '/logos/blossom.png', protocol: 'nostr' },
  { name: 'Nodecast', url: 'https://nodecast.xyz', logo: 'https://fetch.ditto.pub/favicon/nodecast.xyz', protocol: 'nostr' },
  { name: 'Plektos', url: 'https://plektos.app', logo: 'https://fetch.ditto.pub/favicon/plektos.app', protocol: 'nostr' },
  { name: 'Inkwell', url: 'https://inkwell.shakespeare.wtf', logo: 'https://fetch.ditto.pub/favicon/inkwell.shakespeare.wtf', protocol: 'nostr' },
  { name: 'Treasures', url: 'https://treasures.to', logo: 'https://fetch.ditto.pub/favicon/treasures.to', protocol: 'nostr' },
  { name: 'following.space', url: 'https://following.space', logo: '/logos/following-space.png', protocol: 'nostr' },
  { name: 'Espy', url: 'https://espy.you', logo: 'https://fetch.ditto.pub/favicon/espy.you', protocol: 'nostr' },
  { name: 'Surveil', url: 'https://surveil.cards', logo: 'https://fetch.ditto.pub/favicon/surveil.cards', protocol: 'nostr' },
  { name: 'EmojiVerse', url: 'https://emojiverse.shakespeare.wtf', logo: 'https://fetch.ditto.pub/favicon/emojiverse.shakespeare.wtf', protocol: 'nostr' },
  { name: 'Pollerama', url: 'https://pollerama.fun', logo: '/logos/pollerama.svg', protocol: 'nostr' },
  { name: 'Cashu', url: 'https://cashu.space', logo: '/logos/cashu.png', protocol: 'nostr' },
  { name: 'Lightning', url: 'https://lightning.network', logo: '/logos/lightning.svg', protocol: 'nostr' },
  { name: 'Shakespeare', url: 'https://shakespeare.diy', logo: '/logos/shakespeare.png', protocol: 'nostr' },
  { name: 'Agora', url: 'https://agora.spot', logo: '/logos/agora.png', protocol: 'nostr' },
  { name: 'Chorus', url: 'https://chorus.community/groups', logo: '/logos/chorus.png', protocol: 'nostr' },
];

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
  // Otherwise pick a random fun theme. Module-level variable resets on full page reload.
  const key = _persistedThemeKey || randomThemeKey();
  applyTheme(key);

  // Intersection Observer for comments section animation
  if (commentsSectionRef.value) {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          commentsVisible.value = true;
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(commentsSectionRef.value);
  }

  // Generic scroll-reveal observer for other elements
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('scroll-reveal--visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  [fakeDittoRef, themeGridRef, themeCarouselRef, shakespeareRef, bridgeRef, ownershipRef].forEach((ref) => {
    if (ref.value) revealObserver.observe(ref.value);
  });

  // Mobile carousel: auto-advance with loop-back
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  if (isMobile && themeCarouselRef.value) {
    const carousel = themeCarouselRef.value;
    let userScrolling = false;
    let scrollTimeout: ReturnType<typeof setTimeout> | null = null;

    // Detect user touch/swipe
    carousel.addEventListener('touchstart', () => {
      userScrolling = true;
      if (scrollTimeout) clearTimeout(scrollTimeout);
    }, { passive: true });

    carousel.addEventListener('touchend', () => {
      scrollTimeout = setTimeout(() => { userScrolling = false; }, 3000);
    }, { passive: true });

    // Auto-advance every 3 seconds on mobile
    carouselInterval = setInterval(() => {
      if (userScrolling) return;
      const slideWidth = carousel.querySelector('.theme-carousel-slide')?.clientWidth ?? 200;
      const gap = 0; // negative margin handles spacing
      const advance = slideWidth * 0.75;
      const maxScroll = carousel.scrollWidth - carousel.clientWidth;

      if (carousel.scrollLeft >= maxScroll - 10) {
        // Loop back to start
        carousel.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        carousel.scrollBy({ left: advance, behavior: 'smooth' });
      }
    }, 3000);
  }
});

onUnmounted(() => {
  if (carouselInterval) {
    clearInterval(carouselInterval);
    carouselInterval = null;
  }
});
</script>
