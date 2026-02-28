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
          <span class="win-menu-item">File</span>
          <span class="win-menu-item">Edit</span>
          <span class="win-menu-item">View</span>
          <span class="win-menu-item">Image</span>
          <span class="win-menu-item">Options</span>
          <span class="win-menu-item win-menu-help" @click.stop="paintHelpOpen = !paintHelpOpen">
            Help
            <!-- Win95 Help dropdown menu -->
            <div v-if="paintHelpOpen" class="win-help-dropdown" @click.stop>
              <div class="win-help-heading">Help Topics</div>
              <div class="win-help-separator"></div>
              <div class="win-help-group-label">Learn</div>
              <a href="/learn/what-is-nostr" class="win-help-link">What is Nostr?</a>
              <a href="/learn/getting-started" class="win-help-link">Getting Started</a>
              <a href="/learn/why-ditto" class="win-help-link">Why Ditto?</a>
              <div class="win-help-separator"></div>
              <div class="win-help-group-label">Guides</div>
              <a href="/guides/themes" class="win-help-link">Custom Themes</a>
              <a href="/guides/self-hosting" class="win-help-link">Self-Hosting</a>
              <a href="/guides/configuration" class="win-help-link">Configuration</a>
              <div class="win-help-separator"></div>
              <div class="win-help-group-label">Specs</div>
              <a href="/specs/kinds" class="win-help-link">Event Kinds</a>
              <div class="win-help-separator"></div>
              <a href="https://ditto.pub" class="win-help-link" target="_blank">About Ditto...</a>
            </div>
          </span>
        </div>
      </div>
    </template>

    <!-- ── KAWAII ── Cute pink CRT monitor -->
    <template v-else-if="theme === 'kawaii'">
      <div class="screen-chrome">
        <div class="screen-titlebar screen-titlebar-kawaii">
          <div class="screen-titlebar-circles">
            <span class="screen-circle screen-circle-kawaii">&#x2665;</span>
            <span class="screen-circle screen-circle-kawaii">&#x2665;</span>
            <span class="screen-circle screen-circle-kawaii">&#x2665;</span>
          </div>
          <div class="screen-nav-buttons">
            <span class="screen-nav-btn screen-nav-btn-kawaii">&#x2190;</span>
            <span class="screen-nav-btn screen-nav-btn-kawaii">&#x2192;</span>
          </div>
          <div class="screen-url-bar screen-url-bar-kawaii">&#x2729; ditto.pub &#x2729;</div>
          <span class="screen-kawaii-star">&#x2B50;</span>
        </div>
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
          <div class="screen-nav-buttons">
            <button class="screen-nav-btn screen-nav-btn-retro" type="button" @click="retroNav(-1)">&lt;</button>
            <button class="screen-nav-btn screen-nav-btn-retro" type="button" @click="retroNav(1)">&gt;</button>
          </div>
          <div class="screen-url-bar">{{ retroPages[retroPageIndex].label }}</div>
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
    <div class="screen-viewport-wrap" :class="{ 'screen-viewport-wrap-skater': theme === 'skater' }">
      <div class="screen-viewport" ref="viewport" v-show="!retroActiveUrl">
        <slot />
      </div>

      <!-- Retropop easter egg: iframe browser navigation -->
      <iframe
        v-if="retroActiveUrl"
        class="retro-iframe"
        :src="retroActiveUrl"
        frameborder="0"
        allowfullscreen
        referrerpolicy="no-referrer"
      ></iframe>

      <!-- CRT power-off overlay (Skater theme easter egg) -->
      <div
        v-if="theme === 'skater'"
        class="crt-overlay"
        :class="{ 'crt-shutting-down': crtState === 'shutting-down', 'crt-off': crtState === 'off', 'crt-turning-on': crtState === 'turning-on' }"
        @animationend.self="onCrtAnimationEnd"
      >
        <div class="crt-scanline"></div>
      </div>
    </div>

    <!-- ── Bottom bars for specific themes ── -->
    <div v-if="theme === 'kawaii'" class="screen-bottom screen-bottom-kawaii">
      <span>BANANA</span>
      <div class="screen-hearts">
        <span>&#x1F49C;</span><span>&#x1F499;</span><span>&#x2764;&#xFE0F;</span><span>&#x1F49B;</span>
      </div>
    </div>
    <div v-else-if="theme === 'skater'" class="screen-bottom screen-bottom-skater">
      <button class="screen-power-btn" :class="{ 'power-standby': crtState === 'off' }" @click.stop="toggleCrt" type="button">&#x23FB;</button>
    </div>
    <div v-else-if="theme === 'mspaint'" class="screen-bottom screen-bottom-mspaint">
      <div class="screen-statusbar">
        <span>For Help, click Help Topics on the Help Menu.</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';

const props = defineProps<{
  theme: string;
}>();

const viewport = ref<HTMLElement | null>(null);

// ── MS Paint Help menu (easter egg) ──
const paintHelpOpen = ref(false);

function closePaintHelp(e: MouseEvent) {
  // Close the help menu when clicking anywhere outside it
  if (paintHelpOpen.value) {
    paintHelpOpen.value = false;
  }
}

// ── Retropop browser navigation (easter egg) ──
const retroPages = [
  { url: null, label: 'ditto.pub' },
  { url: 'https://soapbox.pub', label: 'soapbox.pub' },
  { url: 'https://shakespeare.diy', label: 'shakespeare.diy' },
] as const;

const retroPageIndex = ref(0);

const retroActiveUrl = computed(() => {
  if (props.theme !== 'retropop') return null;
  return retroPages[retroPageIndex.value].url;
});

function retroNav(direction: -1 | 1) {
  const len = retroPages.length;
  retroPageIndex.value = (retroPageIndex.value + direction + len) % len;
}

// ── CRT power toggle (Skater theme easter egg) ──
type CrtState = 'on' | 'shutting-down' | 'off' | 'turning-on';
const crtState = ref<CrtState>('on');

function toggleCrt() {
  if (crtState.value === 'on') {
    crtState.value = 'shutting-down';
  } else if (crtState.value === 'off') {
    crtState.value = 'turning-on';
  }
  // Ignore clicks during animations
}

function onCrtAnimationEnd() {
  if (crtState.value === 'shutting-down') {
    crtState.value = 'off';
  } else if (crtState.value === 'turning-on') {
    crtState.value = 'on';
  }
}

// Reset easter egg state when switching themes
watch(() => props.theme, () => {
  crtState.value = 'on';
  retroPageIndex.value = 0;
  paintHelpOpen.value = false;
});

// ── Scroll forwarding ──
function onWheel(e: WheelEvent) {
  if (!viewport.value) return;
  // Don't forward scrolls when CRT is off or iframe is active
  if (props.theme === 'skater' && crtState.value !== 'on') return;
  if (retroActiveUrl.value) return;
  // If the scroll didn't originate inside the viewport, forward it
  if (!viewport.value.contains(e.target as Node)) {
    viewport.value.scrollTop += e.deltaY;
  }
}

onMounted(() => {
  window.addEventListener('wheel', onWheel, { passive: true });
  window.addEventListener('click', closePaintHelp);
});
onUnmounted(() => {
  window.removeEventListener('wheel', onWheel);
  window.removeEventListener('click', closePaintHelp);
});
</script>
