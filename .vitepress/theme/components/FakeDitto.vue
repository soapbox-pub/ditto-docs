<template>
  <div class="fake-ditto" :class="{ 'fake-ditto--mobile-sidebar': mobileView === 'sidebar' }" :style="vibeStyles">
    <!-- Desktop: two-column layout. Mobile: toggle between sidebar/feed -->

    <!-- Sidebar -->
    <aside class="fd-sidebar" :class="{ 'fd-sidebar--visible': mobileView === 'sidebar' }">
      <!-- Theme background image layer -->
      <div
        v-if="effectiveSidebarBg"
        class="fd-sidebar-bg"
        :style="{ backgroundImage: `url(${effectiveSidebarBg})` }"
      ></div>
      <!-- User header -->
      <div class="fd-user" @click="selectItem('profile')" style="cursor: pointer;">
        <img src="https://api.dicebear.com/9.x/notionists/svg?seed=ditto-user" class="fd-avatar fd-avatar--sm fd-avatar--img" />
        <div class="fd-user-info">
          <span class="fd-user-name">You</span>
          <span class="fd-user-handle">@you@ditto.pub</span>
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
          <!-- Compose box -->
          <div class="fd-compose">
            <img src="https://api.dicebear.com/9.x/notionists/svg?seed=ditto-user" class="fd-avatar fd-avatar--post fd-avatar--img" />
            <span class="fd-compose-placeholder">What's on your mind?</span>
          </div>
          <!-- Follows / Global tabs -->
          <div class="fd-tab-bar">
            <span class="fd-tab" :class="{ 'fd-tab--active': feedTab === 'follows' }" @click="feedTab = 'follows'">Follows</span>
            <span class="fd-tab" :class="{ 'fd-tab--active': feedTab === 'global' }" @click="feedTab = 'global'">Global</span>
          </div>
           <div class="fd-post" v-for="(post, i) in (feedTab === 'follows' ? feedData.feed : feedData.globalFeed)" :key="feedTab + '-' + i">
            <div class="fd-post-header">
              <img v-if="post.avatar" :src="post.avatar" class="fd-avatar fd-avatar--post fd-avatar--img" />
              <div v-else class="fd-avatar fd-avatar--post" :style="{ background: post.color }">{{ post.initials }}</div>
              <div>
                <span class="fd-post-name">{{ post.name }}</span>
                <span class="fd-post-handle">{{ post.handle }} &middot; {{ post.time }}</span>
              </div>
            </div>
            <p class="fd-post-body">{{ post.body }}</p>
            <div v-if="post.image" class="fd-post-image">
              <img v-if="post.imageSrc" :src="post.imageSrc" class="fd-post-img" />
              <div v-else class="fd-image-placeholder" :style="{ background: post.imageBg || '' }"></div>
            </div>
            <div class="fd-post-actions">
              <span class="fd-action fd-action--reply" title="Reply">&#x1F4AC; {{ post.replies }}</span>
              <span class="fd-action fd-action--repost" title="Repost">&#x1F501; {{ post.reposts }}</span>
              <span class="fd-action fd-action--heart" title="React">&#x2661; {{ post.likes }}</span>
              <span class="fd-action fd-action--zap" title="Zap">&#x26A1; {{ post.zaps }}</span>
              <span class="fd-action fd-action--more" title="More">&#x22EF;</span>
            </div>
          </div>
        </template>

        <!-- Notifications -->
        <template v-else-if="activeId === 'notifications'">
          <div class="fd-tab-bar">
            <span class="fd-tab fd-tab--active">All</span>
            <span class="fd-tab">Mentions</span>
          </div>
          <div class="fd-notif" v-for="(n, i) in feedData.notifications" :key="i" :class="{ 'fd-notif--unread': n.unread }">
            <span class="fd-notif-icon" :class="'fd-notif-icon--' + n.type">{{ n.icon }}</span>
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
          <div class="fd-tab-bar">
            <span class="fd-tab fd-tab--active">Posts</span>
            <span class="fd-tab">Accounts</span>
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
              <img v-if="post.avatar" :src="post.avatar" class="fd-avatar fd-avatar--post fd-avatar--img" />
              <div v-else class="fd-avatar fd-avatar--post" :style="{ background: post.color }">{{ post.initials }}</div>
              <div>
                <span class="fd-post-name">{{ post.name }}</span>
                <span class="fd-post-handle">{{ post.handle }} &middot; {{ post.time }}</span>
              </div>
            </div>
            <p class="fd-post-body">{{ post.body }}</p>
            <div class="fd-post-actions">
              <span class="fd-action fd-action--reply">&#x1F4AC; {{ post.replies }}</span>
              <span class="fd-action fd-action--repost">&#x1F501; {{ post.reposts }}</span>
              <span class="fd-action fd-action--heart">&#x2661; {{ post.likes }}</span>
              <span class="fd-action fd-action--zap">&#x26A1; {{ post.zaps }}</span>
            </div>
          </div>
        </template>

        <!-- Profile -->
        <template v-else-if="activeId === 'profile'">
          <div class="fd-profile">
            <img src="https://picsum.photos/seed/profile-banner/600/200" class="fd-profile-banner fd-profile-banner--img" />
            <div class="fd-profile-info">
              <img src="https://api.dicebear.com/9.x/notionists/svg?seed=ditto-user" class="fd-avatar fd-avatar--lg fd-avatar--img" />
              <div class="fd-profile-actions">
                <span class="fd-profile-btn">Edit Profile</span>
                <span class="fd-profile-btn fd-profile-btn--zap">&#x26A1; Zap</span>
              </div>
              <h3 class="fd-profile-name">You</h3>
              <p class="fd-profile-handle">@you@ditto.pub</p>
              <p class="fd-profile-bio">Living on the open internet. Posting what I want, zapping what I like. This is my Ditto.</p>
              <div class="fd-profile-stats">
                <span><strong>842</strong> following</span>
                <span><strong>1.2k</strong> followers</span>
                <span><strong>3.4k</strong> posts</span>
                <span class="fd-profile-streak">&#x1F525; 14 day streak</span>
              </div>
              <!-- Profile tabs -->
              <div class="fd-tab-bar" style="margin: 12px -20px 0; border-top: 1px solid var(--vp-c-divider);">
                <span class="fd-tab fd-tab--active">Posts</span>
                <span class="fd-tab">Replies</span>
                <span class="fd-tab">Media</span>
                <span class="fd-tab">Likes</span>
              </div>
              <!-- Sample posts on profile -->
              <div class="fd-post" style="border-bottom: 1px solid var(--vp-c-divider); padding: 12px 0;">
                <p class="fd-post-body">Just set up my own Ditto instance on a Raspberry Pi. The future of social is self-hosted.</p>
                <div class="fd-post-actions">
                  <span class="fd-action fd-action--reply">&#x1F4AC; 8</span>
                  <span class="fd-action fd-action--repost">&#x1F501; 23</span>
                  <span class="fd-action fd-action--heart">&#x2661; 67</span>
                  <span class="fd-action fd-action--zap">&#x26A1; 1.2k</span>
                </div>
              </div>
              <div class="fd-post" style="padding: 12px 0;">
                <p class="fd-post-body">The Nostr ecosystem is growing fast. Polls, games, live streams, color palettes, geocaching... all in one protocol. Wild times.</p>
                <div class="fd-post-actions">
                  <span class="fd-action fd-action--reply">&#x1F4AC; 3</span>
                  <span class="fd-action fd-action--repost">&#x1F501; 11</span>
                  <span class="fd-action fd-action--heart">&#x2661; 42</span>
                  <span class="fd-action fd-action--zap">&#x26A1; 500</span>
                </div>
              </div>
            </div>
          </div>
        </template>

        <!-- Vibe (Theme Settings) -->
        <template v-else-if="activeId === 'vibe'">
          <div class="fd-vibe-page">
            <p class="fd-vibe-subtitle">Choose a theme for the interface</p>
            <div class="fd-vibe-mode">
              <span class="fd-vibe-mode-btn">&#x2600;&#xFE0F; Light</span>
              <span class="fd-vibe-mode-btn fd-vibe-mode-btn--active">&#x1F319; Dark</span>
              <span class="fd-vibe-mode-btn">&#x1F4BB; System</span>
            </div>
            <h4 class="fd-section-title">Presets</h4>
            <div class="fd-vibe-grid">
              <div class="fd-vibe-card" v-for="t in vibeThemes" :key="t.key"
                   :class="{ 'fd-vibe-card--active': vibeThemeKey === t.key }"
                   @click="selectVibe(t.key)">
                <div class="fd-vibe-swatch" :style="{ backgroundColor: `hsl(${t.colors.background})` }">
                  <div class="fd-vibe-swatch-bg" :style="{ backgroundImage: `url(${t.background.bg})` }"></div>
                  <div class="fd-vibe-swatch-overlay"></div>
                  <span class="fd-vibe-card-name">{{ t.label }}</span>
                </div>
              </div>
            </div>
          </div>
        </template>

        <!-- Settings -->
        <template v-else-if="activeId === 'settings'">
          <div class="fd-settings-page">
            <p class="fd-settings-intro">Shape your identity, tune your feed, and manage how you connect.</p>
            <div class="fd-settings-menu-item" v-for="(item, i) in feedData.settings" :key="i">
              <span class="fd-settings-menu-icon">{{ item.icon }}</span>
              <div class="fd-settings-menu-text">
                <span class="fd-post-name">{{ item.label }}</span>
                <span class="fd-post-handle">{{ item.desc }}</span>
              </div>
              <span class="fd-settings-chevron">&#x203A;</span>
            </div>
          </div>
        </template>

        <!-- Trends -->
        <template v-else-if="activeId === 'trends'">
          <div class="fd-trends-pills">
            <span class="fd-tag" v-for="(t, i) in feedData.trends.tags" :key="i">#{{ t.tag }} <small>{{ t.posts }}</small></span>
          </div>
          <div class="fd-tab-bar">
            <span class="fd-tab fd-tab--active">&#x1F525; Hot</span>
            <span class="fd-tab">&#x1F4C8; Rising</span>
            <span class="fd-tab">&#x2694;&#xFE0F; Controversial</span>
          </div>
          <div class="fd-post" v-for="(post, i) in feedData.trends.posts" :key="i">
            <div class="fd-post-header">
              <img v-if="post.avatar" :src="post.avatar" class="fd-avatar fd-avatar--post fd-avatar--img" />
              <div v-else class="fd-avatar fd-avatar--post" :style="{ background: post.color }">{{ post.initials }}</div>
              <div>
                <span class="fd-post-name">{{ post.name }}</span>
                <span class="fd-post-handle">{{ post.handle }} &middot; {{ post.time }}</span>
              </div>
            </div>
            <p class="fd-post-body">{{ post.body }}</p>
            <div class="fd-post-actions">
              <span class="fd-action fd-action--reply">&#x1F4AC; {{ post.replies }}</span>
              <span class="fd-action fd-action--repost">&#x1F501; {{ post.reposts }}</span>
              <span class="fd-action fd-action--heart">&#x2661; {{ post.likes }}</span>
              <span class="fd-action fd-action--zap">&#x26A1; {{ post.zaps }}</span>
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
            <img v-if="a.coverSrc" :src="a.coverSrc" class="fd-article-cover" />
            <p class="fd-article-excerpt">{{ a.excerpt }}</p>
            <span class="fd-article-read">Read article &#x2192;</span>
          </div>
        </template>

        <!-- Vines (short videos) -->
        <template v-else-if="activeId === 'vines'">
          <div class="fd-video-grid">
            <div class="fd-video-card" v-for="(v, i) in feedData.vines" :key="i">
              <div class="fd-video-thumb fd-video-thumb--vertical">
                <img :src="v.thumbSrc" class="fd-video-thumb-img" />
                <span class="fd-play-btn">&#x25B6;</span>
                <span class="fd-video-duration">{{ v.duration }}</span>
              </div>
              <div class="fd-video-info">
                <img :src="v.avatar" class="fd-avatar fd-avatar--xs fd-avatar--img" />
                <div>
                  <span class="fd-post-name">{{ v.creator }}</span>
                  <div class="fd-post-handle">{{ v.title }}</div>
                </div>
              </div>
            </div>
          </div>
        </template>

        <!-- Streams -->
        <template v-else-if="activeId === 'streams'">
          <div class="fd-stream" v-for="(s, i) in feedData.streams" :key="i">
            <div class="fd-stream-thumb">
              <img :src="s.thumbSrc" class="fd-stream-thumb-img" />
              <span class="fd-stream-badge" :class="'fd-stream-badge--' + s.status">{{ s.statusLabel }}</span>
              <span class="fd-stream-viewers">&#x1F441; {{ s.viewers }}</span>
            </div>
            <div class="fd-stream-info">
              <div class="fd-stream-meta">
                <img :src="s.avatar" class="fd-avatar fd-avatar--sm fd-avatar--img" />
                <span class="fd-post-name">{{ s.streamer }}</span>
              </div>
              <span class="fd-post-body" style="margin: 4px 0 0; font-size: 12px;">{{ s.title }}</span>
              <span class="fd-post-handle">{{ s.summary }}</span>
            </div>
          </div>
        </template>

        <!-- Webxdc -->
        <template v-else-if="activeId === 'webxdc'">
          <div class="fd-webxdc-grid">
            <div class="fd-webxdc-card" v-for="(app, i) in feedData.webxdc" :key="i">
              <div class="fd-webxdc-preview">
                <img :src="app.preview" :alt="app.name" class="fd-webxdc-preview-img" />
              </div>
              <div class="fd-webxdc-info">
                <span class="fd-app-icon">{{ app.icon }}</span>
                <span class="fd-app-name">{{ app.name }}</span>
              </div>
            </div>
          </div>
        </template>

        <!-- Themes -->
        <template v-else-if="activeId === 'themes'">
          <div class="fd-themes-list">
            <div class="fd-theme-item" v-for="(t, i) in feedData.themes" :key="i">
              <div class="fd-post-header">
                <div class="fd-avatar fd-avatar--post" :style="{ background: t.color }">{{ t.initials }}</div>
                <div>
                  <span class="fd-post-name">{{ t.author }}</span>
                  <span class="fd-post-handle">shared a theme &middot; {{ t.time }}</span>
                </div>
              </div>
              <!-- Mini UI mockup -->
              <div class="fd-theme-mockup" :style="{ background: t.bg, color: t.fg, borderColor: t.border }">
                <div class="fd-theme-mockup-header" :style="{ background: t.primary }"></div>
                <div class="fd-theme-mockup-body">
                  <div class="fd-theme-mockup-line" :style="{ background: t.fg, opacity: 0.7 }"></div>
                  <div class="fd-theme-mockup-line fd-theme-mockup-line--short" :style="{ background: t.fg, opacity: 0.4 }"></div>
                  <div class="fd-theme-mockup-btn" :style="{ background: t.primary }"></div>
                </div>
              </div>
              <div class="fd-theme-item-footer">
                <span class="fd-post-name">{{ t.name }}</span>
                <span class="fd-theme-copy">Copy Theme</span>
              </div>
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
            <div class="fd-poll-badges">
              <span class="fd-badge">&#x1F4CA; {{ poll.type }}</span>
              <span v-if="poll.ended" class="fd-badge fd-badge--muted">Ended</span>
            </div>
            <div class="fd-poll-options">
              <div class="fd-poll-option" v-for="(opt, j) in poll.options" :key="j">
                <div class="fd-poll-bar" :style="{ width: opt.pct + '%' }"></div>
                <span class="fd-poll-label">{{ opt.label }}</span>
                <span class="fd-poll-pct">{{ opt.pct }}%</span>
              </div>
            </div>
            <div class="fd-poll-footer">
              <span class="fd-poll-total">{{ poll.totalVotes }} votes</span>
              <span v-if="!poll.ended" class="fd-poll-vote-btn">Vote</span>
            </div>
          </div>
        </template>

        <!-- Follow Packs -->
        <template v-else-if="activeId === 'followpacks'">
          <div class="fd-followpack" v-for="(pack, i) in feedData.followpacks" :key="i">
            <h4 class="fd-followpack-title">&#x1F389; {{ pack.name }}</h4>
            <p class="fd-post-handle">{{ pack.desc }}</p>
            <img v-if="pack.coverSrc" :src="pack.coverSrc" class="fd-followpack-cover" />
            <div class="fd-followpack-row">
              <div class="fd-followpack-avatars">
                <div class="fd-avatar fd-avatar--sm" v-for="(m, j) in pack.members" :key="j" :style="{ background: m.color }">{{ m.initials }}</div>
              </div>
              <span class="fd-followpack-count">&#x1F465; {{ pack.total }} members</span>
            </div>
          </div>
        </template>

        <!-- Color Moments -->
        <template v-else-if="activeId === 'colors'">
          <div class="fd-colors-list">
            <div class="fd-color-item" v-for="(c, i) in feedData.colors" :key="i">
              <div class="fd-post-header">
                <div class="fd-avatar fd-avatar--post" :style="{ background: c.color }">{{ c.initials }}</div>
                <div>
                  <span class="fd-post-name">{{ c.author }}</span>
                  <span class="fd-post-handle">&middot; {{ c.time }}</span>
                </div>
              </div>
              <div v-if="c.name" class="fd-post-body" style="margin-bottom: 6px;">{{ c.name }}</div>
              <div class="fd-color-palette" :class="'fd-color-palette--' + c.layout">
                <span v-for="(swatch, j) in c.swatches" :key="j" class="fd-color-swatch" :style="{ background: swatch }"></span>
                <span v-if="c.emoji" class="fd-color-emoji">{{ c.emoji }}</span>
              </div>
              <div class="fd-color-hexes">
                <span v-for="(swatch, j) in c.swatches" :key="j" class="fd-color-hex">
                  <span class="fd-color-dot" :style="{ background: swatch }"></span>
                  {{ swatch }}
                </span>
              </div>
            </div>
          </div>
        </template>

        <!-- Magic Decks -->
        <template v-else-if="activeId === 'magic'">
          <div class="fd-deck" v-for="(deck, i) in feedData.magic" :key="i">
            <div class="fd-post-header">
              <img :src="deck.avatar" class="fd-avatar fd-avatar--post fd-avatar--img" />
              <div>
                <span class="fd-post-name">{{ deck.author }}</span>
                <span class="fd-post-handle">shared a deck &middot; {{ deck.time }}</span>
              </div>
            </div>
            <img :src="deck.bannerSrc" class="fd-deck-banner" />
            <h4 class="fd-deck-title">&#x1F0CF; {{ deck.name }}</h4>
            <div v-if="deck.commander" class="fd-post-handle" style="margin-bottom: 4px;">&#x1F6E1;&#xFE0F; Commander: {{ deck.commander }}</div>
            <div class="fd-deck-badges">
              <span class="fd-badge">{{ deck.format }}</span>
              <span class="fd-badge">{{ deck.archetype }}</span>
              <span class="fd-badge">{{ deck.cardCount }} cards</span>
            </div>
            <div class="fd-deck-cards">
              <img v-for="(card, j) in deck.cards" :key="j" :src="card.imgSrc" :alt="card.name" class="fd-magic-card-img" />
            </div>
          </div>
        </template>

        <!-- Treasures -->
        <template v-else-if="activeId === 'treasures'">
          <div class="fd-treasure" v-for="(t, i) in feedData.treasures" :key="i">
            <div class="fd-post-header">
              <img :src="t.avatar" class="fd-avatar fd-avatar--post fd-avatar--img" />
              <div>
                <span class="fd-post-name">{{ t.user }}</span>
                <span class="fd-post-handle">{{ t.action }} &middot; {{ t.time }}</span>
              </div>
            </div>
            <div class="fd-treasure-body">
              <span class="fd-treasure-icon">&#x1F4CD;</span>
              <span class="fd-post-name">{{ t.name }}</span>
            </div>
            <div class="fd-treasure-badges">
              <span class="fd-badge">{{ t.type }}</span>
              <span class="fd-badge">{{ t.size }}</span>
              <span class="fd-treasure-rating">D{{ t.difficulty }}/T{{ t.terrain }}</span>
            </div>
            <img v-if="t.photo" :src="t.photo" class="fd-treasure-photo" />
            <p v-if="t.desc" class="fd-post-body" style="margin-top: 6px;">{{ t.desc }}</p>
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
import { themes, deriveTokens, hslToCSS } from '../themes';
import type { Y2KTheme } from '../themes';

const props = defineProps<{
  themeBg?: string;
}>();

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
const feedTab = ref<'follows' | 'global'>('follows');
const dragId = ref<string | null>(null);
const dragOverId = ref<string | null>(null);
const vibeThemeKey = ref<string | null>(null);

// ── Vibe themes (creative themes from themes.ts, excluding light/dark) ──
const vibeThemes = computed(() =>
  themes.filter(t => t.background.bg !== '')
);

const activeVibeTheme = computed<Y2KTheme | null>(() => {
  if (!vibeThemeKey.value) return null;
  return themes.find(t => t.key === vibeThemeKey.value) || null;
});

const vibeStyles = computed<Record<string, string>>(() => {
  const theme = activeVibeTheme.value;
  if (!theme) return {};

  const tokens = deriveTokens(theme.colors);

  return {
    '--theme-bg': hslToCSS(tokens.background),
    '--theme-text': hslToCSS(tokens.foreground),
    '--theme-primary': hslToCSS(tokens.primary),
    '--theme-primary-fg': hslToCSS(tokens.primaryForeground),
    '--theme-card': hslToCSS(tokens.card),
    '--theme-card-fg': hslToCSS(tokens.cardForeground),
    '--theme-secondary': hslToCSS(tokens.secondary),
    '--theme-secondary-fg': hslToCSS(tokens.secondaryForeground),
    '--theme-muted': hslToCSS(tokens.muted),
    '--theme-muted-fg': hslToCSS(tokens.mutedForeground),
    '--theme-accent': hslToCSS(tokens.accent),
    '--theme-accent-fg': hslToCSS(tokens.accentForeground),
    '--theme-border': hslToCSS(tokens.border),
    '--theme-ring': hslToCSS(tokens.ring),
    '--vp-c-text-1': hslToCSS(tokens.foreground),
    '--vp-c-text-2': hslToCSS(tokens.mutedForeground),
    '--vp-c-text-3': hslToCSS(tokens.mutedForeground),
    '--vp-c-brand-1': hslToCSS(tokens.primary),
    '--vp-c-bg': hslToCSS(tokens.background),
    '--vp-c-bg-soft': hslToCSS(tokens.secondary),
    '--vp-c-divider': hslToCSS(tokens.border),
    'color': hslToCSS(tokens.foreground),
  };
});

const effectiveSidebarBg = computed(() => {
  if (activeVibeTheme.value?.background.bg) return activeVibeTheme.value.background.bg;
  return props.themeBg || '';
});

function selectVibe(key: string) {
  vibeThemeKey.value = vibeThemeKey.value === key ? null : key;
}

const sidebarItems = reactive<SidebarItem[]>([
  { id: 'feed',          icon: '\u{1F525}', label: 'Feed',          pinned: true,  visible: true, fixed: true, order: 0 },
  { id: 'vibe',          icon: '\u{1F3A8}', label: 'Vibe',          pinned: true,  visible: true, order: 1 },
  { id: 'articles',      icon: '\u{1F4DD}', label: 'Articles',      pinned: true,  visible: true, order: 2 },
  { id: 'vines',         icon: '\u{1F3AC}', label: 'Vines',         pinned: true,  visible: true, order: 3 },
  { id: 'streams',       icon: '\u{1F4E1}', label: 'Streams',       pinned: true,  visible: true, order: 4 },
  { id: 'webxdc',        icon: '\u{1F3AE}', label: 'Webxdc',        pinned: true,  visible: true, order: 5 },
  { id: 'magic',         icon: '\u{1F0CF}', label: 'Magic Decks',   pinned: true,  visible: true, order: 6 },
  { id: 'treasures',     icon: '\u{1F3C6}', label: 'Treasures',     pinned: true,  visible: true, order: 7 },
  { id: 'notifications', icon: '\u{1F514}', label: 'Notifications', pinned: false, visible: true, order: 8 },
  { id: 'search',        icon: '\u{1F50D}', label: 'Search',        pinned: false, visible: true, order: 9 },
  { id: 'bookmarks',     icon: '\u{1F516}', label: 'Bookmarks',     pinned: false, visible: true, order: 10 },
  { id: 'settings',      icon: '\u{2699}\u{FE0F}', label: 'Settings', pinned: false, visible: true, order: 11 },
  { id: 'trends',        icon: '\u{1F4C8}', label: 'Trends',        pinned: false, visible: true, order: 12 },
  { id: 'themes',        icon: '\u{2728}',  label: 'Themes',        pinned: false, visible: true, order: 13 },
  { id: 'polls',         icon: '\u{1F4CA}', label: 'Polls',         pinned: false, visible: true, order: 14 },
  { id: 'followpacks',   icon: '\u{1F389}', label: 'Follow Packs',  pinned: false, visible: true, order: 15 },
  { id: 'colors',        icon: '\u{1F308}', label: 'Color Moments', pinned: false, visible: true, order: 16 },
  { id: 'profile',       icon: '\u{1F464}', label: 'Profile',       pinned: false, visible: true, order: 17 },
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
      name: 'Marcus', handle: '@marcusg', time: '1m', initials: 'MG', color: '#6366f1',
      avatar: 'https://i.pravatar.cc/150?u=sophie-dev',
      body: 'Just beat the final boss of the Elden Ring DLC after 47 attempts. My hands are literally shaking. Messmer can rot in hell.',
      image: false,
      replies: 34, reposts: 12, likes: 287, zaps: '1.4k',
    },
    {
      name: 'Sophie', handle: '@sophieml', time: '4m', initials: 'S', color: '#ec4899',
      avatar: 'https://i.pravatar.cc/150?u=marcusg-gamer',
      body: 'My code: works perfectly.\nMe: changes one variable name.\nMy code: civilization has collapsed, the sun has gone out, there is no hope.',
      image: false,
      replies: 89, reposts: 342, likes: 1247, zaps: '3.2k',
    },
    {
      name: 'Tyler', handle: '@tylerstreams', time: '8m', initials: 'T', color: '#22c55e',
      avatar: 'https://i.pravatar.cc/150?u=jade-cats',
      body: 'The One Piece live action Season 2 trailer just dropped and Chopper looks INCREDIBLE. They actually nailed it. We are so back.',
      image: false,
      replies: 56, reposts: 203, likes: 892, zaps: '5.1k',
    },
    {
      name: 'Jade', handle: '@jadecat', time: '15m', initials: 'J', color: '#f59e0b',
      avatar: 'https://i.pravatar.cc/150?u=tyler-pop',
      body: 'My cat just knocked my entire coffee off the desk, made eye contact with me, and then slowly pushed a pen off too. Asserting dominance.',
      image: false,
      replies: 23, reposts: 67, likes: 541, zaps: '900',
    },
  ],

  globalFeed: [
    {
      name: '\uBBFC\uC900', handle: '@minjun_bts', time: '2m', initials: 'MJ', color: '#a855f7',
      avatar: 'https://i.pravatar.cc/150?u=minjun-kr',
      body: '\uBC29\uD0C4\uC18C\uB144\uB2E8 \uCEF4\uBC31 \uD655\uC815!! \uB4DC\uB514\uC5B4 \uB4DC\uB514\uC5B4 \uB4DC\uB514\uC5B4 \uD574\uC678 \uD22C\uC5B4 \uB0A0\uC9DC \uB098\uC654\uC5B4\uC694 \uC11C\uC6B8 \uACF5\uC5F0 \uD2F0\uCF13\uD305 \uC5B8\uC81C\uC8E0?! \uD83D\uDC9C\uD83D\uDC9C\uD83D\uDC9C BTS COMEBACK CONFIRMED',
      image: false,
      replies: 892, reposts: 4521, likes: 12400, zaps: '45k',
    },
    {
      name: '\u3086\u304D / Yuki', handle: '@yuki_manga', time: '6m', initials: 'Y', color: '#ef4444',
      avatar: 'https://i.pravatar.cc/150?u=yuki-manga-jp',
      body: '\u30EF\u30F3\u30D4\u30FC\u30B9\u6700\u65B0\u8A71\u3084\u3070\u3059\u304E\u308B\u2026\u5C3E\u7530\u5148\u751F\u5929\u624D\u3059\u304E\u307E\u305B\u3093\u304B\uFF1F\u30EB\u30D5\u30A3\u304C\u3064\u3044\u306B\u2026\u6CE3\u3044\u3066\u308B\u3002\u30CD\u30BF\u30D0\u30EC\u3057\u306A\u3044\u3051\u3069\u307F\u3093\u306A\u8AAD\u3093\u3067\uFF01\uD83D\uDE2D\uD83C\uDF4E One Piece ch. 1142 is peak fiction',
      image: false,
      replies: 234, reposts: 891, likes: 3420, zaps: '8.7k',
    },
    {
      name: '\u0645\u0631\u06CC\u0645', handle: '@maryam_thr', time: '12m', initials: '\u0645', color: '#0ea5e9',
      avatar: 'https://i.pravatar.cc/150?u=maryam-thr-ir',
      body: '\u0627\u0645\u0631\u0648\u0632 \u062A\u0648 \u062A\u0647\u0631\u0627\u0646 \u0647\u0648\u0627 \u0639\u0627\u0644\u06CC \u0628\u0648\u062F\u060C \u0628\u0639\u062F \u0627\u0632 \u0645\u062F\u062A\u200C\u0647\u0627 \u0631\u0641\u062A\u06CC\u0645 \u067E\u0627\u0631\u06A9 \u062C\u0645\u0634\u06CC\u062F\u06CC\u0647 \u0648 \u06A9\u0644\u06CC \u0634\u0644\u0648\u063A \u0628\u0648\u062F. \u0627\u06CC\u0646 \u0634\u0647\u0631 \u0647\u0645\u06CC\u0634\u0647 \u063A\u0627\u0641\u0644\u06AF\u06CC\u0631 \u0645\u06CC\u200C\u06A9\u0646\u0647 \uD83C\uDF3F',
      image: false,
      replies: 18, reposts: 42, likes: 167, zaps: '320',
    },
    {
      name: 'Carlos', handle: '@carlos_cdmx', time: '20m', initials: 'C', color: '#22c55e',
      avatar: 'https://i.pravatar.cc/150?u=carlos-cdmx-mx',
      body: 'GOOOL DE M\u00C9XICO \u26BD\uFE0F\uD83C\uDDF2\uD83C\uDDFD No puedo creerlo, en el \u00FAltimo minuto!! Qu\u00E9 partido tan incre\u00EDble, estoy gritando solo en mi departamento jajaja \uD83D\uDE02\uD83D\uDE02',
      image: false,
      replies: 145, reposts: 523, likes: 2100, zaps: '6.3k',
    },
    {
      name: 'Aisha', handle: '@aisha_ng', time: '25m', initials: 'A', color: '#f97316',
      avatar: 'https://i.pravatar.cc/150?u=aisha-lagos-ng',
      body: 'Burna Boy just dropped a surprise album at midnight and I haven\'t slept since. Track 5 is on another level entirely. Afrobeats keep winning \uD83D\uDD25\uD83C\uDFB6',
      image: false,
      replies: 67, reposts: 289, likes: 1340, zaps: '4.1k',
    },
    {
      name: 'L\u00E9a', handle: '@lea_paris', time: '32m', initials: 'L', color: '#64748b',
      avatar: 'https://i.pravatar.cc/150?u=lea-paris-fr',
      body: 'Le nouveau film de Jacques Audiard \u00E0 Cannes \u00E9tait absolument magistral. 10 minutes de standing ovation. Le cin\u00E9ma fran\u00E7ais n\'est pas mort, il est plus vivant que jamais \uD83C\uDFA5\u2728',
      image: false,
      replies: 34, reposts: 98, likes: 412, zaps: '1.8k',
    },
  ],

  notifications: [
    { icon: '\u{26A1}', type: 'zap', actor: 'Fiatjaf', action: 'zapped your post 1,000 sats', time: '2m ago', unread: true },
    { icon: '\u{2764}\u{FE0F}', type: 'react', actor: 'Connie', action: 'reacted to your post', time: '5m ago', unread: true },
    { icon: '\u{1F501}', type: 'repost', actor: 'ODELL', action: 'reposted your article', time: '8m ago', unread: true },
    { icon: '@', type: 'mention', actor: 'Alice', action: 'mentioned you', time: '20m ago', unread: false },
    { icon: '\u{26A1}', type: 'zap', actor: 'Ben Arc', action: 'zapped your post 2,100 sats', time: '1h ago', unread: false },
    { icon: '\u{2764}\u{FE0F}', type: 'react', actor: 'Derek Ross', action: 'reacted to your post', time: '2h ago', unread: false },
    { icon: '\u{1F501}', type: 'repost', actor: 'Vitor Pamplona', action: 'reposted your note', time: '3h ago', unread: false },
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
      avatar: 'https://i.pravatar.cc/150?u=snowden',
      body: 'The tools we build today determine the freedoms we have tomorrow. Choose wisely.',
      replies: 142, reposts: 891, likes: 4200, zaps: '50k',
    },
    {
      name: 'Fiatjaf', handle: '@fiatjaf', time: '1w', initials: 'F', color: '#8b5cf6',
      avatar: 'https://i.pravatar.cc/150?u=fiatjaf',
      body: 'Nostr is not a social network. Nostr is a protocol. The social network is what you build on top of it.',
      replies: 67, reposts: 234, likes: 1100, zaps: '12k',
    },
  ],

  settings: [
    { icon: '\u{1F464}', label: 'Profile', desc: 'Edit your display name, bio, and avatar' },
    { icon: '\u{1F3A8}', label: 'Vibe', desc: 'Choose a theme for the interface' },
    { icon: '\u{1F4F0}', label: 'Content', desc: 'Manage your feed and content preferences' },
    { icon: '\u{1F310}', label: 'Network', desc: 'Relays and file upload servers' },
    { icon: '\u{1F514}', label: 'Notifications', desc: 'Configure push notification preferences' },
    { icon: '\u{2699}\u{FE0F}', label: 'Advanced', desc: 'Wallet, system, and power user settings' },
  ],

  trends: {
    tags: [
      { tag: 'nostr', posts: '2.4k' },
      { tag: 'bitcoin', posts: '1.8k' },
      { tag: 'ditto', posts: '956' },
      { tag: 'zaps', posts: '743' },
      { tag: 'freedom', posts: '612' },
      { tag: 'opensource', posts: '401' },
    ],
    posts: [
      {
        name: 'Fiatjaf', handle: '@fiatjaf', time: '2h', initials: 'F', color: '#8b5cf6',
        avatar: 'https://i.pravatar.cc/150?u=fiatjaf',
        body: 'The next wave of Nostr adoption will come from apps that make it fun, not apps that lecture you about decentralization.',
        replies: 45, reposts: 120, likes: 380, zaps: '8.5k',
      },
      {
        name: 'ODELL', handle: '@ODELL', time: '4h', initials: 'O', color: '#ef4444',
        avatar: 'https://i.pravatar.cc/150?u=odell',
        body: 'Self-hosting your social media is not about paranoia. It\'s about sovereignty.',
        replies: 23, reposts: 67, likes: 210, zaps: '4.2k',
      },
    ],
  },

  articles: [
    {
      title: 'Why Nostr Will Win',
      author: 'Fiatjaf', readTime: '8 min',
      coverSrc: 'https://picsum.photos/seed/article1/600/250',
      excerpt: 'The internet is broken. Social media is controlled by a handful of companies who profit from outrage. Nostr fixes this by giving users control over their own data and identity...',
    },
    {
      title: 'Self-Hosting Your Social Media in 2026',
      author: 'You', readTime: '5 min',
      coverSrc: 'https://picsum.photos/seed/article2/600/250',
      excerpt: 'You don\'t need a data center to run your own social platform. With Ditto, a $5 VPS is all it takes. Here\'s how to get started...',
    },
    {
      title: 'The Case for Digital Freedom',
      author: 'Alice', readTime: '12 min',
      coverSrc: '',
      excerpt: 'We spend more time online than ever before, yet we have less control over our digital lives than ever. It\'s time to change that...',
    },
  ],

  vines: [
    { creator: 'Nico', avatar: 'https://i.pravatar.cc/150?u=nico', duration: '0:32', title: 'Wait for it... \uD83D\uDE02', thumbSrc: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%2Fid%2FOIP.WN6jVCn_1mnxl3OEgnO9lAHaHa%3Fpid%3DApi&f=1&ipt=4e3a567c89afeaab40583bb5248b6f3486af0aba7a7d83bf607642d34e83684f&ipo=images' },
    { creator: 'Luna', avatar: 'https://i.pravatar.cc/150?u=luna', duration: '1:05', title: 'Storytime: how I found Nostr', thumbSrc: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.Q8zNjmYOgO0YKL3Uj47nnwHaE8%3Fpid%3DApi&f=1&ipt=8e49b6682c03f559930508e3ac97c0d1cc1281a9fc342181446d0fbe8d7338cc&ipo=images' },
    { creator: 'Zack', avatar: 'https://i.pravatar.cc/150?u=zack-vine', duration: '0:15', title: 'POV: you explain Nostr to normies', thumbSrc: 'https://www.lifewire.com/thmb/FyM1L6HZz69bMZE6HcdW98_9bhE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/yeet-56a9ff683df78cf772abf7e8.png' },
    { creator: 'Priya', avatar: 'https://i.pravatar.cc/150?u=priya', duration: '0:47', title: 'This cat just zapped me \uD83D\uDC31\u26A1', thumbSrc: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.VCO4ywPY5T6feuaQfElThwHaHa%3Fpid%3DApi&f=1&ipt=2258092a546e30fad4f120a73364a3c8f076d018b04ce18a9abce0b143598731&ipo=images' },
  ],

  streams: [
    { streamer: 'DaxMontana', avatar: 'https://i.pravatar.cc/150?u=daxmontana', title: 'Citadel Dispatch #142', summary: 'Bitcoin sovereignty and privacy', viewers: '1.2k', status: 'live', statusLabel: 'LIVE', thumbSrc: 'https://cdn.shopify.com/s/files/1/0095/4332/files/Screen_Shot_2018-02-21_at_10.43.11_AM_1024x1024.png?v=1519258577' },
    { streamer: 'VibeWithNova', avatar: 'https://i.pravatar.cc/150?u=vibewithnova', title: 'Lo-fi Beats & Chill', summary: 'Music stream, come hang out', viewers: '89', status: 'ended', statusLabel: 'ENDED', thumbSrc: 'https://cdn.shopify.com/s/files/1/0630/1689/4649/files/Article_Streamers_Pokimane.jpg?v=1740469315' },
    { streamer: 'PixelRook', avatar: 'https://i.pravatar.cc/150?u=pixelrook', title: 'Building on Nostr - Live Coding', summary: 'Hacking on LNbits plugins', viewers: '340', status: 'live', statusLabel: 'LIVE', thumbSrc: 'https://resource-cdn.obsbothk.com/product_system_back/product_img/gamestreamer.jpg' },
  ],

  webxdc: [
    { icon: '\u{1F47E}', name: 'Space Invaders', desc: 'Classic arcade game', preview: '/space-invaders.png' },
    { icon: '\u{265F}\u{FE0F}', name: 'Chess', desc: 'Play with friends', preview: '/chess-app.png' },
    { icon: '\u{1F4DD}', name: 'Collaborative Notepad', desc: 'Write together', preview: '/notes-app.jpeg' },
    { icon: '\u{1F3B2}', name: 'Dice Roller', desc: 'Tabletop companion', preview: '/dice-roll.jpeg' },
    { icon: '\u{2705}', name: 'Todo List', desc: 'Shared tasks', preview: '/todo.jpeg' },
    { icon: '\u{1F30D}', name: 'GeoChat', desc: 'Location-based chat', preview: '/geochat.png' },
  ],

  themes: [
    { name: 'Kawaii', author: 'Soapbox', initials: 'S', color: '#ff69b4', time: '2d', bg: '#fce4ec', fg: '#5c2d3e', primary: '#ff69b4', border: '#f8bbd0' },
    { name: 'Grunge', author: 'Soapbox', initials: 'S', color: '#ff4444', time: '3d', bg: '#1a1a1a', fg: '#e0e0e0', primary: '#ff4444', border: '#333' },
    { name: 'Midnight Ocean', author: 'nostrdev', initials: 'N', color: '#818cf8', time: '1w', bg: '#0f172a', fg: '#cbd5e1', primary: '#818cf8', border: '#1e293b' },
    { name: 'Sunset Warmth', author: 'Alice', initials: 'A', color: '#f59e0b', time: '2w', bg: '#fffbeb', fg: '#451a03', primary: '#f59e0b', border: '#fde68a' },
  ],

  polls: [
    {
      author: 'Derek Ross', handle: '@derek', time: '4h', initials: 'DR', color: '#f97316',
      question: 'What\'s your favorite Ditto feature?',
      type: 'Single choice', ended: false,
      options: [
        { label: 'Custom themes', pct: 38 },
        { label: 'Zaps', pct: 29 },
        { label: 'Sidebar feeds', pct: 22 },
        { label: 'Self-hosting', pct: 11 },
      ],
      totalVotes: 847,
    },
    {
      author: 'Mia', handle: '@mia', time: '3d', initials: 'M', color: '#f472b6',
      question: 'Best Nostr client for beginners?',
      type: 'Single choice', ended: true,
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
      coverSrc: 'https://picsum.photos/seed/pack-devs/600/200',
      members: [
        { initials: 'F', color: '#8b5cf6' },
        { initials: 'JB', color: '#3b82f6' },
        { initials: 'VP', color: '#22c55e' },
        { initials: 'W', color: '#f59e0b' },
      ],
      total: 46,
    },
    {
      name: 'Bitcoin Plebs',
      desc: 'Orange pill your timeline',
      coverSrc: '',
      members: [
        { initials: 'O', color: '#ef4444' },
        { initials: 'M', color: '#f97316' },
        { initials: 'G', color: '#eab308' },
      ],
      total: 159,
    },
    {
      name: 'Artists & Creators',
      desc: 'Visual artists, musicians, and makers',
      coverSrc: 'https://picsum.photos/seed/pack-artists/600/200',
      members: [
        { initials: 'L', color: '#ec4899' },
        { initials: 'R', color: '#06b6d4' },
        { initials: 'A', color: '#a78bfa' },
        { initials: 'S', color: '#84cc16' },
      ],
      total: 82,
    },
  ],

  colors: [
    {
      name: 'Sunset Bliss', emoji: '\u{1F305}',
      author: 'Luna', initials: 'L', color: '#ec4899', time: '1h',
      layout: 'horizontal',
      swatches: ['#ff6b6b', '#ffa36b', '#ffd93d', '#ff8e8e', '#ffb347'],
    },
    {
      name: 'Ocean Depths', emoji: '',
      author: 'River', initials: 'R', color: '#06b6d4', time: '3h',
      layout: 'vertical',
      swatches: ['#0a2463', '#3e92cc', '#2ec4b6', '#cbf3f0', '#1b4965'],
    },
    {
      name: '', emoji: '\u{1F332}',
      author: 'Sam', initials: 'S', color: '#22c55e', time: '6h',
      layout: 'horizontal',
      swatches: ['#2d5016', '#5a7d2f', '#8fbc55', '#c5e063', '#f0f7da'],
    },
  ],

  magic: [
    {
      name: 'Mono Red Aggro',
      author: 'Zack', avatar: 'https://i.pravatar.cc/150?u=zack-mtg', time: '5h',
      format: 'Modern', archetype: 'Aggro', cardCount: 60, commander: '',
      bannerSrc: 'https://cards.scryfall.io/art_crop/front/7/7/77c6fa74-5543-42ac-9ead-0e890b188e99.jpg?1706239968',
      cards: [
        { name: 'Lightning Bolt', imgSrc: 'https://cards.scryfall.io/normal/front/7/7/77c6fa74-5543-42ac-9ead-0e890b188e99.jpg?1706239968' },
        { name: 'Goblin Guide', imgSrc: 'https://cards.scryfall.io/normal/front/3/c/3c0f5411-1940-410f-96ce-6f92513f753a.jpg?1599706366' },
        { name: 'Monastery Swiftspear', imgSrc: 'https://cards.scryfall.io/normal/front/d/6/d6bfa227-4309-40ed-952c-279595eab17e.jpg?1701690543' },
      ],
    },
    {
      name: 'Azorius Control',
      author: 'Alice', avatar: 'https://i.pravatar.cc/150?u=alice-mtg', time: '1d',
      format: 'Commander', archetype: 'Control', cardCount: 100, commander: 'Grand Arbiter Augustin IV',
      bannerSrc: 'https://cards.scryfall.io/art_crop/front/3/0/30f6fca9-003b-4f6b-9d6e-1e88adda4155.jpg?1764758767',
      cards: [
        { name: 'Counterspell', imgSrc: 'https://cards.scryfall.io/normal/front/4/f/4f616706-ec97-4923-bb1e-11a69fbaa1f8.jpg?1751282477' },
        { name: 'Swords to Plowshares', imgSrc: 'https://cards.scryfall.io/normal/front/0/e/0e7ff4dc-af63-4342-9a44-d059e62bd14c.jpg?1752944384' },
        { name: 'Cryptic Command', imgSrc: 'https://cards.scryfall.io/normal/front/3/0/30f6fca9-003b-4f6b-9d6e-1e88adda4155.jpg?1764758767' },
      ],
    },
  ],

  treasures: [
    { user: 'BitcoinHiker', avatar: 'https://i.pravatar.cc/150?u=bitcoinhiker', action: 'hid a treasure', time: '2h', name: 'Satoshi\'s Cache', type: 'Traditional', size: 'Small', difficulty: 3, terrain: 2, desc: 'Near the old cherry blossom tree in the park. Bring a pen!', photo: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=400&h=200&fit=crop' },
    { user: 'NostrExplorer', avatar: 'https://i.pravatar.cc/150?u=nostrexplorer', action: 'found a treasure', time: '5h', name: 'Lightning Ridge', type: 'Multi-cache', size: 'Micro', difficulty: 4, terrain: 3, desc: '', photo: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&h=200&fit=crop' },
    { user: 'CachePirate', avatar: 'https://i.pravatar.cc/150?u=cachepirate', action: 'hid a treasure', time: '1d', name: 'Pirate\'s Bounty', type: 'Mystery', size: 'Regular', difficulty: 5, terrain: 4, desc: 'Solve the puzzle to find the coordinates. X marks the spot!', photo: 'https://images.unsplash.com/photo-1501446529957-6226bd447c46?w=400&h=200&fit=crop' },
  ],
};
</script>
