---
outline: false
description: "Host your own Ditto instance. It's just static files — deploy on any domain, customize everything, and build your own corner of the carnival."
---

<div class="page-hero">
  <div class="page-hero-emoji">🏠</div>

# Self-Hosting Ditto

  <p class="page-hero-sub">Your own corner of the carnival. Deploy it anywhere, theme it however you want,<br>and give your community a place that doesn't suck.</p>
</div>

<div class="page-section">
<div class="big-idea">
<div class="big-idea-emoji">🌍</div>
<div class="big-idea-text">

## Just static files

Ditto is a static web application — HTML, CSS, and JavaScript. No backend, no database, no Docker, no complicated infrastructure. Upload the files to any web server, point a domain at them, and you're live. **That's it.**

</div>
</div>
</div>

<div class="page-divider"></div>

<div class="page-section">
<div class="section-header-left">
  <span class="section-emoji">📦</span>

## Download

</div>

Get the latest pre-built release as a zip file. Extract it and upload the contents to any web server or hosting service.

<a href="https://gitlab.com/api/v4/projects/79646323/jobs/artifacts/main/download?job=pages" class="vp-raw" style="display:inline-flex;align-items:center;gap:8px;padding:10px 24px;background:var(--vp-c-brand-3);color:#fff;border-radius:8px;font-weight:600;text-decoration:none;font-size:15px;transition:background 0.2s" onmouseover="this.style.background='var(--vp-c-brand-2)'" onmouseout="this.style.background='var(--vp-c-brand-3)'">Download Ditto (zip)</a>

No build step required — just serve the files from your domain. Make sure your web server serves `index.html` for all routes (SPA routing).

<div class="callout-fun">
  <span class="callout-emoji">⚡</span>
  <p>From download to live site in under 5 minutes. Netlify, Vercel, Cloudflare Pages, a VPS with nginx, a Raspberry Pi in your closet — if it can serve files, it can run Ditto.</p>
</div>
</div>

<div class="page-divider"></div>

<div class="page-section">
<div class="section-header-left">
  <span class="section-emoji">🔧</span>

## Compiling from source

</div>

If you want to customize Ditto before deploying, compile it yourself.

### Prerequisites

- **Node.js 22** and **npm 10.9.4**

### Build from source

```bash
# Clone the repository
git clone https://gitlab.com/soapbox-pub/ditto.git
cd ditto

# Install dependencies
npm install

# Build
npm run build

# The built site is in dist/
```

The `dist/` directory now contains everything you need. Upload it to any web server.
</div>

<div class="page-divider"></div>

<div class="page-section">
<div class="section-header-left">
  <span class="section-emoji">⚙️</span>

## Build Config (ditto.json)

</div>

Ditto is configured through a `ditto.json` file at the project root. This file is read at **build time** and validated against a strict Zod schema. Its values override the hardcoded defaults.

<div class="three-cards">
<div class="fun-card">
  <div class="fun-card-emoji">👤</div>

### User settings

Stored in localStorage. **Highest priority** — users can always override your defaults with their own preferences.

</div>
<div class="fun-card">
  <div class="fun-card-emoji">📋</div>

### Build config

Your `ditto.json` file. Sets instance defaults. This is where you shape the experience for your community.

</div>
<div class="fun-card">
  <div class="fun-card-emoji">🏗️</div>

### Hardcoded defaults

Ditto's built-in fallbacks. Used when nothing else is specified.

</div>
</div>

::: tip
The `ditto.json` file is in `.gitignore` by default, so each deployment can have its own configuration without conflicts.
:::

#### Creating the config file

Create a file named `ditto.json` in the project root:

```json
{}
```

All fields are optional. Only include what you want to override. The schema is validated at build time — invalid fields will cause a build error.

</div>

<div class="page-divider"></div>

<div class="page-section">
<div class="section-header-left">
  <span class="section-emoji">🎨</span>

## Theme

</div>

This is where the fun starts. Ditto doesn't believe in one-size-fits-all — your instance should look like *your* world.

Set the default theme mode:

```json
{
  "theme": "dark"
}
```

Options: `"dark"` (default), `"light"`, `"system"`, `"custom"`.

To use a custom theme, set theme to `"custom"` and provide a `customTheme` object with 3 core HSL colors. All other CSS tokens are derived automatically:

```json
{
  "theme": "custom",
  "customTheme": {
    "colors": {
      "background": "228 20% 10%",
      "text": "210 40% 98%",
      "primary": "258 70% 60%"
    }
  }
}
```

You can also include a custom font and background:

```json
{
  "theme": "custom",
  "customTheme": {
    "colors": {
      "background": "228 20% 10%",
      "text": "210 40% 98%",
      "primary": "258 70% 60%"
    },
    "font": {
      "family": "Inter",
      "url": "https://example.com/inter.woff2"
    },
    "background": {
      "url": "https://example.com/bg.jpg",
      "mode": "cover",
      "mimeType": "image/jpeg"
    }
  }
}
```

<div class="callout-fun">
  <span class="callout-emoji">🪐</span>
  <p>From just 3 colors — <code>background</code>, <code>text</code>, <code>primary</code> — Ditto derives 19 CSS custom properties (card, secondary, muted, accent, destructive, border, and more). Your instance becomes its own planet.</p>
</div>
</div>

<div class="page-divider"></div>

<div class="page-section">
<div class="section-header-left">
  <span class="section-emoji">📡</span>

## Relay metadata

</div>

Configure the default relays for your instance:

```json
{
  "relayMetadata": {
    "relays": [
      { "url": "wss://your-relay.example.com", "read": true, "write": true },
      { "url": "wss://relay.damus.io", "read": true, "write": false }
    ],
    "updatedAt": 0
  },
  "useAppRelays": true
}
```

Each relay has `url`, `read`, and `write` boolean flags. `useAppRelays` controls whether the app's default relays are used in addition to the user's personal relay list.
</div>

<div class="page-divider"></div>

<div class="page-section">
<div class="section-header-left">
  <span class="section-emoji">🌸</span>

## Blossom upload servers

</div>

Configure where file uploads (images, videos) are stored:

```json
{
  "blossomServers": [
    "https://blossom.ditto.pub/",
    "https://blossom.primal.net/"
  ]
}
```

Defaults: `blossom.ditto.pub`, `blossom.dreamith.to`, `blossom.primal.net`.
</div>

<div class="page-divider"></div>

<div class="page-section">
<div class="section-header-left">
  <span class="section-emoji">🔒</span>

## Content warning policy

</div>

Control how content warnings are handled:

```json
{
  "contentWarningPolicy": "blur"
}
```

Options: `"blur"` (default), `"hide"`, `"show"`.
</div>

<div class="page-divider"></div>

<div class="page-section">
<div class="section-header-left">
  <span class="section-emoji">📺</span>

## Feed settings

</div>

Toggle which content types appear in the sidebar and feed. All fields are optional booleans:

```json
{
  "feedSettings": {
    "feedIncludePosts": true,
    "feedIncludeReposts": true,
    "feedIncludeArticles": false,
    "feedIncludeVines": false,
    "feedIncludePolls": false,
    "feedIncludeStreams": false,
    "feedIncludeColors": false,
    "feedIncludePacks": false,
    "feedIncludeDecks": false,
    "feedIncludeTreasureGeocaches": false,
    "feedIncludeTreasureFoundLogs": false,
    "showArticles": false,
    "showVines": true,
    "showPolls": false,
    "showStreams": true,
    "showColors": false,
    "showPacks": true,
    "showDecks": false,
    "showTreasures": false,
    "showTreasureGeocaches": true,
    "showTreasureFoundLogs": true
  }
}
```

<div class="two-cards">
<div class="fun-card">
  <div class="fun-card-emoji">📥</div>

### feedInclude*

Controls whether a content type appears in the **main feed**. Choose what's front and center.

</div>
<div class="fun-card">
  <div class="fun-card-emoji">📌</div>

### show*

Controls whether a content type gets a **sidebar navigation entry**. Shape the journey.

</div>
</div>

<div class="callout-fun">
  <span class="callout-emoji">🎪</span>
  <p>This is how you curate your carnival. A music community might show playlists and streams front and center. A gaming community might highlight Webxdc games and treasure hunts. <strong>Your instance, your attractions.</strong></p>
</div>
</div>

<div class="page-divider"></div>

<div class="page-section">
<div class="section-header-left">
  <span class="section-emoji">🌍</span>

## Environment variables

</div>

You can point to a different config file path using the `CONFIG_FILE` environment variable:

```bash
CONFIG_FILE=./my-config.json npm run build
```
</div>

<div class="page-divider"></div>

<div class="page-section">
<div class="section-header-left">
  <span class="section-emoji">🏘️</span>

## Example: community instance

</div>

Here's a full `ditto.json` for a community-branded instance:

```json
{
  "theme": "dark",
  "relayMetadata": {
    "relays": [
      { "url": "wss://relay.yourcommunity.com", "read": true, "write": true },
      { "url": "wss://relay.damus.io", "read": true, "write": false },
      { "url": "wss://nos.lol", "read": true, "write": false }
    ],
    "updatedAt": 0
  },
  "useAppRelays": false,
  "blossomServers": [
    "https://blossom.yourcommunity.com/"
  ],
  "contentWarningPolicy": "blur"
}
```

<div class="callout-fun">
  <span class="callout-emoji">💫</span>
  <p>Every instance is its own world — its own colors, its own relays, its own personality. The protocol connects them all, but the experience is entirely yours to shape.</p>
</div>
</div>

<div class="page-divider"></div>

<div class="page-section">
<div class="section-header-left">
  <span class="section-emoji">📱</span>

## Android app

</div>

Ditto includes a Capacitor project for building native Android apps. Distribute Ditto as a branded app for your community:

```bash
# Build the web app first
npm run build

# Sync with Capacitor
npx cap sync

# Open in Android Studio
npx cap open android
```
</div>

<div class="page-divider"></div>

<div class="page-section">
<div class="section-header-left">
  <span class="section-emoji">🎨</span>

## Custom branding

</div>

Beyond themes, you can make Ditto entirely your own:

<div class="two-cards">
<div class="fun-card">
  <div class="fun-card-emoji">🖼️</div>

### Visual identity

- **Logo** — Replace `public/logo.svg`
- **App name** — Update in `index.html` and `public/manifest.webmanifest`
- **OG image** — Replace the OG image in `public/` for social sharing previews

</div>
<div class="fun-card">
  <div class="fun-card-emoji">⚙️</div>

### Infrastructure

- **Default relays** — Set in `ditto.json`
- **Upload servers** — Set your own Blossom servers in `ditto.json`
- **Content policy** — Configure content warnings and feed visibility

</div>
</div>
</div>

<div class="page-divider"></div>

<div class="page-cta">
  <div class="page-cta-emoji">🪐</div>

## Build your own world

Every community deserves a place that reflects who they are — not another identical, soulless platform. Ditto gives you the tools to create something with personality, running on an open protocol that connects to everything.

  <div class="page-cta-actions">
    <a href="https://gitlab.com/api/v4/projects/79646323/jobs/artifacts/main/download?job=pages" class="btn btn-primary">
      <span>Download Ditto</span>
    </a>
    <a href="/hacking" class="btn btn-ghost">Hacking on Ditto</a>
  </div>
</div>
