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
| `customTheme` | `ThemeTokens` | HSL token values for the custom theme slot (see [Theming](#theme-definition-kind-33891)) |
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
    "background": "228 20% 10%",
    "foreground": "210 40% 98%",
    "primary": "258 70% 60%",
    "accent": "225 65% 55%"
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

## Theme definition (kind 33891)

Addressable event for publishing shareable custom UI themes. A user can publish multiple themes, each identified by a unique `d` tag. Themes are full HSL color token sets.

### Event structure

```json
{
  "kind": 33891,
  "content": "{\"background\":\"228 20% 10%\",\"foreground\":\"210 40% 98%\",\"card\":\"228 20% 12%\",\"cardForeground\":\"210 40% 98%\",\"popover\":\"228 20% 12%\",\"popoverForeground\":\"210 40% 98%\",\"primary\":\"258 70% 60%\",\"primaryForeground\":\"0 0% 100%\",\"secondary\":\"228 16% 18%\",\"secondaryForeground\":\"210 40% 98%\",\"muted\":\"228 16% 18%\",\"mutedForeground\":\"215 20.2% 65.1%\",\"accent\":\"225 65% 55%\",\"accentForeground\":\"0 0% 100%\",\"destructive\":\"0 72% 51%\",\"destructiveForeground\":\"210 40% 98%\",\"border\":\"228 14% 20%\",\"input\":\"228 14% 20%\",\"ring\":\"258 70% 60%\"}",
  "tags": [
    ["d", "mk-dark-theme"],
    ["title", "MK Dark Theme"],
    ["description", "A sleek dark theme with purple and blue accents"],
    ["alt", "Custom theme: MK Dark Theme"],
    ["t", "theme"]
  ]
}
```

### Tags

| Tag | Required | Description |
|-----|:--------:|-------------|
| `d` | Yes | Unique identifier (slug) for this theme |
| `title` | Yes | Human-readable theme name |
| `description` | No | Brief description of the theme |
| `alt` | Yes | NIP-31 human-readable fallback |
| `t` | Yes | Set to `"theme"` for discoverability |

### Content tokens

The `content` field is a JSON object where each value is an HSL color string in the format `"H S% L%"` (e.g. `"258 70% 60%"`).

**Required tokens:** `background`, `foreground`, `primary`, `accent`

**Optional tokens** (clients should derive these if missing):

| Token | Description |
|-------|-------------|
| `card` | Card surface background |
| `cardForeground` | Card text color |
| `popover` | Popover/dropdown background |
| `popoverForeground` | Popover text color |
| `primaryForeground` | Text on primary-colored elements |
| `secondary` | Secondary element background |
| `secondaryForeground` | Secondary element text |
| `muted` | Muted/subtle background |
| `mutedForeground` | Muted/subtle text |
| `accentForeground` | Text on accent-colored elements |
| `destructive` | Danger/delete action color |
| `destructiveForeground` | Text on destructive elements |
| `border` | Border color |
| `input` | Form input border color |
| `ring` | Focus ring color |

### Multiple themes per user

Since kind 33891 is addressable, a user can publish multiple themes by using different `d` tag values. Publishing a new event with the same `d` tag replaces the previous version.

---

## Active profile theme (kind 11667)

Replaceable event representing the user's currently active profile theme. Only one exists per user. When visiting a profile, clients query this kind to determine what theme to display.

The content is a **copy** of the theme tokens from whichever theme definition the user has set as active. An `a` tag references the source theme definition for attribution.

### Event structure

```json
{
  "kind": 11667,
  "content": "{\"background\":\"228 20% 10%\",\"foreground\":\"210 40% 98%\",\"card\":\"228 20% 12%\",\"cardForeground\":\"210 40% 98%\",\"popover\":\"228 20% 12%\",\"popoverForeground\":\"210 40% 98%\",\"primary\":\"258 70% 60%\",\"primaryForeground\":\"0 0% 100%\",\"secondary\":\"228 16% 18%\",\"secondaryForeground\":\"210 40% 98%\",\"muted\":\"228 16% 18%\",\"mutedForeground\":\"215 20.2% 65.1%\",\"accent\":\"225 65% 55%\",\"accentForeground\":\"0 0% 100%\",\"destructive\":\"0 72% 51%\",\"destructiveForeground\":\"210 40% 98%\",\"border\":\"228 14% 20%\",\"input\":\"228 14% 20%\",\"ring\":\"258 70% 60%\"}",
  "tags": [
    ["a", "33891:<source-author-pubkey>:<source-d-tag>"],
    ["alt", "Active profile theme"]
  ]
}
```

### Tags

| Tag | Required | Description |
|-----|:--------:|-------------|
| `a` | No | Reference to the source kind 33891 event (`kind:pubkey:d-tag`). Enables attribution ("Using X's theme"). |
| `alt` | Yes | NIP-31 human-readable fallback |

### Client behavior

- **Query:** `{ kinds: [11667], authors: [<pubkey>], limit: 1 }` to get a user's active theme.
- **Attribution:** The `a` tag lets clients display "Using MK Dark Theme by @mk" with a link to the source theme.
- **Set:** Publish a new kind 11667 event to change the active theme (replaces the previous one).
- **Clear:** Publish a kind 5 deletion event targeting kind 11667 to remove the active theme.
