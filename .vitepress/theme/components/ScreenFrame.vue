<template>
  <div class="screen-frame" :class="`screen-${theme}`">

    <!-- ── MS PAINT ── Win95 application window -->
    <template v-if="theme === 'mspaint'">
      <div class="screen-chrome">
        <div class="screen-titlebar">
          <span class="screen-titlebar-text">untitled - Paint</span>
          <div class="screen-titlebar-buttons">
            <span class="screen-btn-win">_</span>
            <span class="screen-btn-win">[]</span>
            <span class="screen-btn-win">X</span>
          </div>
        </div>
        <div class="screen-menubar">
          <span>File</span><span>Edit</span><span>View</span><span>Image</span><span>Options</span><span>Help</span>
        </div>
      </div>
    </template>

    <!-- ── KAWAII ── Cute pink CRT monitor -->
    <template v-else-if="theme === 'kawaii'">
      <div class="screen-chrome">
        <div class="screen-bezel-top"></div>
      </div>
    </template>

    <!-- ── GRUNGE ── Dark punk window -->
    <template v-else-if="theme === 'grunge'">
      <div class="screen-chrome">
        <div class="screen-titlebar">
          <div class="screen-titlebar-buttons">
            <span class="screen-btn-grunge">X</span>
            <span class="screen-btn-grunge">[]</span>
            <span class="screen-btn-grunge">_</span>
          </div>
        </div>
      </div>
    </template>

    <!-- ── GAMER ── Retro game UI -->
    <template v-else-if="theme === 'gamer'">
      <div class="screen-chrome">
        <div class="screen-titlebar">
          <div class="screen-titlebar-buttons">
            <span class="screen-btn-gamer">X</span>
            <span class="screen-btn-gamer">[]</span>
            <span class="screen-btn-gamer">_</span>
          </div>
          <div class="screen-gamer-hud">
            <span class="screen-gamer-label">PLAYER 1</span>
          </div>
        </div>
      </div>
    </template>

    <!-- ── BUBBLEGUM ── Y2K browser window with tabs -->
    <template v-else-if="theme === 'bubblegum'">
      <div class="screen-chrome">
        <div class="screen-tab-bar">
          <span class="screen-tab active"></span>
          <span class="screen-tab"></span>
        </div>
        <div class="screen-titlebar">
          <div class="screen-nav-buttons">
            <span class="screen-nav-btn">&lt;</span>
            <span class="screen-nav-btn">&gt;</span>
            <span class="screen-nav-btn">&#8635;</span>
          </div>
          <div class="screen-url-bar">ditto.pub</div>
          <div class="screen-titlebar-buttons">
            <span class="screen-btn-bubble">_</span>
            <span class="screen-btn-bubble">[]</span>
            <span class="screen-btn-bubble">X</span>
          </div>
        </div>
      </div>
    </template>

    <!-- ── RETRO POP ── Stylized browser -->
    <template v-else-if="theme === 'retropop'">
      <div class="screen-chrome">
        <div class="screen-titlebar">
          <div class="screen-titlebar-circles">
            <span class="screen-circle"></span>
            <span class="screen-circle"></span>
          </div>
          <div class="screen-nav-buttons">
            <span class="screen-nav-btn">&lt;</span>
            <span class="screen-nav-btn">&gt;</span>
          </div>
          <div class="screen-url-bar">ditto.pub</div>
          <div class="screen-titlebar-buttons">
            <span class="screen-btn-retro">_</span>
            <span class="screen-btn-retro">[]</span>
            <span class="screen-btn-retro">X</span>
          </div>
        </div>
      </div>
    </template>

    <!-- ── SKATER ── CRT tube TV -->
    <template v-else-if="theme === 'skater'">
      <div class="screen-chrome">
        <div class="screen-bezel-top"></div>
      </div>
    </template>

    <!-- ── Fallback: generic frame -->
    <template v-else>
      <div class="screen-chrome">
        <div class="screen-titlebar">
          <div class="screen-titlebar-buttons">
            <span>_</span><span>[]</span><span>X</span>
          </div>
        </div>
      </div>
    </template>

    <!-- Content viewport: scrollable area where page sections live -->
    <div class="screen-viewport">
      <slot />
    </div>

    <!-- ── Bottom bars for specific themes ── -->
    <div v-if="theme === 'kawaii'" class="screen-bottom screen-bottom-kawaii">
      <span>BANANA</span>
      <div class="screen-hearts">
        <span>&#x1F49C;</span><span>&#x1F499;</span><span>&#x2764;&#xFE0F;</span><span>&#x1F49B;</span>
      </div>
    </div>
    <div v-else-if="theme === 'skater'" class="screen-bottom screen-bottom-skater">
      <span class="screen-power-btn">&#x23FB;</span>
    </div>
    <div v-else-if="theme === 'mspaint'" class="screen-bottom screen-bottom-mspaint">
      <div class="screen-statusbar">
        <span>For Help, click Help Topics on the Help Menu.</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  theme: string;
}>();
</script>
