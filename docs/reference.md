---
outline: [2, 2]
description: All Nostr event kinds that Ditto supports, including NIP extensions, community kinds, and Ditto-specific kinds.
og_image: /og-image-reference.jpg
---

<div class="page-hero">
  <div class="page-hero-emoji">📋</div>

# Ditto Nostr Reference

  <p class="page-hero-sub">All Nostr event kinds that Ditto supports, including NIP extensions, community kinds, and Ditto-specific kinds.</p>
</div>

For a complete list of all Nostr event kinds, see [nostrbook.dev](https://nostrbook.dev/). The protocol is defined by [NIPs](https://github.com/nostr-protocol/nips) (Nostr Implementation Possibilities), and community members can share custom NIP proposals on [NostrHub](https://nostrhub.io/).

<div class="section-header-left">
  <span class="section-emoji">📦</span>

## Supported kinds

</div>

<style>
.kinds-table {
  width: 100%;
  border-collapse: collapse;
  margin: 24px 0;
}
.kinds-table th,
.kinds-table td {
  padding: 10px 14px;
  border: 1px solid var(--vp-c-divider);
  text-align: left;
}
.kinds-table th {
  font-weight: 600;
  background: var(--vp-c-bg-soft);
}
.kinds-table .ditto-kind {
  background: linear-gradient(135deg, rgba(124, 82, 224, 0.15) 0%, rgba(232, 121, 249, 0.15) 50%, rgba(251, 146, 60, 0.10) 100%);
}
:root.dark .kinds-table .ditto-kind {
  background: linear-gradient(135deg, rgba(124, 82, 224, 0.25) 0%, rgba(232, 121, 249, 0.20) 50%, rgba(251, 146, 60, 0.15) 100%);
}
.whimsy-star {
  display: inline-block;
  color: #e84393;
  font-size: 14px;
  margin-left: 6px;
  vertical-align: middle;
  line-height: 1;
}
</style>

<div class="kinds-legend" style="display:flex;flex-wrap:wrap;gap:16px;align-items:center;margin-bottom:8px;">
  <span><span style="display:inline-block;width:12px;height:12px;border-radius:3px;background:var(--ditto-gradient);vertical-align:middle;"></span> Ditto-created kind</span>
  <span><span style="color:#e84393;font-size:14px;vertical-align:middle;">✦</span> <a href="/philosophy#the-nostr-kind-cube">whimsy</a></span>
</div>

<table class="kinds-table">
  <thead>
    <tr>
      <th>Kind</th>
      <th>Name</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>0</td>
      <td>Profile Metadata</td>
      <td>User profile information: name, bio, avatar, and more (NIP-01)</td>
    </tr>
    <tr>
      <td>1</td>
      <td>Short Text Note</td>
      <td>The core post type on Nostr (NIP-01)</td>
    </tr>
    <tr>
      <td>3</td>
      <td>Follow List</td>
      <td>The user's list of followed pubkeys (NIP-02)</td>
    </tr>
    <tr>
      <td>5</td>
      <td>Deletion</td>
      <td>Delete a previously published event (NIP-09)</td>
    </tr>
    <tr>
      <td>17</td>
      <td>External Content Reaction</td>
      <td>Reaction on external content like URLs or ISBNs (NIP-73)</td>
    </tr>
    <tr>
      <td>20</td>
      <td>Photo</td>
      <td>Photo post displayed in the Photos feed (NIP-68)</td>
    </tr>
    <tr>
      <td>21</td>
      <td>Video</td>
      <td>Video post displayed in the Videos feed (NIP-71)</td>
    </tr>
    <tr>
      <td>22</td>
      <td>Short Video</td>
      <td>Short-form vertical video, Reels/TikTok-style (NIP-71)</td>
    </tr>
    <tr>
      <td>62</td>
      <td>Request to Vanish</td>
      <td>Request identity deletion from relays (NIP-62)</td>
    </tr>
    <tr>
      <td>1018</td>
      <td>Poll Vote</td>
      <td>Cast a vote on a kind 1068 poll</td>
    </tr>
    <tr>
      <td>1063</td>
      <td>File Metadata</td>
      <td>File metadata for uploads, including Webxdc apps (NIP-94)</td>
    </tr>
    <tr>
      <td>1068</td>
      <td>Poll</td>
      <td>Community poll with multiple-choice options</td>
    </tr>
    <tr>
      <td>1111</td>
      <td>Comment</td>
      <td>Threaded comment on posts and external content (NIP-22)</td>
    </tr>
    <tr>
      <td>1222</td>
      <td>Voice Message</td>
      <td>Root voice message post</td>
    </tr>
    <tr>
      <td>1244</td>
      <td>Voice Message Reply</td>
      <td>Voice message reply to a kind 1 note</td>
    </tr>
    <tr>
      <td>1311</td>
      <td>Live Chat Message</td>
      <td>Chat message in a live stream (NIP-53)</td>
    </tr>
    <tr>
      <td>1617</td>
      <td>Patch</td>
      <td>Git patch for code review (NIP-34)</td>
    </tr>
    <tr>
      <td>1618</td>
      <td>Pull Request</td>
      <td>Git pull request (NIP-34)</td>
    </tr>
    <tr>
      <td>1984</td>
      <td>Report</td>
      <td>Flag content or users for moderation</td>
    </tr>
    <tr>
      <td>1985</td>
      <td><a href="#trends">Trending Labels</a></td>
      <td>Trending hashtags and posts published by the relay (NIP-32)</td>
    </tr>
    <tr>
      <td>3367</td>
      <td>Color Moment <span class="whimsy-star">✦</span></td>
      <td>Color palette post expressing a mood</td>
    </tr>
    <tr>
      <td>7516</td>
      <td>Found Log <span class="whimsy-star">✦</span></td>
      <td>Log entry recording a user finding a geocache</td>
    </tr>
    <tr>
      <td>9735</td>
      <td>Zap Receipt</td>
      <td>Lightning zap receipt for payments (NIP-57)</td>
    </tr>
    <tr>
      <td>10000</td>
      <td>Mute List</td>
      <td>Muted users, threads, and words (NIP-51)</td>
    </tr>
    <tr>
      <td>10001</td>
      <td>Pinned Notes</td>
      <td>Pinned posts displayed on user profiles (NIP-51)</td>
    </tr>
    <tr>
      <td>10002</td>
      <td>Relay List</td>
      <td>User's preferred relays for reading and writing (NIP-65)</td>
    </tr>
    <tr>
      <td>10003</td>
      <td>Bookmark List</td>
      <td>Bookmarked events (NIP-51)</td>
    </tr>
    <tr>
      <td>10015</td>
      <td>Interests</td>
      <td>User's followed hashtags and interests (NIP-51)</td>
    </tr>
    <tr>
      <td>10030</td>
      <td>Custom Emoji List</td>
      <td>User's preferred custom emoji packs (NIP-30)</td>
    </tr>
    <tr>
      <td>10063</td>
      <td>Blossom Server List</td>
      <td>User's Blossom file upload servers (BUD-03)</td>
    </tr>
    <tr>
      <td>10073</td>
      <td>Read Books</td>
      <td>Books the user has finished reading (Bookstr)</td>
    </tr>
    <tr>
      <td>10074</td>
      <td>Currently Reading</td>
      <td>Books the user is currently reading (Bookstr)</td>
    </tr>
    <tr>
      <td>10075</td>
      <td>To Be Read</td>
      <td>Books the user wants to read (Bookstr)</td>
    </tr>
    <tr class="ditto-kind">
      <td>16767</td>
      <td><a href="#ditto-profile-theme">Active Profile Theme</a></td>
      <td>The user's currently active profile theme</td>
    </tr>
    <tr class="ditto-kind">
      <td>16769</td>
      <td>Profile Tabs</td>
      <td>Custom profile tab configuration</td>
    </tr>
    <tr>
      <td>30000</td>
      <td>People List</td>
      <td>User-defined lists of people (NIP-51)</td>
    </tr>
    <tr>
      <td>30008</td>
      <td>Profile Badges</td>
      <td>Badges a user has accepted and displayed (NIP-58)</td>
    </tr>
    <tr>
      <td>30009</td>
      <td>Badge Definition</td>
      <td>Badge metadata and imagery (NIP-58)</td>
    </tr>
    <tr>
      <td>30023</td>
      <td>Article</td>
      <td>Long-form blog post with Markdown content (NIP-23)</td>
    </tr>
    <tr>
      <td>30030</td>
      <td>Emoji Pack</td>
      <td>Custom emoji pack definition (NIP-30)</td>
    </tr>
    <tr>
      <td>30054</td>
      <td>Podcast Episode</td>
      <td>Podcast episode displayed in the Podcasts feed</td>
    </tr>
    <tr>
      <td>30055</td>
      <td>Podcast Trailer</td>
      <td>Podcast trailer displayed in the Podcasts feed</td>
    </tr>
    <tr>
      <td>30063</td>
      <td>Software Release</td>
      <td>App release metadata from Zapstore (NIP-82)</td>
    </tr>
    <tr class="ditto-kind">
      <td>30078</td>
      <td><a href="#ditto-settings">App Settings</a></td>
      <td>Encrypted per-user Ditto settings (NIP-78)</td>
    </tr>
    <tr>
      <td>30311</td>
      <td>Stream</td>
      <td>Live streaming event (NIP-53)</td>
    </tr>
    <tr>
      <td>30315</td>
      <td>User Status</td>
      <td>User status displayed on profiles and posts (NIP-38)</td>
    </tr>
    <tr>
      <td>30382</td>
      <td>User Stats</td>
      <td>Follower and post counts from the relay stats pubkey (NIP-85)</td>
    </tr>
    <tr>
      <td>30383</td>
      <td><a href="#stats">Event Stats</a></td>
      <td>Engagement counts for events from the relay stats pubkey (NIP-85)</td>
    </tr>
    <tr>
      <td>30384</td>
      <td>Addressable Event Stats</td>
      <td>Engagement counts for addressable events (NIP-85)</td>
    </tr>
    <tr>
      <td>30617</td>
      <td>Git Repository</td>
      <td>Git repository or app submission (NIP-34)</td>
    </tr>
    <tr>
      <td>30817</td>
      <td>Custom NIP</td>
      <td>Custom NIP proposal on NostrHub</td>
    </tr>
    <tr>
      <td>31922</td>
      <td>Date Calendar Event</td>
      <td>Date-based calendar event (NIP-52)</td>
    </tr>
    <tr>
      <td>31923</td>
      <td>Time Calendar Event</td>
      <td>Time-based calendar event (NIP-52)</td>
    </tr>
    <tr>
      <td>31925</td>
      <td>Calendar RSVP</td>
      <td>RSVP response to a calendar event (NIP-52)</td>
    </tr>
    <tr>
      <td>31985</td>
      <td>Book Review</td>
      <td>Book review and rating (Bookstr)</td>
    </tr>
    <tr>
      <td>32267</td>
      <td>App</td>
      <td>Software application listing from Zapstore (NIP-82)</td>
    </tr>
    <tr>
      <td>34139</td>
      <td>Music Playlist</td>
      <td>Music playlist displayed in the Music feed</td>
    </tr>
    <tr>
      <td>34236</td>
      <td>Vine <span class="whimsy-star">✦</span></td>
      <td>Short-form video post</td>
    </tr>
    <tr>
      <td>34550</td>
      <td>Community Definition</td>
      <td>Community definition (NIP-72)</td>
    </tr>
    <tr class="ditto-kind">
      <td>36767</td>
      <td><a href="#ditto-theme">Theme Definition</a></td>
      <td>Shareable custom UI theme with colors, font, and background</td>
    </tr>
    <tr>
      <td>36787</td>
      <td>Music Track</td>
      <td>Music track displayed in the Music feed</td>
    </tr>
    <tr>
      <td>37381</td>
      <td>Magic Deck <span class="whimsy-star">✦</span></td>
      <td>Magic: The Gathering deck list</td>
    </tr>
    <tr>
      <td>37516</td>
      <td>Geocache <span class="whimsy-star">✦</span></td>
      <td>Geocache listing for real-world treasure hunting</td>
    </tr>
    <tr>
      <td>39089</td>
      <td>Follow Pack</td>
      <td>Curated follow recommendations (starter packs)</td>
    </tr>
  </tbody>
</table>

---

<div class="section-header-left">
  <span class="section-emoji">🔷</span>

## Avatar Shape

</div>

Kind 0 profile metadata ([NIP-24](https://github.com/nostr-protocol/nips/blob/master/24.md)) is extended with a `shape` property. The value is any emoji, which is used as a mask over the user's avatar to set its shape.

```json
{
  "kind": 0,
  "content": "{\"name\":\"alex\",\"picture\":\"https://example.com/avatar.jpg\",\"shape\":\"🔷\"}"
}
```

A [NIP proposal](https://github.com/nostr-protocol/nips/pull/2268) has been submitted to standardize this field.

---

<div class="section-header-left">
  <span class="section-emoji">🎨</span>

## Ditto Profile Theme

</div>

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

---

<div class="section-header-left">
  <span class="section-emoji">🖌️</span>

## Ditto Theme

</div>

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

<div class="section-header-left">
  <span class="section-emoji">⚙️</span>

## Ditto Settings

</div>

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
| `customTheme` | `ThemeConfig` | Custom theme configuration with 3 core colors, optional font and background (see [Theming](#ditto-theme)) |
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

<div class="section-header-left">
  <span class="section-emoji">🔍</span>

## Search

</div>

[Ditto's relay](https://gitlab.com/soapbox-pub/ditto-relay) supports full-text search through [NIP-50](https://github.com/nostr-protocol/nips/blob/master/50.md) with search extensions. The public relay is available at `wss://relay.ditto.pub`.

### Search extensions

<div class="kinds-legend" style="display:flex;flex-wrap:wrap;gap:16px;align-items:center;margin-bottom:8px;">
  <span><span style="display:inline-block;width:12px;height:12px;border-radius:3px;background:var(--ditto-gradient);vertical-align:middle;"></span> Ditto-introduced extension</span>
</div>

<table class="kinds-table">
  <thead>
    <tr>
      <th>Extension</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>language:&lt;en/zh/ja/...&gt;</code></td>
      <td>Filter events by detected language (NIP-50)</td>
    </tr>
    <tr class="ditto-kind">
      <td><code>sentiment:&lt;positive/negative/neutral&gt;</code></td>
      <td>Filter events by detected sentiment</td>
    </tr>
    <tr class="ditto-kind">
      <td><code>protocol:&lt;activitypub/atproto/nostr&gt;</code></td>
      <td>Filter by originating protocol (NIP-48). <code>protocol:nostr</code> returns native Nostr events only.</td>
    </tr>
    <tr class="ditto-kind">
      <td><code>media:&lt;true/false&gt;</code></td>
      <td>Filter by presence of media attachments</td>
    </tr>
    <tr class="ditto-kind">
      <td><code>video:&lt;true/false&gt;</code></td>
      <td>Filter by presence of video content</td>
    </tr>
    <tr class="ditto-kind">
      <td><code>sort:top</code></td>
      <td>Sort by total engagement (unique engagers). Default when search text is present.</td>
    </tr>
    <tr class="ditto-kind">
      <td><code>sort:hot</code></td>
      <td>Sort by engagement weighted with time decay, surfacing what's trending now</td>
    </tr>
    <tr class="ditto-kind">
      <td><code>sort:controversial</code></td>
      <td>Sort by controversy score, favoring events with balanced comments and reactions</td>
    </tr>
    <tr class="ditto-kind">
      <td><code>sort:rising</code></td>
      <td>Sort by engagement velocity relative to age</td>
    </tr>
    <tr class="ditto-kind">
      <td><code>sort:zaps</code></td>
      <td>Sort by total zap amount</td>
    </tr>
    <tr class="ditto-kind">
      <td><code>sort:new</code></td>
      <td>Sort chronologically (prevents the default <code>sort:top</code> behavior)</td>
    </tr>
    <tr class="ditto-kind">
      <td><code>distinct:author</code></td>
      <td>Deduplicate results to one event per author</td>
    </tr>
    <tr class="ditto-kind">
      <td><code>-&lt;term&gt;</code></td>
      <td>Exclude events matching the given term</td>
    </tr>
  </tbody>
</table>

Extensions can be combined with each other and with free-text search terms. For example, `"search": "bitcoin sort:hot language:en"` returns trending English-language posts matching "bitcoin".

```json
{
  "kinds": [1],
  "search": "bitcoin sort:hot language:en",
  "limit": 20
}
```

---

<div class="section-header-left">
  <span class="section-emoji">📊</span>

## Stats

</div>

Ditto's relay publishes engagement stats for events using [NIP-85](https://github.com/nostr-protocol/nips/pull/1534) ([kind 30383](https://nostrbook.dev/kinds/30383)). These are addressable events authored by the relay's stats pubkey, with the `d` tag set to the target event's ID.

The stats pubkey for `wss://relay.ditto.pub` is:

```
5f68e85ee174102ca8978eef302129f081f03456c884185d5ec1c1224ab633ea
```

### Event structure

```json
{
  "kind": 30383,
  "pubkey": "5f68e85ee174102ca8978eef302129f081f03456c884185d5ec1c1224ab633ea",
  "content": "",
  "tags": [
    ["d", "<target-event-id>"],
    ["k", "1"],
    ["p", "<target-event-pubkey>"],
    ["comment_cnt", "42"],
    ["repost_cnt", "7"],
    ["reaction_cnt", "128"],
    ["zap_cnt", "15"]
  ]
}
```

### Tags

| Tag | Description |
|-----|-------------|
| `d` | ID of the event being described |
| `k` | Kind of the referenced event |
| `p` | Pubkey of the referenced event's author |
| `comment_cnt` | Number of replies/comments |
| `repost_cnt` | Number of reposts |
| `reaction_cnt` | Number of reactions |
| `zap_cnt` | Number of zaps |

### Filter example

```json
{
  "kinds": [30383],
  "authors": ["5f68e85ee174102ca8978eef302129f081f03456c884185d5ec1c1224ab633ea"],
  "#d": ["<target-event-id>"],
  "limit": 1
}
```

Clients can batch multiple event IDs into a single request by passing an array of IDs in `#d`.

---

<div class="section-header-left">
  <span class="section-emoji">🔥</span>

## Trends

</div>

Ditto publishes trending data as [NIP-32](https://github.com/nostr-protocol/nips/blob/master/32.md) label events under the `pub.ditto.trends` namespace. A trusted relay pubkey publishes these periodically.

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
