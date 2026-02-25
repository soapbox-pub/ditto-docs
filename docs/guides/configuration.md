# Configuration

Ditto is configured through a `config.json` file at the project root. This file is read at build time and its values override the hardcoded defaults.

## How it works

The configuration system has three layers, in order of priority:

1. **User settings** (stored in localStorage) -- highest priority
2. **Build config** (`config.json`) -- your instance defaults
3. **Hardcoded defaults** -- Ditto's built-in fallbacks

This means your `config.json` sets the defaults for your instance, but users can always override them with their own preferences.

## Creating the config file

Create a file named `config.json` in the project root:

```json
{}
```

All fields are optional. Only include what you want to override.

## Available options

### Relays

Set the default relays for your instance:

```json
{
  "relays": [
    "wss://relay.example.com",
    "wss://relay.damus.io",
    "wss://nos.lol"
  ]
}
```

### Theme

Set the default theme preset:

```json
{
  "theme": "midnight"
}
```

Available presets: `"black"`, `"pink"`, `"midnight"`, `"toxic"`, `"lavender"`, `"ocean"`, `"sunset"`.

### Blossom upload servers

Configure where file uploads (images, videos) are stored:

```json
{
  "blossomServers": [
    "https://your-blossom.example.com",
    "https://blossom.primal.net"
  ]
}
```

### Content warning policy

Control how content warnings are handled:

```json
{
  "contentWarningPolicy": "blur"
}
```

Options: `"blur"` (default), `"hide"`, `"show"`.

### Feed settings

Toggle feed tabs:

```json
{
  "showGlobalFeed": true,
  "showCommunityFeed": true
}
```

### Link previews and favicons

Set custom services for link preview generation:

```json
{
  "linkPreviewUri": "https://your-service.example.com/link/{url}",
  "faviconUri": "https://your-service.example.com/favicon/{hostname}"
}
```

### Zap defaults

Configure Lightning payment defaults:

```json
{
  "defaultZapComment": "Zapped with MyInstance!",
  "defaultZapAmount": 21
}
```

## Environment variables

You can also point to a different config file using the `CONFIG_FILE` environment variable:

```bash
CONFIG_FILE=./my-config.json bun run build
```

## Example: community instance

Here's a full example for a community-branded instance:

```json
{
  "relays": [
    "wss://relay.yourcommunity.com",
    "wss://relay.damus.io",
    "wss://nos.lol"
  ],
  "theme": "ocean",
  "blossomServers": [
    "https://blossom.yourcommunity.com"
  ],
  "contentWarningPolicy": "blur",
  "defaultZapComment": "Zapped from YourCommunity!",
  "showGlobalFeed": true,
  "showCommunityFeed": true
}
```
