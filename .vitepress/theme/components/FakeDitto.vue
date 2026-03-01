<template>
  <div class="fake-ditto" :class="{ 'fake-ditto--mobile-sidebar': mobileView === 'sidebar' }">
    <!-- Desktop: two-column layout. Mobile: toggle between sidebar/feed -->

    <!-- Sidebar -->
    <aside class="fd-sidebar" :class="{ 'fd-sidebar--visible': mobileView === 'sidebar' }">
      <!-- Theme background image layer -->
      <div
        v-if="props.themeBg"
        class="fd-sidebar-bg"
        :style="{ backgroundImage: `url(${props.themeBg})` }"
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
            <span class="fd-tab fd-tab--active">Follows</span>
            <span class="fd-tab">Global</span>
          </div>
           <div class="fd-post" v-for="(post, i) in feedData.feed" :key="i">
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
              <div class="fd-vibe-card" v-for="(t, i) in feedData.vibe" :key="i" :class="{ 'fd-vibe-card--active': i === 0 }">
                <div class="fd-vibe-swatch" :style="{ background: t.bg }">
                  <span class="fd-vibe-dot" :style="{ background: t.primary }"></span>
                </div>
                <span class="fd-vibe-card-name">{{ t.name }}</span>
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
          <div class="fd-webxdc-list">
            <div class="fd-webxdc-card" v-for="(app, i) in feedData.webxdc" :key="i">
              <div class="fd-webxdc-left">
                <div class="fd-app-icon">{{ app.icon }}</div>
                <div>
                  <span class="fd-app-name">{{ app.name }}</span>
                  <span class="fd-post-handle">{{ app.desc }}</span>
                </div>
              </div>
              <span class="fd-webxdc-launch">&#x25B6; Launch</span>
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
const dragId = ref<string | null>(null);
const dragOverId = ref<string | null>(null);

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
      name: 'Nostr News', handle: '@nostrnews', time: '1m', initials: 'NN', color: '#6366f1',
      avatar: 'https://i.pravatar.cc/150?u=nostrnews',
      body: 'Breaking: Ditto just dropped a massive update with custom themes, sidebars, and more. The Nostr ecosystem keeps growing!',
      image: true, imageSrc: 'https://picsum.photos/seed/ditto-update/600/300',
      replies: 12, reposts: 34, likes: 89, zaps: '2.1k',
    },
    {
      name: 'Connie', handle: '@Connie@primal.net', time: '3m', initials: 'C', color: '#ec4899',
      avatar: 'https://i.pravatar.cc/150?u=connie',
      body: 'The ability to zap people real sats for good posts changes the whole dynamic. Suddenly your timeline is full of quality instead of rage bait.',
      image: false,
      replies: 3, reposts: 8, likes: 42, zaps: '500',
    },
    {
      name: 'Gustavo', handle: '@limachaves@iris.to', time: '5m', initials: 'G', color: '#22c55e',
      avatar: 'https://i.pravatar.cc/150?u=gustavo',
      body: 'The ability to customize your sidebar and choose exactly what feeds you want to see is a game changer. No algorithm deciding for you.',
      image: false,
      replies: 7, reposts: 15, likes: 63, zaps: '1.5k',
    },
    {
      name: 'Alice', handle: '@alice@nostr.social', time: '12m', initials: 'A', color: '#f59e0b',
      avatar: 'https://i.pravatar.cc/150?u=alice',
      body: 'Posted my first long-form article on Ditto today. So nice to have a real writing experience built into a social app.',
      image: true, imageSrc: 'https://picsum.photos/seed/blog-preview/600/300',
      replies: 5, reposts: 11, likes: 28, zaps: '800',
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

  vibe: [
    { name: 'Kawaii', bg: '#fce4ec', primary: '#ff69b4' },
    { name: 'Grunge', bg: '#1a1a1a', primary: '#ff4444' },
    { name: 'Gamer', bg: '#0a0a2e', primary: '#00ff88' },
    { name: 'Bubblegum', bg: '#fff', primary: '#a600ff' },
    { name: 'Retro Pop', bg: '#ffe066', primary: '#9040a0' },
    { name: 'Skater', bg: '#f5f0e8', primary: '#e85d04' },
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
    { creator: 'Nico', avatar: 'https://i.pravatar.cc/150?u=nico', duration: '0:32', title: 'Lightning payment in action', thumbSrc: 'https://picsum.photos/seed/vine1/300/500' },
    { creator: 'Luna', avatar: 'https://i.pravatar.cc/150?u=luna', duration: '1:05', title: 'My Nostr setup tour', thumbSrc: 'https://picsum.photos/seed/vine2/300/500' },
    { creator: 'Zack', avatar: 'https://i.pravatar.cc/150?u=zack-vine', duration: '0:15', title: 'Bitcoin meme compilation', thumbSrc: 'https://picsum.photos/seed/vine3/300/500' },
    { creator: 'Priya', avatar: 'https://i.pravatar.cc/150?u=priya', duration: '0:47', title: 'Relay setup speedrun', thumbSrc: 'https://picsum.photos/seed/vine4/300/500' },
  ],

  streams: [
    { streamer: 'ODELL', avatar: 'https://i.pravatar.cc/150?u=odell', title: 'Citadel Dispatch #142', summary: 'Bitcoin sovereignty and privacy', viewers: '1.2k', status: 'live', statusLabel: 'LIVE', thumbSrc: 'https://picsum.photos/seed/stream1/600/340' },
    { streamer: 'Ben Arc', avatar: 'https://i.pravatar.cc/150?u=benarc', title: 'Building on Nostr - Live Coding', summary: 'Hacking on LNbits plugins', viewers: '340', status: 'live', statusLabel: 'LIVE', thumbSrc: 'https://picsum.photos/seed/stream2/600/340' },
    { streamer: 'Marce', avatar: 'https://i.pravatar.cc/150?u=marce', title: 'Lo-fi Beats & Chill', summary: 'Music stream, come hang out', viewers: '89', status: 'ended', statusLabel: 'ENDED', thumbSrc: 'https://picsum.photos/seed/stream3/600/340' },
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
