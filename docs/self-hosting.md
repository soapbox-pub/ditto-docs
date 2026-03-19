---
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

If you want to customize Ditto before deploying, compile it yourself. Requires **Node.js 22+**.

```
https://gitlab.com/soapbox-pub/ditto.git
```

```bash
npm i
npm run build
```

The `dist/` directory now contains everything you need. Upload it to any web server.
</div>

<div class="page-divider"></div>

<div class="page-section">
<div class="section-header-left">
  <span class="section-emoji">⚙️</span>

## Build Config (ditto.json)

</div>

Ditto is configured through a `ditto.json` file at the project root. This file is read at **build time**. All fields are optional — only include what you want to override.

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
  },
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
  ]
}
```

You can point to a different config file path using the `CONFIG_FILE` environment variable:

```bash
CONFIG_FILE=./my-config.json npm run build
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

<div class="page-section">
<div class="section-header-left">
  <span class="section-emoji">📡</span>

## Ditto Relay

</div>

For those who want full sovereignty, you can run your own Nostr relay alongside Ditto. This is entirely optional and only recommended if you're serious about controlling your own infrastructure.

[Ditto Relay on GitLab](https://gitlab.com/soapbox-pub/ditto-relay)

</div>

<div class="page-divider"></div>

<div class="page-section">
<div class="section-header-left">
  <span class="section-emoji">📱</span>

## Android app

</div>

Ditto is available on [zap.store](https://zapstore.dev/apps/pub.ditto.app), or you can download the latest `.apk` and `.aab` from the [releases page](https://gitlab.com/soapbox-pub/ditto/-/releases/permalink/latest).

<div style="display:flex;flex-wrap:wrap;gap:8px;margin:16px 0;">
  <a href="https://zapstore.dev/apps/pub.ditto.app" class="vp-raw" style="display:inline-flex;align-items:center;gap:8px;padding:10px 24px;background:var(--vp-c-brand-3);color:#fff;border-radius:8px;font-weight:600;text-decoration:none;font-size:15px;transition:background 0.2s" onmouseover="this.style.background='var(--vp-c-brand-2)'" onmouseout="this.style.background='var(--vp-c-brand-3)'">zap.store</a>
  <a href="https://gitlab.com/soapbox-pub/ditto/-/releases/permalink/latest" class="vp-raw" style="display:inline-flex;align-items:center;gap:8px;padding:10px 24px;background:var(--vp-c-brand-3);color:#fff;border-radius:8px;font-weight:600;text-decoration:none;font-size:15px;transition:background 0.2s" onmouseover="this.style.background='var(--vp-c-brand-2)'" onmouseout="this.style.background='var(--vp-c-brand-3)'">Latest release (.apk / .aab)</a>
</div>

Ditto also includes a Capacitor project for building custom Android apps. Distribute Ditto as a branded app for your community:

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
