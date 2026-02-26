<template>
  <div class="ditto-home">

    <!-- ============================================================
         HERO: Giant title, floating emojis, pure energy
         ============================================================ -->
    <section class="hero">
      <div class="hero-emojis" aria-hidden="true">
        <span class="float-emoji e1">🎨</span>
        <span class="float-emoji e2">✨</span>
        <span class="float-emoji e3">🦋</span>
        <span class="float-emoji e4">🎸</span>
        <span class="float-emoji e5">🌈</span>
        <span class="float-emoji e6">🔮</span>
        <span class="float-emoji e7">🎪</span>
        <span class="float-emoji e8">💜</span>
        <span class="float-emoji e9">⚡</span>
        <span class="float-emoji e10">🎭</span>
        <span class="float-emoji e11">🌸</span>
        <span class="float-emoji e12">🚀</span>
      </div>
      <div class="hero-content">
        <h1 class="hero-title">
          <span class="hero-name">Ditto</span>
        </h1>
        <p class="hero-text">Social media that's actually fun.</p>
        <p class="hero-sub">
          A Nostr client for people who want to <em>express themselves</em>,
          not feed an algorithm. Open source, decentralized, and entirely yours to customize.
        </p>
        <div class="hero-actions">
          <a href="https://ditto.pub" target="_blank" class="btn btn-primary">
            <span>Open Ditto</span>
            <span class="btn-emoji">🚀</span>
          </a>
          <a href="/learn/what-is-nostr" class="btn btn-ghost">
            What is Nostr?
          </a>
        </div>
      </div>
    </section>

    <!-- ============================================================
         VIBES: Big emotional statement
         ============================================================ -->
    <section class="vibes">
      <div class="vibes-inner">
        <div class="vibes-emoji">🎉</div>
        <h2>Remember when the internet was a playground?</h2>
        <p>
          When you could customize your page. Pick your own colors. Express who you actually are.
          Before everything became the same feed, the same font, the same vibe.
        </p>
        <p class="vibes-punchline">Ditto brings that energy back.</p>
      </div>
    </section>

    <!-- ============================================================
         THEMES: Visual showcase of customization
         ============================================================ -->
    <section class="themes-section">
      <div class="section-inner">
        <div class="section-header">
          <span class="mega-emoji">🎨</span>
          <h2>Your vibe. Your colors. Your rules.</h2>
          <p>7 built-in themes. Full custom color tokens. Dark mode, light mode, OLED black mode. Make it look like <em>you</em>.</p>
        </div>
        <div class="theme-strips">
          <div class="theme-strip" style="--strip-bg: linear-gradient(135deg, #0d1117, #161b22); --strip-accent: #58a6ff;">
            <span class="strip-emoji">🌑</span>
            <span class="strip-name">Black</span>
          </div>
          <div class="theme-strip" style="--strip-bg: linear-gradient(135deg, #fce4ec, #f8bbd0); --strip-accent: #e91e63; color: #880e4f;">
            <span class="strip-emoji">🌸</span>
            <span class="strip-name">Pink</span>
          </div>
          <div class="theme-strip" style="--strip-bg: linear-gradient(135deg, #0a1628, #1a2744); --strip-accent: #5c7cfa;">
            <span class="strip-emoji">🌃</span>
            <span class="strip-name">Midnight</span>
          </div>
          <div class="theme-strip" style="--strip-bg: linear-gradient(135deg, #0a0f0a, #0d1a0d); --strip-accent: #39ff14;">
            <span class="strip-emoji">☠️</span>
            <span class="strip-name">Toxic</span>
          </div>
          <div class="theme-strip" style="--strip-bg: linear-gradient(135deg, #f3e5f5, #e1bee7); --strip-accent: #9c27b0; color: #4a148c;">
            <span class="strip-emoji">💜</span>
            <span class="strip-name">Lavender</span>
          </div>
          <div class="theme-strip" style="--strip-bg: linear-gradient(135deg, #0d2137, #0a3d5c); --strip-accent: #00bcd4;">
            <span class="strip-emoji">🌊</span>
            <span class="strip-name">Ocean</span>
          </div>
          <div class="theme-strip" style="--strip-bg: linear-gradient(135deg, #fff8e1, #ffecb3); --strip-accent: #ff6f00; color: #e65100;">
            <span class="strip-emoji">🌅</span>
            <span class="strip-name">Sunset</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ============================================================
         WHAT YOU CAN DO: Not a grid of icons. A story.
         ============================================================ -->
    <section class="powers-section">
      <div class="section-inner">
        <div class="section-header">
          <span class="mega-emoji">⚡</span>
          <h2>Not just another feed app.</h2>
          <p>Ditto is a playground. Here's some of what you can do.</p>
        </div>

        <div class="powers-list">
          <div class="power-item">
            <div class="power-emoji">📝</div>
            <div class="power-content">
              <h3>Post what you want</h3>
              <p>Short thoughts, long rants, content warnings, emoji reactions. The basics, done right. 5,000 character limit because sometimes you have things to say.</p>
            </div>
          </div>

          <div class="power-item">
            <div class="power-emoji">⚡</div>
            <div class="power-content">
              <h3>Zap people with real money</h3>
              <p>Send Bitcoin Lightning tips to anyone, right from their post. No "likes" that mean nothing. Send actual value to people who make your timeline better.</p>
            </div>
          </div>

          <div class="power-item">
            <div class="power-emoji">📰</div>
            <div class="power-content">
              <h3>Long-form articles</h3>
              <p>Write and read full blog posts right in Ditto. Not everything fits in a tweet-sized box.</p>
            </div>
          </div>

          <div class="power-item">
            <div class="power-emoji">🎬</div>
            <div class="power-content">
              <h3>Videos and live streams</h3>
              <p>Short-form videos. Live streams with chat. All integrated, no separate app needed.</p>
            </div>
          </div>

          <div class="power-item">
            <div class="power-emoji">📊</div>
            <div class="power-content">
              <h3>Polls, follow packs, colors, games...</h3>
              <p>The Nostr ecosystem is wild. Ditto plugs into all of it -- polls, curated follow lists, color palettes, Magic: The Gathering decks, geocaching, and sandboxed mini-apps. Yes, really.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ============================================================
         OWNERSHIP: The "why decentralized" pitch
         ============================================================ -->
    <section class="ownership-section">
      <div class="ownership-inner">
        <span class="mega-emoji">🔑</span>
        <h2>You own this.</h2>
        <p>
          Your account is a cryptographic key. Not an email address some company controls.
          Your posts live on relays you choose, not servers you rent.
          Your social graph follows you between apps. Switch clients whenever you want.
          Nothing is locked in. Nothing is locked down.
        </p>
        <p class="ownership-kicker">
          Decentralization isn't the point. <strong>Freedom</strong> is the point.<br>
          Decentralization is just how we get there.
        </p>
      </div>
    </section>

    <!-- ============================================================
         SELF-HOST: For the builders
         ============================================================ -->
    <section class="selfhost-section">
      <div class="section-inner">
        <div class="section-header">
          <span class="mega-emoji">🏗️</span>
          <h2>Run your own.</h2>
          <p>Ditto builds to static files. Deploy it on a $5 VPS, GitHub Pages, Netlify, or a Raspberry Pi in your closet. One config file. Your domain. Your community.</p>
        </div>
        <div class="selfhost-steps">
          <div class="step">
            <div class="step-num">1</div>
            <div class="step-text">
              <code>git clone</code> and <code>bun install</code>
            </div>
          </div>
          <div class="step-arrow">→</div>
          <div class="step">
            <div class="step-num">2</div>
            <div class="step-text">
              Drop in your <code>ditto.json</code>
            </div>
          </div>
          <div class="step-arrow">→</div>
          <div class="step">
            <div class="step-num">3</div>
            <div class="step-text">
              <code>bun run build</code> and ship it
            </div>
          </div>
        </div>
        <div class="selfhost-cta">
          <a href="/guides/self-hosting" class="btn btn-ghost">Read the self-hosting guide →</a>
        </div>
      </div>
    </section>

    <!-- ============================================================
         FINAL CTA: Let's go
         ============================================================ -->
    <section class="final-cta">
      <div class="final-cta-emojis" aria-hidden="true">
        <span class="float-emoji f1">🎊</span>
        <span class="float-emoji f2">💫</span>
        <span class="float-emoji f3">🌟</span>
        <span class="float-emoji f4">🎆</span>
        <span class="float-emoji f5">💜</span>
        <span class="float-emoji f6">🪩</span>
      </div>
      <div class="final-cta-inner">
        <h2>Ready?</h2>
        <p>No sign-up forms. No email. No phone number.<br>Just you and a Nostr key.</p>
        <div class="hero-actions">
          <a href="https://ditto.pub" target="_blank" class="btn btn-primary btn-lg">
            <span>Let's go</span>
            <span class="btn-emoji">✨</span>
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
</script>
