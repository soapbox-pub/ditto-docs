# Configuration

Ditto is configured through a `ditto.json` file at the project root. This file is read at **build time** and validated against a strict Zod schema. Its values override the hardcoded defaults.

## How it works

The configuration system has three layers, in order of priority:

1. **User settings** (stored in localStorage) -- highest priority
2. **Build config** (`ditto.json`) -- your instance defaults
3. **Hardcoded defaults** -- Ditto's built-in fallbacks

This means your `ditto.json` sets the defaults for your instance, but users can always override them with their own preferences.

## Creating the config file

Create a file named `ditto.json` in the project root:

```json
{}
```

All fields are optional. Only include what you want to override. The schema is validated at build time -- invalid fields will cause a build error.

## Available options

### Theme

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

### Relay metadata

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

### Blossom upload servers

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

### Content warning policy

Control how content warnings are handled:

```json
{
  "contentWarningPolicy": "blur"
}
```

Options: `"blur"` (default), `"hide"`, `"show"`.

### Feed settings

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

### Link previews and favicons

Set custom services for link preview generation and favicon fetching. These use URI templates:

```json
{
  "linkPreviewUrl": "https://fetch.ditto.pub/link/{url}",
  "faviconUrl": "https://fetch.ditto.pub/favicon/{hostname}"
}
```

### CORS proxy

Set a CORS proxy for fetching external resources:

```json
{
  "corsProxy": "https://proxy.shakespeare.diy/?url={href}"
}
```

### Stats pubkey

Set the NIP-85 stats pubkey (64-character hex, or empty string to disable):

```json
{
  "nip85StatsPubkey": "5f68e85ee174102ca8978eef302129f081f03456c884185d5ec1c1224ab633ea"
}
```

## Environment variables

You can point to a different config file path using the `CONFIG_FILE` environment variable:

```bash
CONFIG_FILE=./my-config.json npm run build
```

## Example: community instance

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
