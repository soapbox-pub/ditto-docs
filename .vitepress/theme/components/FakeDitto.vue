<template>
  <div class="fake-ditto" :class="{ 'fake-ditto--mobile-sidebar': mobileView === 'sidebar' }">
    <!-- Desktop: two-column layout. Mobile: toggle between sidebar/feed -->

    <!-- Sidebar -->
    <aside class="fd-sidebar" :class="{ 'fd-sidebar--visible': mobileView === 'sidebar' }">
      <!-- User header -->
      <div class="fd-user">
        <div class="fd-avatar fd-avatar--sm">MK</div>
        <div class="fd-user-info">
          <span class="fd-user-name">MK Fain</span>
          <span class="fd-user-handle">@mk@ditto.pub</span>
        </div>
      </div>

      <!-- Pinned items -->
      <nav class="fd-nav">
        <div
          v-for="item in pinnedItems"
          :key="item.id"
          class="fd-nav-item"
          :class="{
            'fd-nav-item--active': activeId === item.id,
            'fd-nav-item--dragging': dragId === item.id,
          }"
          :draggable="editMode"
          @click="selectItem(item.id)"
          @dragstart="onDragStart($event, item.id)"
          @dragover.prevent="onDragOver($event, item.id)"
          @dragend="onDragEnd"
        >
          <span v-if="editMode" class="fd-drag-handle">&#x2630;</span>
          <span class="fd-nav-icon">{{ item.icon }}</span>
          <span class="fd-nav-label" :class="{ 'fd-nav-label--primary': activeId === item.id }">{{ item.label }}</span>
          <label v-if="editMode && !item.fixed" class="fd-toggle" @click.stop>
            <input type="checkbox" v-model="item.visible" />
            <span class="fd-toggle-slider"></span>
          </label>
        </div>

        <!-- More button -->
        <div class="fd-nav-item fd-nav-more" @click="moreOpen = !moreOpen">
          <span class="fd-nav-icon">{{ moreOpen ? '&#x2212;' : '+' }}</span>
          <span class="fd-nav-label fd-nav-label--muted">{{ moreOpen ? 'Less' : 'More...' }}</span>
        </div>

        <!-- Expandable items -->
        <div class="fd-nav-expand" :class="{ 'fd-nav-expand--open': moreOpen }">
          <div
            v-for="item in extraItems"
            :key="item.id"
            class="fd-nav-item"
            :class="{
              'fd-nav-item--active': activeId === item.id,
              'fd-nav-item--dragging': dragId === item.id,
              'fd-nav-item--hidden': !item.visible && !editMode,
            }"
            :draggable="editMode"
            @click="selectItem(item.id)"
            @dragstart="onDragStart($event, item.id)"
            @dragover.prevent="onDragOver($event, item.id)"
            @dragend="onDragEnd"
          >
            <span v-if="editMode" class="fd-drag-handle">&#x2630;</span>
            <span class="fd-nav-icon">{{ item.icon }}</span>
            <span class="fd-nav-label" :class="{ 'fd-nav-label--primary': activeId === item.id }">{{ item.label }}</span>
            <span v-if="!editMode" class="fd-nav-add" @click.stop="item.visible = !item.visible">{{ item.visible ? '&#x2212;' : '+' }}</span>
            <label v-if="editMode" class="fd-toggle" @click.stop>
              <input type="checkbox" v-model="item.visible" />
              <span class="fd-toggle-slider"></span>
            </label>
          </div>
        </div>
      </nav>

      <!-- Edit sidebar button -->
      <div class="fd-nav-bottom">
        <div class="fd-nav-item fd-nav-edit" @click="editMode = !editMode">
          <span class="fd-nav-icon">&#x270E;</span>
          <span class="fd-nav-label">{{ editMode ? 'Done editing' : 'Edit sidebar' }}</span>
        </div>
      </div>
    </aside>

    <!-- Feed panel -->
    <main class="fd-feed" :class="{ 'fd-feed--visible': mobileView === 'feed' }">
      <!-- Mobile back button -->
      <button class="fd-mobile-back" @click="mobileView = 'sidebar'">
        &#x2190; Menu
      </button>

      <!-- Feed header -->
      <div class="fd-feed-header">
        <span class="fd-feed-title">{{ activeFeedLabel }}</span>
      </div>

      <!-- Feed content -->
      <div class="fd-feed-content">
        <!-- Post feed -->
        <template v-if="activeId === 'feed'">
          <div class="fd-post" v-for="(post, i) in feedData.feed" :key="i">
            <div class="fd-post-header">
              <div class="fd-avatar fd-avatar--post" :style="{ background: post.color }">{{ post.initials }}</div>
              <div>
                <span class="fd-post-name">{{ post.name }}</span>
                <span class="fd-post-handle">{{ post.handle }} &middot; {{ post.time }}</span>
              </div>
            </div>
            <p class="fd-post-body">{{ post.body }}</p>
            <div v-if="post.image" class="fd-post-image">
              <div class="fd-image-placeholder">{{ post.imageLabel || 'Image' }}</div>
            </div>
            <div class="fd-post-actions">
              <span>&#x1F4AC; {{ post.replies }}</span>
              <span>&#x1F501; {{ post.reposts }}</span>
              <span>&#x2764;&#xFE0F; {{ post.likes }}</span>
              <span>&#x26A1; {{ post.zaps }}</span>
            </div>
          </div>
        </template>

        <!-- Notifications -->
        <template v-else-if="activeId === 'notifications'">
          <div class="fd-notif" v-for="(n, i) in feedData.notifications" :key="i">
            <span class="fd-notif-icon">{{ n.icon }}</span>
            <div class="fd-notif-body">
              <span class="fd-notif-actor">{{ n.actor }}</span> {{ n.action }}
              <span class="fd-notif-time">{{ n.time }}</span>
            </div>
          </div>
        </template>

        <!-- Search -->
        <template v-else-if="activeId === 'search'">
          <div class="fd-search-bar">
            <span class="fd-search-icon">&#x1F50D;</span>
            <span class="fd-search-placeholder">Search Ditto...</span>
          </div>
          <div class="fd-search-section">
            <h4 class="fd-section-title">Trending</h4>
            <div class="fd-tag" v-for="(tag, i) in feedData.search.trending" :key="i">#{{ tag }}</div>
          </div>
          <div class="fd-search-section">
            <h4 class="fd-section-title">People</h4>
            <div class="fd-search-person" v-for="(p, i) in feedData.search.people" :key="i">
              <div class="fd-avatar fd-avatar--sm" :style="{ background: p.color }">{{ p.initials }}</div>
              <div>
                <div class="fd-post-name">{{ p.name }}</div>
                <div class="fd-post-handle">{{ p.handle }}</div>
              </div>
            </div>
          </div>
        </template>

        <!-- Bookmarks -->
        <template v-else-if="activeId === 'bookmarks'">
          <div class="fd-post" v-for="(post, i) in feedData.bookmarks" :key="i">
            <div class="fd-post-header">
              <div class="fd-avatar fd-avatar--post" :style="{ background: post.color }">{{ post.initials }}</div>
              <div>
                <span class="fd-post-name">{{ post.name }}</span>
                <span class="fd-post-handle">{{ post.handle }} &middot; {{ post.time }}</span>
              </div>
            </div>
            <p class="fd-post-body">{{ post.body }}</p>
            <div class="fd-post-actions">
              <span>&#x1F4AC; {{ post.replies }}</span>
              <span>&#x1F501; {{ post.reposts }}</span>
              <span>&#x2764;&#xFE0F; {{ post.likes }}</span>
              <span>&#x26A1; {{ post.zaps }}</span>
            </div>
          </div>
        </template>

        <!-- Profile -->
        <template v-else-if="activeId === 'profile'">
          <div class="fd-profile">
            <div class="fd-profile-banner"></div>
            <div class="fd-profile-info">
              <div class="fd-avatar fd-avatar--lg">MK</div>
              <h3 class="fd-profile-name">MK Fain</h3>
              <p class="fd-profile-handle">@mk@ditto.pub</p>
              <p class="fd-profile-bio">Building the fun social internet. Nostr enthusiast, open source advocate.</p>
              <div class="fd-profile-stats">
                <span><strong>842</strong> following</span>
                <span><strong>1.2k</strong> followers</span>
                <span><strong>3.4k</strong> posts</span>
              </div>
            </div>
          </div>
        </template>

        <!-- Vibe -->
        <template v-else-if="activeId === 'vibe'">
          <div class="fd-vibe-header">
            <span class="fd-vibe-emoji">&#x1F30A;</span>
            <span>Your vibe today</span>
          </div>
          <div class="fd-post" v-for="(post, i) in feedData.vibe" :key="i">
            <div class="fd-post-header">
              <div class="fd-avatar fd-avatar--post" :style="{ background: post.color }">{{ post.initials }}</div>
              <div>
                <span class="fd-post-name">{{ post.name }}</span>
                <span class="fd-post-handle">{{ post.handle }} &middot; {{ post.time }}</span>
              </div>
            </div>
            <p class="fd-post-body">{{ post.body }}</p>
            <div class="fd-post-actions">
              <span>&#x2764;&#xFE0F; {{ post.likes }}</span>
              <span>&#x26A1; {{ post.zaps }}</span>
            </div>
          </div>
        </template>

        <!-- Settings -->
        <template v-else-if="activeId === 'settings'">
          <div class="fd-settings-group" v-for="(group, i) in feedData.settings" :key="i">
            <h4 class="fd-section-title">{{ group.title }}</h4>
            <div class="fd-settings-item" v-for="(item, j) in group.items" :key="j">
              <span>{{ item.label }}</span>
              <span class="fd-settings-value">{{ item.value }}</span>
            </div>
          </div>
        </template>

        <!-- Trends -->
        <template v-else-if="activeId === 'trends'">
          <div class="fd-trend" v-for="(t, i) in feedData.trends" :key="i">
            <div class="fd-trend-rank">#{{ i + 1 }}</div>
            <div>
              <div class="fd-trend-tag">#{{ t.tag }}</div>
              <div class="fd-trend-count">{{ t.posts }} posts</div>
            </div>
          </div>
        </template>

        <!-- Articles -->
        <template v-else-if="activeId === 'articles'">
          <div class="fd-article" v-for="(a, i) in feedData.articles" :key="i">
            <h4 class="fd-article-title">{{ a.title }}</h4>
            <div class="fd-article-meta">
              <span class="fd-post-name">{{ a.author }}</span>
              <span class="fd-post-handle">&middot; {{ a.readTime }} read</span>
            </div>
            <p class="fd-article-excerpt">{{ a.excerpt }}</p>
          </div>
        </template>

        <!-- Vines (short videos) -->
        <template v-else-if="activeId === 'vines'">
          <div class="fd-video-grid">
            <div class="fd-video-card" v-for="(v, i) in feedData.vines" :key="i">
              <div class="fd-video-thumb">
                <span class="fd-play-btn">&#x25B6;</span>
                <span class="fd-video-duration">{{ v.duration }}</span>
              </div>
              <div class="fd-video-info">
                <span class="fd-post-name">{{ v.creator }}</span>
                <span class="fd-post-handle">{{ v.views }} views</span>
              </div>
            </div>
          </div>
        </template>

        <!-- Streams -->
        <template v-else-if="activeId === 'streams'">
          <div class="fd-stream" v-for="(s, i) in feedData.streams" :key="i">
            <div class="fd-stream-thumb">
              <span class="fd-live-badge">LIVE</span>
              <span class="fd-stream-viewers">&#x1F441; {{ s.viewers }}</span>
            </div>
            <div class="fd-stream-info">
              <span class="fd-post-name">{{ s.streamer }}</span>
              <span class="fd-post-handle">{{ s.title }}</span>
            </div>
          </div>
        </template>

        <!-- Webxdc -->
        <template v-else-if="activeId === 'webxdc'">
          <div class="fd-app-grid">
            <div class="fd-app-card" v-for="(app, i) in feedData.webxdc" :key="i">
              <div class="fd-app-icon">{{ app.icon }}</div>
              <span class="fd-app-name">{{ app.name }}</span>
              <span class="fd-post-handle">{{ app.desc }}</span>
            </div>
          </div>
        </template>

        <!-- Themes -->
        <template v-else-if="activeId === 'themes'">
          <div class="fd-theme-grid">
            <div class="fd-theme-card" v-for="(t, i) in feedData.themes" :key="i">
              <div class="fd-theme-preview" :style="{ background: t.bg }">
                <span class="fd-theme-accent" :style="{ background: t.accent }"></span>
              </div>
              <span class="fd-app-name">{{ t.name }}</span>
              <span class="fd-post-handle">by {{ t.author }}</span>
            </div>
          </div>
        </template>

        <!-- Polls -->
        <template v-else-if="activeId === 'polls'">
          <div class="fd-poll" v-for="(poll, i) in feedData.polls" :key="i">
            <div class="fd-post-header">
              <div class="fd-avatar fd-avatar--post" :style="{ background: poll.color }">{{ poll.initials }}</div>
              <div>
                <span class="fd-post-name">{{ poll.author }}</span>
                <span class="fd-post-handle">{{ poll.handle }} &middot; {{ poll.time }}</span>
              </div>
            </div>
            <p class="fd-post-body">{{ poll.question }}</p>
            <div class="fd-poll-options">
              <div class="fd-poll-option" v-for="(opt, j) in poll.options" :key="j">
                <div class="fd-poll-bar" :style="{ width: opt.pct + '%' }"></div>
                <span class="fd-poll-label">{{ opt.label }}</span>
                <span class="fd-poll-pct">{{ opt.pct }}%</span>
              </div>
            </div>
            <span class="fd-poll-total">{{ poll.totalVotes }} votes</span>
          </div>
        </template>

        <!-- Follow Packs -->
        <template v-else-if="activeId === 'followpacks'">
          <div class="fd-followpack" v-for="(pack, i) in feedData.followpacks" :key="i">
            <h4 class="fd-followpack-title">{{ pack.name }}</h4>
            <p class="fd-post-handle">{{ pack.desc }}</p>
            <div class="fd-followpack-avatars">
              <div class="fd-avatar fd-avatar--sm" v-for="(m, j) in pack.members" :key="j" :style="{ background: m.color }">{{ m.initials }}</div>
              <span class="fd-followpack-count">+{{ pack.more }}</span>
            </div>
          </div>
        </template>

        <!-- Color Moments -->
        <template v-else-if="activeId === 'colors'">
          <div class="fd-color-grid">
            <div class="fd-color-card" v-for="(c, i) in feedData.colors" :key="i">
              <div class="fd-color-palette">
                <span v-for="(swatch, j) in c.swatches" :key="j" class="fd-color-swatch" :style="{ background: swatch }"></span>
              </div>
              <span class="fd-app-name">{{ c.name }}</span>
              <span class="fd-post-handle">by {{ c.author }}</span>
            </div>
          </div>
        </template>

        <!-- Magic Decks -->
        <template v-else-if="activeId === 'magic'">
          <div class="fd-deck" v-for="(deck, i) in feedData.magic" :key="i">
            <div class="fd-deck-cards">
              <div class="fd-magic-card" v-for="(card, j) in deck.cards" :key="j" :style="{ background: card.color }">
                <span class="fd-magic-cost">{{ card.cost }}</span>
                <span class="fd-magic-name">{{ card.name }}</span>
              </div>
            </div>
            <div class="fd-deck-info">
              <span class="fd-post-name">{{ deck.name }}</span>
              <span class="fd-post-handle">by {{ deck.author }} &middot; {{ deck.cardCount }} cards</span>
            </div>
          </div>
        </template>

        <!-- Treasures -->
        <template v-else-if="activeId === 'treasures'">
          <div class="fd-treasure" v-for="(t, i) in feedData.treasures" :key="i">
            <div class="fd-treasure-icon">{{ t.icon }}</div>
            <div class="fd-treasure-info">
              <span class="fd-post-name">{{ t.name }}</span>
              <span class="fd-post-handle">{{ t.location }}</span>
              <span class="fd-treasure-status" :class="'fd-treasure--' + t.status">{{ t.statusLabel }}</span>
            </div>
          </div>
        </template>
      </div>
    </main>

    <!-- Mobile bottom tab bar -->
    <div class="fd-mobile-tabs">
      <button
        class="fd-mobile-tab"
        :class="{ 'fd-mobile-tab--active': mobileView === 'sidebar' }"
        @click="mobileView = 'sidebar'"
      >&#x2630; Menu</button>
      <button
        class="fd-mobile-tab"
        :class="{ 'fd-mobile-tab--active': mobileView === 'feed' }"
        @click="mobileView = 'feed'"
      >&#x1F4F0; Feed</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue';

// ── Sidebar item type ──
interface SidebarItem {
  id: string;
  icon: string;
  label: string;
  pinned: boolean;
  visible: boolean;
  fixed?: boolean; // can't be toggled off
  order: number;
}

// ── State ──
const activeId = ref('feed');
const moreOpen = ref(false);
const editMode = ref(false);
const mobileView = ref<'sidebar' | 'feed'>('sidebar');
const dragId = ref<string | null>(null);
const dragOverId = ref<string | null>(null);

const sidebarItems = reactive<SidebarItem[]>([
  { id: 'feed',          icon: '\u{1F525}', label: 'Feed',          pinned: true,  visible: true, fixed: true, order: 0 },
  { id: 'notifications', icon: '\u{1F514}', label: 'Notifications', pinned: true,  visible: true, fixed: true, order: 1 },
  { id: 'search',        icon: '\u{1F50D}', label: 'Search',        pinned: true,  visible: true, fixed: true, order: 2 },
  { id: 'bookmarks',     icon: '\u{1F516}', label: 'Bookmarks',     pinned: true,  visible: true, order: 3 },
  { id: 'profile',       icon: '\u{1F464}', label: 'Profile',       pinned: true,  visible: true, order: 4 },
  { id: 'vibe',          icon: '\u{1F30A}', label: 'Vibe',          pinned: true,  visible: true, order: 5 },
  { id: 'settings',      icon: '\u{2699}\u{FE0F}', label: 'Settings', pinned: true, visible: true, order: 6 },
  { id: 'trends',        icon: '\u{1F4C8}', label: 'Trends',        pinned: false, visible: true, order: 7 },
  { id: 'articles',      icon: '\u{1F4DD}', label: 'Articles',      pinned: false, visible: true, order: 8 },
  { id: 'vines',         icon: '\u{1F3AC}', label: 'Vines',         pinned: false, visible: true, order: 9 },
  { id: 'streams',       icon: '\u{1F4E1}', label: 'Streams',       pinned: false, visible: true, order: 10 },
  { id: 'webxdc',        icon: '\u{1F3AE}', label: 'Webxdc',        pinned: false, visible: true, order: 11 },
  { id: 'themes',        icon: '\u{1F3A8}', label: 'Themes',        pinned: false, visible: true, order: 12 },
  { id: 'polls',         icon: '\u{1F4CA}', label: 'Polls',         pinned: false, visible: true, order: 13 },
  { id: 'followpacks',   icon: '\u{1F465}', label: 'Follow Packs',  pinned: false, visible: true, order: 14 },
  { id: 'colors',        icon: '\u{1F308}', label: 'Color Moments', pinned: false, visible: true, order: 15 },
  { id: 'magic',         icon: '\u{1F0CF}', label: 'Magic Decks',   pinned: false, visible: true, order: 16 },
  { id: 'treasures',     icon: '\u{1F4E6}', label: 'Treasures',     pinned: false, visible: true, order: 17 },
]);

const pinnedItems = computed(() =>
  sidebarItems.filter(i => i.pinned).sort((a, b) => a.order - b.order)
);

const extraItems = computed(() =>
  sidebarItems.filter(i => !i.pinned).sort((a, b) => a.order - b.order)
);

const activeFeedLabel = computed(() => {
  const item = sidebarItems.find(i => i.id === activeId.value);
  return item?.label || 'Feed';
});

function selectItem(id: string) {
  if (editMode.value) return;
  activeId.value = id;
  mobileView.value = 'feed';
}

// ── Drag and drop ──
function onDragStart(e: DragEvent, id: string) {
  if (!editMode.value) return;
  dragId.value = id;
  if (e.dataTransfer) {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', id);
  }
}

function onDragOver(e: DragEvent, overId: string) {
  if (!editMode.value || !dragId.value || dragId.value === overId) return;
  dragOverId.value = overId;

  const dragItem = sidebarItems.find(i => i.id === dragId.value);
  const overItem = sidebarItems.find(i => i.id === overId);
  if (!dragItem || !overItem) return;

  // Only reorder within the same group (pinned or extra)
  if (dragItem.pinned !== overItem.pinned) return;

  const tempOrder = dragItem.order;
  dragItem.order = overItem.order;
  overItem.order = tempOrder;
}

function onDragEnd() {
  dragId.value = null;
  dragOverId.value = null;
}

// ── Mock feed data ──
const feedData = {
  feed: [
    {
      name: 'Nostr News', handle: '@nostrnews', time: '1m', initials: 'NN', color: '#6366f1',
      body: 'Breaking: Ditto just dropped a massive update with custom themes, sidebars, and more. The Nostr ecosystem keeps growing!',
      image: true, imageLabel: 'Screenshot',
      replies: 12, reposts: 34, likes: 89, zaps: '2.1k',
    },
    {
      name: 'Connie', handle: '@Connie@primal.net', time: '3m', initials: 'C', color: '#ec4899',
      body: 'Just tried the new vibe feed in Ditto and it\'s actually really good at surfacing interesting content.',
      image: false, imageLabel: '',
      replies: 3, reposts: 8, likes: 42, zaps: '500',
    },
    {
      name: 'Gustavo', handle: '@limachaves@iris.to', time: '5m', initials: 'G', color: '#22c55e',
      body: 'The ability to customize your sidebar and choose exactly what feeds you want to see is a game changer. No algorithm deciding for you.',
      image: false, imageLabel: '',
      replies: 7, reposts: 15, likes: 63, zaps: '1.5k',
    },
    {
      name: 'Alice', handle: '@alice@nostr.social', time: '12m', initials: 'A', color: '#f59e0b',
      body: 'Posted my first long-form article on Ditto today. So nice to have a real writing experience built into a social app.',
      image: true, imageLabel: 'Blog post preview',
      replies: 5, reposts: 11, likes: 28, zaps: '800',
    },
  ],

  notifications: [
    { icon: '\u{26A1}', actor: 'Fiatjaf', action: 'zapped your post 1,000 sats', time: '2m ago' },
    { icon: '\u{2764}\u{FE0F}', actor: 'Connie', action: 'liked your post', time: '5m ago' },
    { icon: '\u{1F501}', actor: 'ODELL', action: 'reposted your article', time: '8m ago' },
    { icon: '\u{1F464}', actor: 'Vitor Pamplona', action: 'started following you', time: '15m ago' },
    { icon: '\u{1F4AC}', actor: 'Alice', action: 'replied to your post', time: '20m ago' },
    { icon: '\u{26A1}', actor: 'Ben Arc', action: 'zapped your post 2,100 sats', time: '1h ago' },
    { icon: '\u{1F3F7}\u{FE0F}', actor: 'Derek Ross', action: 'mentioned you in a post', time: '2h ago' },
  ],

  search: {
    trending: ['nostr', 'bitcoin', 'ditto', 'zaps', 'freedom', 'decentralize', 'opensource'],
    people: [
      { name: 'Fiatjaf', handle: '@fiatjaf', initials: 'F', color: '#8b5cf6' },
      { name: 'Jack Dorsey', handle: '@jack', initials: 'JD', color: '#3b82f6' },
      { name: 'ODELL', handle: '@ODELL', initials: 'O', color: '#ef4444' },
    ],
  },

  bookmarks: [
    {
      name: 'Edward Snowden', handle: '@snowden', time: '2d', initials: 'ES', color: '#64748b',
      body: 'The tools we build today determine the freedoms we have tomorrow. Choose wisely.',
      replies: 142, reposts: 891, likes: 4200, zaps: '50k',
    },
    {
      name: 'Fiatjaf', handle: '@fiatjaf', time: '1w', initials: 'F', color: '#8b5cf6',
      body: 'Nostr is not a social network. Nostr is a protocol. The social network is what you build on top of it.',
      replies: 67, reposts: 234, likes: 1100, zaps: '12k',
    },
  ],

  vibe: [
    {
      name: 'Mia', handle: '@mia@snort.social', time: '10m', initials: 'M', color: '#f472b6',
      body: 'Morning coffee and scrolling through Ditto. The vibes are immaculate today.',
      likes: 23, zaps: '200',
    },
    {
      name: 'River', handle: '@river@nostr.band', time: '25m', initials: 'R', color: '#06b6d4',
      body: 'Just discovered the color moments feed. People are sharing the most beautiful palettes.',
      likes: 45, zaps: '600',
    },
    {
      name: 'Sam', handle: '@sam@ditto.pub', time: '1h', initials: 'S', color: '#a78bfa',
      body: 'The fact that I can play games, read articles, watch streams, AND shitpost all in one app is wild.',
      likes: 67, zaps: '1.2k',
    },
  ],

  settings: [
    {
      title: 'Account',
      items: [
        { label: 'Display name', value: 'MK Fain' },
        { label: 'NIP-05', value: 'mk@ditto.pub' },
        { label: 'Lightning address', value: 'mk@getalby.com' },
      ],
    },
    {
      title: 'Appearance',
      items: [
        { label: 'Theme', value: 'Bubblegum' },
        { label: 'Language', value: 'English' },
        { label: 'Font size', value: 'Medium' },
      ],
    },
    {
      title: 'Privacy',
      items: [
        { label: 'Default post visibility', value: 'Public' },
        { label: 'Show reactions', value: 'On' },
      ],
    },
  ],

  trends: [
    { tag: 'nostr', posts: '2.4k' },
    { tag: 'bitcoin', posts: '1.8k' },
    { tag: 'ditto', posts: '956' },
    { tag: 'zaps', posts: '743' },
    { tag: 'freedom', posts: '612' },
    { tag: 'selfhosting', posts: '489' },
    { tag: 'opensource', posts: '401' },
    { tag: 'decentralize', posts: '387' },
  ],

  articles: [
    {
      title: 'Why Nostr Will Win',
      author: 'Fiatjaf', readTime: '8 min',
      excerpt: 'The internet is broken. Social media is controlled by a handful of companies who profit from outrage. Nostr fixes this by giving users control over their own data and identity...',
    },
    {
      title: 'Self-Hosting Your Social Media in 2026',
      author: 'MK Fain', readTime: '5 min',
      excerpt: 'You don\'t need a data center to run your own social platform. With Ditto, a $5 VPS is all it takes. Here\'s how to get started...',
    },
    {
      title: 'The Case for Digital Freedom',
      author: 'Alice', readTime: '12 min',
      excerpt: 'We spend more time online than ever before, yet we have less control over our digital lives than ever. It\'s time to change that...',
    },
  ],

  vines: [
    { creator: 'Nico', duration: '0:32', views: '12k' },
    { creator: 'Luna', duration: '1:05', views: '8.4k' },
    { creator: 'Zack', duration: '0:15', views: '24k' },
    { creator: 'Priya', duration: '0:47', views: '6.2k' },
    { creator: 'Max', duration: '2:10', views: '3.1k' },
    { creator: 'Sophia', duration: '0:22', views: '18k' },
  ],

  streams: [
    { streamer: 'ODELL', title: 'Citadel Dispatch #142', viewers: '1.2k' },
    { streamer: 'Ben Arc', title: 'Building on Nostr - Live Coding', viewers: '340' },
    { streamer: 'Marce', title: 'Music & Vibes', viewers: '89' },
  ],

  webxdc: [
    { icon: '\u{1F47E}', name: 'Space Invaders', desc: 'Classic arcade game' },
    { icon: '\u{265F}\u{FE0F}', name: 'Chess', desc: 'Play with friends' },
    { icon: '\u{1F4DD}', name: 'Collaborative Notepad', desc: 'Write together' },
    { icon: '\u{1F3B2}', name: 'Dice Roller', desc: 'Tabletop companion' },
    { icon: '\u{2705}', name: 'Todo List', desc: 'Shared tasks' },
    { icon: '\u{1F30D}', name: 'GeoChat', desc: 'Location-based chat' },
  ],

  themes: [
    { name: 'Kawaii', author: 'Ditto', bg: '#fce4ec', accent: '#ff69b4' },
    { name: 'Grunge', author: 'Ditto', bg: '#1a1a1a', accent: '#ff4444' },
    { name: 'Gamer', author: 'Ditto', bg: '#0a0a2e', accent: '#00ff88' },
    { name: 'Bubblegum', author: 'Ditto', bg: '#fff', accent: '#a600ff' },
    { name: 'Retro Pop', author: 'Ditto', bg: '#ffe066', accent: '#9040a0' },
    { name: 'Midnight', author: 'Community', bg: '#0f172a', accent: '#818cf8' },
  ],

  polls: [
    {
      author: 'Derek Ross', handle: '@derek', time: '4h', initials: 'DR', color: '#f97316',
      question: 'What\'s your favorite Ditto feature?',
      options: [
        { label: 'Custom themes', pct: 38 },
        { label: 'Zaps', pct: 29 },
        { label: 'Sidebar feeds', pct: 22 },
        { label: 'Self-hosting', pct: 11 },
      ],
      totalVotes: 847,
    },
    {
      author: 'Mia', handle: '@mia', time: '1d', initials: 'M', color: '#f472b6',
      question: 'Best Nostr client for beginners?',
      options: [
        { label: 'Ditto', pct: 45 },
        { label: 'Primal', pct: 28 },
        { label: 'Amethyst', pct: 18 },
        { label: 'Other', pct: 9 },
      ],
      totalVotes: 1203,
    },
  ],

  followpacks: [
    {
      name: 'Nostr Developers',
      desc: 'The people building the protocol',
      members: [
        { initials: 'F', color: '#8b5cf6' },
        { initials: 'JB', color: '#3b82f6' },
        { initials: 'VP', color: '#22c55e' },
        { initials: 'W', color: '#f59e0b' },
      ],
      more: 42,
    },
    {
      name: 'Bitcoin Plebs',
      desc: 'Orange pill your timeline',
      members: [
        { initials: 'O', color: '#ef4444' },
        { initials: 'M', color: '#f97316' },
        { initials: 'G', color: '#eab308' },
      ],
      more: 156,
    },
    {
      name: 'Artists & Creators',
      desc: 'Visual artists, musicians, and makers',
      members: [
        { initials: 'L', color: '#ec4899' },
        { initials: 'R', color: '#06b6d4' },
        { initials: 'A', color: '#a78bfa' },
        { initials: 'S', color: '#84cc16' },
      ],
      more: 78,
    },
  ],

  colors: [
    {
      name: 'Sunset Bliss',
      author: 'Luna',
      swatches: ['#ff6b6b', '#ffa36b', '#ffd93d', '#ff8e8e', '#ffb347'],
    },
    {
      name: 'Ocean Depths',
      author: 'River',
      swatches: ['#0a2463', '#3e92cc', '#2ec4b6', '#cbf3f0', '#1b4965'],
    },
    {
      name: 'Forest Walk',
      author: 'Sam',
      swatches: ['#2d5016', '#5a7d2f', '#8fbc55', '#c5e063', '#f0f7da'],
    },
    {
      name: 'Neon Dreams',
      author: 'Priya',
      swatches: ['#ff00ff', '#00ffff', '#ff0080', '#8000ff', '#00ff80'],
    },
  ],

  magic: [
    {
      name: 'Mono Red Aggro',
      author: 'Zack',
      cardCount: 60,
      cards: [
        { name: 'Lightning Bolt', cost: 'R', color: '#dc2626' },
        { name: 'Goblin Guide', cost: 'R', color: '#ef4444' },
        { name: 'Monastery Swiftspear', cost: 'R', color: '#b91c1c' },
      ],
    },
    {
      name: 'Blue Control',
      author: 'Alice',
      cardCount: 60,
      cards: [
        { name: 'Counterspell', cost: 'UU', color: '#2563eb' },
        { name: 'Snapcaster Mage', cost: '1U', color: '#3b82f6' },
        { name: 'Cryptic Command', cost: '1UUU', color: '#1d4ed8' },
      ],
    },
  ],

  treasures: [
    { icon: '\u{1F4E6}', name: 'Satoshi\'s Cache', location: 'Tokyo, Japan', status: 'found', statusLabel: 'Found' },
    { icon: '\u{1F5FA}\u{FE0F}', name: 'Lightning Ridge', location: 'Austin, TX', status: 'active', statusLabel: 'Active' },
    { icon: '\u{1F3F4}\u{200D}\u{2620}\u{FE0F}', name: 'Pirate\'s Bounty', location: 'Lisbon, Portugal', status: 'active', statusLabel: 'Active' },
    { icon: '\u{26F0}\u{FE0F}', name: 'Mountain Stash', location: 'Madeira', status: 'found', statusLabel: 'Found' },
    { icon: '\u{1F332}', name: 'Forest Node', location: 'Black Forest, Germany', status: 'active', statusLabel: 'Active' },
  ],
};
</script>
