---
description: All non-standard Nostr event kinds that Ditto supports, including community and Ditto-specific kinds.
---

# Event Kinds

Ditto uses standard Nostr event kinds alongside a number of community and Ditto-specific kinds. This page documents all non-standard kinds that Ditto supports.

## External product kinds

These kinds originate from external Nostr apps and communities. Ditto renders them in the feed and provides toggle controls in settings.

### Media

| Kind | Name | Description | Addressable | External site |
|------|------|-------------|:-----------:|---------------|
| 34236 | Vine | Short-form video post | Yes | [divine.video](https://divine.video) |
| 30311 | Stream | Live streaming event | Yes | [zap.stream](https://zap.stream) |

### Social

| Kind | Name | Description | Addressable | External site |
|------|------|-------------|:-----------:|---------------|
| 1068 | Poll | Community poll with multiple-choice options | No | [pollerama.fun](https://pollerama.fun) |
| 1018 | Poll Vote | Cast a vote on a kind 1068 poll | No | [pollerama.fun](https://pollerama.fun) |
| 39089 | Follow Pack | Curated follow recommendations (starter packs) | Yes | [following.space](https://following.space), [following.party](https://following.party) |
| 30023 | Article | Long-form blog post with Markdown content (NIP-23) | Yes | [inkwell.shakespeare.wtf](https://inkwell.shakespeare.wtf) |

### Whimsy

| Kind | Name | Description | Addressable | External site |
|------|------|-------------|:-----------:|---------------|
| 3367 | Color Moment | Color palette post expressing a mood | No | [espy.you](https://espy.you) |
| 37381 | Magic Deck | Magic: The Gathering deck list | Yes | [surveil.cards](https://surveil.cards) |
| 37516 | Geocache | Geocache listing for real-world treasure hunting | Yes | [treasures.to](https://treasures.to) |
| 7516 | Found Log | Log entry recording a user finding a geocache | No | [treasures.to](https://treasures.to) |

---

## App settings (kind 30078)

Ditto stores encrypted per-user settings in a [NIP-78](https://github.com/nostr-protocol/nips/blob/master/78.md) application-specific data event. The `d` tag is always `ditto-metadata` and the content is NIP-44 encrypted JSON.

### Event structure

```json
{
  "kind": 30078,
  "content": "<NIP-44 encrypted JSON>",
  "tags": [
    ["d", "ditto-metadata"],
    ["title", "Ditto Metadata"],
    ["client", "ditto.pub"]
  ]
}
```

### Decrypted content schema

After NIP-44 decryption with the user's own pubkey, the content is a JSON object with these fields:

| Field | Type | Description |
|-------|------|-------------|
| `theme` | `"light" \| "dark" \| "system" \| "custom"` | Active theme mode |
| `customTheme` | `ThemeConfig` | Custom theme configuration with 3 core colors, optional font and background (see [Theming](#theme-definition-kind-36767)) |
| `useAppRelays` | `boolean` | Whether to use Ditto's default relays alongside the user's relay list |
| `feedSettings` | `FeedSettings` | Toggles controlling which content types appear in the sidebar and feed |
| `contentFilters` | `ContentFilter[]` | User-defined content filter rules |
| `contentWarningPolicy` | `"blur" \| "show" \| "hide"` | How to handle NIP-36 content-warning events |
| `notificationsCursor` | `number` | Unix timestamp (seconds) of the last viewed notification |
| `lastSync` | `number` | Timestamp of the last settings sync (milliseconds) |

### Example (decrypted)

```json
{
  "theme": "dark",
  "customTheme": {
    "colors": {
      "background": "228 20% 10%",
      "text": "210 40% 98%",
      "primary": "258 70% 60%"
    }
  },
  "useAppRelays": true,
  "feedSettings": {
    "feedIncludePosts": true,
    "feedIncludeReposts": true,
    "feedIncludeArticles": true,
    "feedIncludeVines": true,
    "showVines": true,
    "showStreams": true,
    "showPolls": false
  },
  "contentWarningPolicy": "blur",
  "notificationsCursor": 1700000000,
  "lastSync": 1700000000000
}
```

---

## Trending labels (kind 1985)

Ditto uses [NIP-32](https://github.com/nostr-protocol/nips/blob/master/32.md) label events to publish trending data. A trusted relay pubkey publishes these periodically under the `pub.ditto.trends` namespace.

### Trending hashtags

A label event with `l: #t` contains the current trending hashtags. Each `t` tag carries the hashtag name along with engagement counts.

```json
{
  "kind": 1985,
  "pubkey": "15b68d319a088a9b0c6853d2232aff0d69c8c58f0dccceabfb9a82bd4fd19c58",
  "content": "",
  "tags": [
    ["L", "pub.ditto.trends"],
    ["l", "#t", "pub.ditto.trends"],
    ["t", "bitcoin", "", "142", "580"],
    ["t", "nostr", "", "98", "312"],
    ["t", "art", "", "67", "201"]
  ]
}
```

**`t` tag format:** `["t", <hashtag>, "", <accounts>, <uses>]`

| Index | Value | Description |
|-------|-------|-------------|
| 0 | `"t"` | Tag name |
| 1 | hashtag | The trending hashtag (lowercased) |
| 2 | `""` | Reserved (empty) |
| 3 | accounts | Number of distinct accounts using this hashtag |
| 4 | uses | Total number of uses |

### Trending posts

A label event with `l: #e` contains the current trending event IDs, ordered by rank.

```json
{
  "kind": 1985,
  "pubkey": "15b68d319a088a9b0c6853d2232aff0d69c8c58f0dccceabfb9a82bd4fd19c58",
  "content": "",
  "tags": [
    ["L", "pub.ditto.trends"],
    ["l", "#e", "pub.ditto.trends"],
    ["e", "abc123..."],
    ["e", "def456..."],
    ["e", "ghi789..."]
  ]
}
```

Clients fetch trending posts by first querying for the label event, extracting the `e` tags, then fetching those events by ID.

### Sparkline data

Ditto publishes one trending-hashtags label event per UTC calendar day. Clients build sparkline charts by querying multiple days of label events filtered by `#t` and reading the `uses` count from each day's `t` tag. The day boundaries are aligned to UTC midnight derived from the most recent label event's `created_at`.

### Filter structure

```json
{
  "kinds": [1985],
  "authors": ["15b68d319a088a9b0c6853d2232aff0d69c8c58f0dccceabfb9a82bd4fd19c58"],
  "#L": ["pub.ditto.trends"],
  "#l": ["#t"],
  "limit": 1
}
```

Replace `"#l": ["#t"]` with `"#l": ["#e"]` for trending posts.

---

## Theme definition (kind 36767)

Addressable event for publishing shareable custom UI themes. A user can publish multiple themes, each identified by a unique `d` tag. Colors are stored in `c` tags, with optional font (`f`) and background (`bg`) tags.

### Event structure

```json
{
  "kind": 36767,
  "content": "",
  "tags": [
    ["d", "mk-dark-theme"],
    ["c", "#1a1a2e", "background"],
    ["c", "#e0e0e0", "text"],
    ["c", "#6c3ce0", "primary"],
    ["f", "Inter", "https://example.com/inter.woff2"],
    ["bg", "url https://example.com/bg.jpg", "mode cover", "m image/jpeg", "dim 1920x1080"],
    ["title", "MK Dark Theme"],
    ["description", "A sleek dark theme with purple and blue accents"],
    ["alt", "Custom theme: MK Dark Theme"],
    ["t", "theme"]
  ]
}
```

### Content

The `content` field is unused and MUST be an empty string (`""`).

### Tags

| Tag | Required | Description |
|-----|:--------:|-------------|
| `d` | Yes | Unique identifier (slug) for this theme |
| `c` | Yes (x3) | Hex color with role marker. See [Color tags](#color-tags). |
| `f` | No | Font declaration. See [Font tag](#font-tag). |
| `bg` | No | Background media. See [Background tag](#background-tag). |
| `title` | Yes | Human-readable theme name |
| `description` | No | Brief description of the theme |
| `alt` | Yes | NIP-31 human-readable fallback |
| `t` | Yes | Set to `"theme"` for discoverability |

### Color tags

Format: `["c", "#rrggbb", "<marker>"]`

Each theme requires exactly 3 color tags with these markers:

| Marker | Description |
|--------|-------------|
| `background` | Page background color |
| `text` | Primary text/foreground color |
| `primary` | Accent color (buttons, links, focus rings) |

Colors are lowercase 6-digit hex codes including the `#` sign. Clients derive all other UI colors (card, muted, border, etc.) from these 3 values.

### Font tag

Format: `["f", "<family>", "<url>"]`

Optional. At most one per event. The font applies globally to all text. Variable font files covering multiple weights are preferred.

### Background tag

Uses an imeta-style variadic format: `["bg", "url <url>", "mode <mode>", "m <mime-type>", ...]`

| Key | Required | Description |
|-----|:--------:|-------------|
| `url` | Yes | URL to an image or video file |
| `mode` | Yes | Display mode: `"cover"` or `"tile"` |
| `m` | Yes | MIME type (e.g. `"image/jpeg"`, `"video/mp4"`) |
| `dim` | No | Dimensions: `"<width>x<height>"` |
| `blurhash` | No | Blurhash placeholder for progressive loading |

### Multiple themes per user

Since kind 36767 is addressable, a user can publish multiple themes by using different `d` tag values. Publishing a new event with the same `d` tag replaces the previous version.

---

## Active profile theme (kind 16767)

Replaceable event representing the user's currently active profile theme. Only one exists per user. When visiting a profile, clients query this kind to determine what theme to display.

The event uses the same `c`, `f`, and `bg` tags as theme definitions. An optional `a` tag references the source theme definition for attribution.

### Event structure

```json
{
  "kind": 16767,
  "content": "",
  "tags": [
    ["c", "#1a1a2e", "background"],
    ["c", "#e0e0e0", "text"],
    ["c", "#6c3ce0", "primary"],
    ["f", "Inter", "https://example.com/inter.woff2"],
    ["bg", "url https://example.com/bg.jpg", "mode cover", "m image/jpeg"],
    ["title", "MK Dark Theme"],
    ["a", "36767:<source-author-pubkey>:<source-d-tag>"],
    ["alt", "Active profile theme"]
  ]
}
```

### Content

The `content` field is unused and MUST be an empty string (`""`).

### Tags

| Tag | Required | Description |
|-----|:--------:|-------------|
| `c` | Yes (x3) | Hex color with role marker (same format as kind 36767). |
| `f` | No | Font declaration. |
| `bg` | No | Background media. |
| `title` | No | Human-readable name for the theme. |
| `a` | No | Reference to the source kind 36767 event (`kind:pubkey:d-tag`). Enables attribution ("Using X's theme"). |
| `alt` | Yes | NIP-31 human-readable fallback |

### Client behavior

- **Query:** `{ kinds: [16767], authors: [<pubkey>], limit: 1 }` to get a user's active theme.
- **Colors:** Read the `c` tags to extract colors, `f` tags for fonts, and `bg` tag for the background.
- **Attribution:** The `a` tag lets clients display "Using MK Dark Theme by @mk" with a link to the source theme.
- **Set:** Publish a new kind 16767 event to change the active theme (replaces the previous one).
- **Clear:** Publish a kind 5 deletion event targeting kind 16767 to remove the active theme.
