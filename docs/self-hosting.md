---
description: Host your own Ditto instance. It's just static files you can deploy on any domain.
---

# Self-Hosting Ditto

Ditto is a static web application -- just HTML, CSS, and JavaScript. Deploy it on any domain with any web server or static hosting provider.

## Download

Get the latest pre-built release as a zip file. Extract it and upload the contents to any web server or hosting service.

<a href="https://gitlab.com/api/v4/projects/79646323/jobs/artifacts/main/download?job=pages" class="vp-raw" style="display:inline-flex;align-items:center;gap:8px;padding:10px 24px;background:var(--vp-c-brand-3);color:#fff;border-radius:8px;font-weight:600;text-decoration:none;font-size:15px;transition:background 0.2s" onmouseover="this.style.background='var(--vp-c-brand-2)'" onmouseout="this.style.background='var(--vp-c-brand-3)'">Download Ditto (zip)</a>

No build step required -- just serve the files from your domain. Make sure your web server serves `index.html` for all routes (SPA routing).

## Compiling

If you want to customize Ditto before deploying, you can compile it from source.

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

### Build Config (ditto.json)

Ditto is configured through a `ditto.json` file at the project root. This file is read at **build time** and validated against a strict Zod schema. Its values override the hardcoded defaults.

The configuration system has three layers, in order of priority:

1. **User settings** (stored in localStorage) -- highest priority
2. **Build config** (`ditto.json`) -- your instance defaults
3. **Hardcoded defaults** -- Ditto's built-in fallbacks

This means your `ditto.json` sets the defaults for your instance, but users can always override them with their own preferences.

::: tip
The `ditto.json` file is in `.gitignore` by default, so each deployment can have its own configuration without conflicts.
:::

#### Creating the config file

Create a file named `ditto.json` in the project root:

```json
{}
```

All fields are optional. Only include what you want to override. The schema is validated at build time -- invalid fields will cause a build error.

#### Theme

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

The 3 required color values: `background`, `text`, `primary`. From these, Ditto derives 19 CSS custom properties (card, secondary, muted, accent, destructive, border, etc.).

#### Relay metadata

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

#### Blossom upload servers

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

#### Content warning policy

Control how content warnings are handled:

```json
{
  "contentWarningPolicy": "blur"
}
```

Options: `"blur"` (default), `"hide"`, `"show"`.

#### Feed settings

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

Fields starting with `feedInclude` control whether that content type appears in the main feed. Fields starting with `show` control whether it gets a sidebar navigation entry.

#### Link previews and favicons

Set custom services for link preview generation and favicon fetching. These use URI templates:

```json
{
  "linkPreviewUrl": "https://fetch.ditto.pub/link/{url}",
  "faviconUrl": "https://fetch.ditto.pub/favicon/{hostname}"
}
```

#### CORS proxy

Set a CORS proxy for fetching external resources:

```json
{
  "corsProxy": "https://proxy.shakespeare.diy/?url={href}"
}
```

#### Stats pubkey

Set the NIP-85 stats pubkey (64-character hex, or empty string to disable):

```json
{
  "nip85StatsPubkey": "5f68e85ee174102ca8978eef302129f081f03456c884185d5ec1c1224ab633ea"
}
```

#### Environment variables

You can point to a different config file path using the `CONFIG_FILE` environment variable:

```bash
CONFIG_FILE=./my-config.json npm run build
```

#### Example: community instance

Here's a full example for a community-branded instance:

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

## Android app

Ditto includes a Capacitor project for building native Android apps:

```bash
# Build the web app first
npm run build

# Sync with Capacitor
npx cap sync

# Open in Android Studio
npx cap open android
```

This lets you distribute Ditto as a branded Android app for your community.

## Custom branding

Beyond themes, you can customize:

- **Logo** -- Replace `public/logo.svg`
- **App name** -- Update in `index.html` and `public/manifest.webmanifest`
- **Default relays** -- Set in `ditto.json`
- **Upload servers** -- Set your own Blossom servers in `ditto.json`
- **OG image** -- Replace the OG image in `public/` for social sharing previews
