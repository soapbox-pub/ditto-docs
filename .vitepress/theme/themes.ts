/**
 * Y2K Theme Definitions
 *
 * 7 Y2K-inspired theme presets ported from ditto-mew.
 * Each theme defines 3 core HSL colors, a display font, and a background image.
 * Extended CSS tokens (card, muted, border, etc.) are derived automatically.
 */

// ─── Types ────────────────────────────────────────────────────────────

export interface ThemeColors {
  /** HSL string, e.g. "351 100% 86%" */
  background: string;
  text: string;
  primary: string;
}

export interface ThemeFont {
  family: string;
  /** Direct URL to .woff2 file */
  url: string;
}

export interface ThemeBackground {
  /** Wallpaper/desktop background image */
  bg: string;
  mode: 'cover' | 'tile';
}

export interface Y2KTheme {
  key: string;
  label: string;
  emoji: string;
  colors: ThemeColors;
  /** Display/heading font (loaded from CDN) */
  font: ThemeFont;
  /** Body text font family stack */
  bodyFont: string;
  /** Optional CDN URL for body font (if not a system font) */
  bodyFontUrl?: string;
  /** Scale factor for heading font sizes (1 = normal, <1 = smaller for oversized fonts) */
  headingScale: number;
  background: ThemeBackground;
}

// ─── HSL Utilities (simplified from ditto-mew/colorUtils) ─────────────

function parseHsl(hsl: string): { h: number; s: number; l: number } {
  const parts = hsl.trim().replace(/%/g, '').split(/\s+/).map(Number);
  return { h: parts[0], s: parts[1], l: parts[2] };
}

function formatHsl(h: number, s: number, l: number): string {
  return `${Math.round(h * 10) / 10} ${Math.round(s * 10) / 10}% ${Math.round(l * 10) / 10}%`;
}

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  s /= 100;
  l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)];
}

function getLuminance(r: number, g: number, b: number): number {
  const sRGB = [r, g, b].map(v => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2];
}

function isDarkTheme(backgroundHsl: string): boolean {
  const { h, s, l } = parseHsl(backgroundHsl);
  const [r, g, b] = hslToRgb(h, s, l);
  return getLuminance(r, g, b) < 0.2;
}

function lighten(hsl: string, amount: number): string {
  const { h, s, l } = parseHsl(hsl);
  return formatHsl(h, s, Math.min(100, l + amount));
}

function darken(hsl: string, amount: number): string {
  const { h, s, l } = parseHsl(hsl);
  return formatHsl(h, s, Math.max(0, l - amount));
}

function contrastForeground(bgHsl: string): string {
  return isDarkTheme(bgHsl) ? '0 0% 100%' : '222.2 84% 4.9%';
}

/** Convert an HSL string like "351 100% 86%" to a CSS hsl() color */
export function hslToCSS(hsl: string): string {
  return `hsl(${hsl.replace(/%/g, '%')})`;
}

// ─── Token Derivation ─────────────────────────────────────────────────

export interface DerivedTokens {
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  border: string;
  ring: string;
}

/**
 * Derive extended CSS tokens from 3 core HSL colors.
 * Simplified version of ditto-mew's deriveTokensFromCore().
 */
export function deriveTokens(colors: ThemeColors): DerivedTokens {
  const { background, text, primary } = colors;
  const dark = isDarkTheme(background);

  const card = dark ? lighten(background, 2) : background;
  const secondarySurface = dark ? lighten(background, 8) : darken(background, 4);
  const muted = dark ? lighten(background, 8) : darken(background, 4);

  const pParsed = parseHsl(primary);
  const border = dark
    ? formatHsl(pParsed.h, pParsed.s * 0.4, 30)
    : formatHsl(pParsed.h, pParsed.s * 0.5, 82);

  const fgParsed = parseHsl(text);
  const mutedFg = dark
    ? formatHsl(fgParsed.h, Math.max(fgParsed.s - 20, 0), Math.max(fgParsed.l - 30, 40))
    : formatHsl(fgParsed.h, Math.max(fgParsed.s - 30, 0), Math.min(fgParsed.l + 35, 55));

  const primaryFg = contrastForeground(primary);

  return {
    background,
    foreground: text,
    card,
    cardForeground: text,
    primary,
    primaryForeground: primaryFg,
    secondary: secondarySurface,
    secondaryForeground: text,
    muted,
    mutedForeground: mutedFg,
    accent: primary,
    accentForeground: primaryFg,
    border,
    ring: primary,
  };
}

// ─── The 7 Y2K Theme Presets ──────────────────────────────────────────

export const themes: Y2KTheme[] = [
  {
    key: 'kawaii',
    label: 'Kawaii',
    emoji: '\u{1F338}', // 🌸
    colors: {
      background: '351 100% 86%',
      text: '270 30% 20%',
      primary: '340 100% 96%',
    },
    font: {
      family: 'Cherry Bomb One',
      url: 'https://cdn.jsdelivr.net/fontsource/fonts/cherry-bomb-one@latest/latin-400-normal.woff2',
    },
    bodyFont: "'Quicksand', 'Trebuchet MS', sans-serif",
    bodyFontUrl: 'https://cdn.jsdelivr.net/fontsource/fonts/quicksand@latest/latin-400-normal.woff2',
    headingScale: 0.9,
    background: {
      bg: '/kawaii-bg.png',
      mode: 'cover',
    },
  },
  {
    key: 'grunge',
    label: 'Grunge',
    emoji: '\u{1F5A4}', // 🖤
    colors: {
      background: '276 40% 8%',
      text: '0 0% 75%',
      primary: '328 100% 54%',
    },
    font: {
      family: 'Big Shoulders Stencil Display',
      url: 'https://cdn.jsdelivr.net/fontsource/fonts/big-shoulders-stencil-display@latest/latin-400-normal.woff2',
    },
    bodyFont: "'Outfit', 'Verdana', sans-serif",
    bodyFontUrl: 'https://cdn.jsdelivr.net/fontsource/fonts/outfit@latest/latin-400-normal.woff2',
    headingScale: 0.85,
    background: {
      bg: '/grunge-bg.png',
      mode: 'cover',
    },
  },
  {
    key: 'mspaint',
    label: 'MS Paint',
    emoji: '\u{1F5A5}\u{FE0F}', // 🖥️
    colors: {
      background: '200 20% 95%',
      text: '0 0% 10%',
      primary: '240 100% 50%',
    },
    font: {
      family: 'Silkscreen',
      url: 'https://cdn.jsdelivr.net/fontsource/fonts/silkscreen@latest/latin-400-normal.woff2',
    },
    bodyFont: "'Tahoma', sans-serif",
    headingScale: 0.9,
    background: {
      bg: '/mspaint-bg.png',
      mode: 'cover',
    },
  },
  {
    key: 'retropop',
    label: 'Retro Pop',
    emoji: '\u{1F4BF}', // 💿
    colors: {
      background: '260 50% 70%',
      text: '40 30% 15%',
      primary: '340 100% 76%',
    },
    font: {
      family: 'Bungee Shade',
      url: 'https://cdn.jsdelivr.net/fontsource/fonts/bungee-shade@latest/latin-400-normal.woff2',
    },
    bodyFont: "'Space Grotesk', 'Gill Sans', sans-serif",
    bodyFontUrl: 'https://cdn.jsdelivr.net/fontsource/fonts/space-grotesk@latest/latin-400-normal.woff2',
    headingScale: 0.55,
    background: {
      bg: '/retropop-bg.png',
      mode: 'cover',
    },
  },
  {
    key: 'bubblegum',
    label: 'Bubblegum',
    emoji: '\u{1F36C}', // 🍬
    colors: {
      background: '328 100% 54%',
      text: '0 0% 100%',
      primary: '282 37% 53%',
    },
    font: {
      family: 'Luckiest Guy',
      url: 'https://cdn.jsdelivr.net/fontsource/fonts/luckiest-guy@latest/latin-400-normal.woff2',
    },
    bodyFont: "'Nunito', 'Arial', sans-serif",
    bodyFontUrl: 'https://cdn.jsdelivr.net/fontsource/fonts/nunito@latest/latin-400-normal.woff2',
    headingScale: 0.8,
    background: {
      bg: '/bubblegum-bg.png',
      mode: 'cover',
    },
  },
  {
    key: 'gamer',
    label: 'Gamer',
    emoji: '\u{26A1}', // ⚡
    colors: {
      background: '140 60% 4%',
      text: '120 100% 50%',
      primary: '195 100% 50%',
    },
    font: {
      family: 'Press Start 2P',
      url: 'https://cdn.jsdelivr.net/fontsource/fonts/press-start-2p@latest/latin-400-normal.woff2',
    },
    bodyFont: "'Share Tech Mono', 'Lucida Console', monospace",
    bodyFontUrl: 'https://cdn.jsdelivr.net/fontsource/fonts/share-tech-mono@latest/latin-400-normal.woff2',
    headingScale: 0.45,
    background: {
      bg: '/gamer-bg.png',
      mode: 'cover',
    },
  },
  {
    key: 'skater',
    label: 'Skater',
    emoji: '\u{1F6F9}', // 🛹
    colors: {
      background: '0 0% 42%',
      text: '0 0% 100%',
      primary: '80 100% 50%',
    },
    font: {
      family: 'Permanent Marker',
      url: 'https://cdn.jsdelivr.net/fontsource/fonts/permanent-marker@latest/latin-400-normal.woff2',
    },
    bodyFont: "'Archivo Black', 'Arial Black', sans-serif",
    bodyFontUrl: 'https://cdn.jsdelivr.net/fontsource/fonts/archivo-black@latest/latin-400-normal.woff2',
    headingScale: 0.9,
    background: {
      bg: '/skater-bg.png',
      mode: 'cover',
    },
  },
];

/** Get a theme by key */
export function getTheme(key: string): Y2KTheme | undefined {
  return themes.find(t => t.key === key);
}

/** Pick a random theme key */
export function randomThemeKey(): string {
  return themes[Math.floor(Math.random() * themes.length)].key;
}
