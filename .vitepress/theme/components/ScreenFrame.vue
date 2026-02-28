<template>
  <!-- Close confirmation dialog -->
  <div v-if="showCloseConfirm" class="win-dialog-overlay" @click.self="showCloseConfirm = false">
    <div class="win-dialog" :class="`win-dialog-${theme}`">
      <div class="win-dialog-titlebar">
        <span class="win-dialog-title">{{ closeTarget === 'dino' ? 'Dino' : theme === 'mspaint' ? 'Paint' : 'Ditto' }}</span>
        <span class="win-dialog-close" @click="showCloseConfirm = false">X</span>
      </div>
      <div class="win-dialog-body">
        <div class="win-dialog-icon">&#x26A0;</div>
        <p class="win-dialog-text">Are you sure you want to close this window?</p>
      </div>
      <div class="win-dialog-buttons">
        <button class="win-dialog-btn" @click="confirmClose">Yes</button>
        <button class="win-dialog-btn" @click="showCloseConfirm = false">No</button>
      </div>
    </div>
  </div>

  <!-- Minimized taskbars -->
  <div v-if="windowState === 'minimized' || (theme === 'gamer' && dinoState !== 'hidden' && dinoWindowState === 'minimized')" class="taskbar-row">
    <div v-if="windowState === 'minimized'" class="taskbar" :class="`taskbar-${theme}`" @click="windowState = 'normal'">
      <span class="taskbar-label">{{ theme === 'mspaint' ? 'untitled - Paint' : 'Ditto - Fun Social Media' }}</span>
      <span class="taskbar-maximize">&#x2197;</span>
    </div>
    <div v-if="theme === 'gamer' && dinoState !== 'hidden' && dinoWindowState === 'minimized'" class="taskbar taskbar-gamer taskbar-dino" @click="dinoWindowState = 'normal'">
      <span class="taskbar-label">&#x1F995; Dino</span>
      <span class="taskbar-maximize">&#x2197;</span>
    </div>
  </div>

  <!-- ── Main screen frame ── -->
  <div v-show="windowState === 'normal'" class="screen-frame" :class="`screen-${theme}`">

    <!-- ── MS PAINT ── Win95 application window -->
    <template v-if="theme === 'mspaint'">
      <div class="screen-chrome">
        <div class="screen-titlebar">
          <span class="screen-titlebar-text">untitled - Paint</span>
          <div class="screen-titlebar-buttons">
            <span class="screen-btn-win screen-btn-interactive" @click="minimizeWindow">_</span>
            <span class="screen-btn-win">[]</span>
            <span class="screen-btn-win screen-btn-interactive screen-btn-close" @click="requestClose('main')">X</span>
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
            <span class="screen-btn-grunge screen-btn-interactive screen-btn-close" @click="requestClose('main')">X</span>
            <span class="screen-btn-grunge">[]</span>
            <span class="screen-btn-grunge screen-btn-interactive" @click="minimizeWindow">_</span>
          </div>
        </div>
      </div>
    </template>

    <!-- ── GAMER ── Retro game UI -->
    <template v-else-if="theme === 'gamer'">
      <div class="screen-chrome">
        <div class="screen-titlebar">
          <div class="screen-titlebar-buttons">
            <span class="screen-btn-gamer screen-btn-interactive screen-btn-close" @click="requestClose('main')">X</span>
            <span class="screen-btn-gamer">[]</span>
            <span class="screen-btn-gamer screen-btn-interactive" @click="gamerMinimize">_</span>
          </div>
        </div>
      </div>
    </template>

    <!-- ── BUBBLEGUM ── Y2K browser window with tabs -->
    <template v-else-if="theme === 'bubblegum'">
      <div class="screen-chrome">
        <div class="screen-tab-bar">
          <span class="screen-tab" :class="{ active: bubbleTab === 0 }" @click="bubbleTab = 0"><span class="tab-favicon">&#x1FA90;</span> Ditto</span>
          <span class="screen-tab" :class="{ active: bubbleTab === 1 }" @click="bubbleTab = 1"><img class="tab-favicon-img" src="https://www.blobbi.pet/blob.png" alt="" /> Blobbi</span>
        </div>
        <div class="screen-titlebar">
          <div class="screen-url-bar">{{ bubbleTab === 0 ? 'ditto.pub' : 'blobbi.pet' }}</div>
          <div class="screen-titlebar-buttons">
            <span class="screen-btn-bubble screen-btn-interactive" @click="minimizeWindow">_</span>
            <span class="screen-btn-bubble">[]</span>
            <span class="screen-btn-bubble screen-btn-interactive screen-btn-close" @click="requestClose('main')">X</span>
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
            <span class="screen-btn-retro screen-btn-interactive" @click="minimizeWindow">_</span>
            <span class="screen-btn-retro">[]</span>
            <span class="screen-btn-retro screen-btn-interactive screen-btn-close" @click="requestClose('main')">X</span>
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
            <span class="screen-btn-interactive" @click="minimizeWindow">_</span>
            <span>[]</span>
            <span class="screen-btn-interactive screen-btn-close" @click="requestClose('main')">X</span>
          </div>
        </div>
      </div>
    </template>

    <!-- Content viewport: scrollable area where page sections live -->
    <div class="screen-viewport-wrap" :class="{ 'screen-viewport-wrap-skater': theme === 'skater', 'screen-viewport-wrap-kawaii': theme === 'kawaii' }" ref="viewportWrap">
      <div class="screen-viewport" ref="viewport" v-show="!retroActiveUrl && !bubbleIframeUrl">
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

      <!-- Bubblegum Blobbi tab iframe -->
      <iframe
        v-if="bubbleIframeUrl"
        class="retro-iframe"
        :src="bubbleIframeUrl"
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
      <span class="kawaii-banana-btn" @click="rainBananas">BANANA</span>
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

  <!-- ── Dino game window (gamer theme only) ── -->
  <div v-if="theme === 'gamer' && dinoState !== 'hidden'" v-show="dinoWindowState === 'normal'" class="screen-frame screen-gamer dino-screen">
    <div class="screen-chrome">
      <div class="screen-titlebar">
        <span class="screen-gamer-label">&#x1F995; DINO</span>
        <div class="screen-titlebar-buttons">
          <span class="screen-btn-gamer screen-btn-interactive screen-btn-close" @click="requestClose('dino')">X</span>
          <span class="screen-btn-gamer">[]</span>
          <span class="screen-btn-gamer screen-btn-interactive" @click="dinoWindowState = 'minimized'">_</span>
        </div>
      </div>
    </div>
    <div class="screen-viewport-wrap">
      <iframe
        v-if="dinoState === 'ready'"
        ref="dinoIframe"
        class="retro-iframe dino-iframe"
        src="https://arcanecircle-dino-v1-3-0.webxdc.app/"
        frameborder="0"
        allowfullscreen
        @load="onDinoIframeLoad"
      ></iframe>
      <div v-else class="dino-loading">Loading...</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue';

const props = defineProps<{
  theme: string;
}>();

const viewport = ref<HTMLElement | null>(null);
const viewportWrap = ref<HTMLElement | null>(null);

// ── Window minimize/close ──
type WindowState = 'normal' | 'minimized' | 'closed';
const windowState = ref<WindowState>('normal');
const showCloseConfirm = ref(false);
const closeTarget = ref<'main' | 'dino'>('main');

function minimizeWindow() {
  windowState.value = 'minimized';
}

function requestClose(target: 'main' | 'dino') {
  closeTarget.value = target;
  showCloseConfirm.value = true;
}

function confirmClose() {
  showCloseConfirm.value = false;
  if (closeTarget.value === 'dino') {
    dinoWindowState.value = 'closed';
  } else {
    windowState.value = 'closed';
  }
}

// ── Kawaii banana rain (easter egg) ──
function rainBananas() {
  const container = viewportWrap.value;
  if (!container) return;
  // Remove any existing banana first
  container.querySelector('.banana-drop')?.remove();
  const banana = document.createElement('span');
  banana.className = 'banana-drop';
  banana.textContent = '\u{1F34C}';
  banana.addEventListener('animationend', () => banana.remove());
  container.appendChild(banana);
}

// ── MS Paint Help menu (easter egg) ──
const paintHelpOpen = ref(false);

function closePaintHelp(e: MouseEvent) {
  // Close the help menu when clicking anywhere outside it
  if (paintHelpOpen.value) {
    paintHelpOpen.value = false;
  }
}

// ── Bubblegum tab switching (easter egg) ──
const bubbleTab = ref(0);

const bubbleIframeUrl = computed(() => {
  if (props.theme !== 'bubblegum' || bubbleTab.value === 0) return null;
  return 'https://www.blobbi.pet/';
});

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
}

function onCrtAnimationEnd() {
  if (crtState.value === 'shutting-down') {
    crtState.value = 'off';
  } else if (crtState.value === 'turning-on') {
    crtState.value = 'on';
  }
}

// ── Gamer Dino webxdc game (easter egg) ──
type DinoState = 'hidden' | 'loading' | 'ready';
const dinoState = ref<DinoState>('hidden');
const dinoWindowState = ref<WindowState>('minimized');
const dinoIframe = ref<HTMLIFrameElement | null>(null);
let dinoXdcBytes: ArrayBuffer | null = null;

function gamerMinimize() {
  windowState.value = 'minimized';
  // Show the Dino tab when minimizing the gamer window (first time triggers fetch)
  if (dinoState.value === 'hidden') {
    dinoState.value = 'loading';
    fetchDinoXdc();
  }
}

async function fetchDinoXdc() {
  try {
    const resp = await fetch('https://apps.testrun.org/arcanecircle-dino-v1.3.0.xdc');
    dinoXdcBytes = await resp.arrayBuffer();
    dinoState.value = 'ready';
  } catch (e) {
    console.error('Failed to fetch Dino xdc:', e);
    dinoState.value = 'ready'; // Still show iframe, it may work without init
  }
}

function onDinoIframeLoad() {
  // The iframe loaded; now wait for webxdc.ready via postMessage
}

function onWebxdcMessage(event: MessageEvent) {
  if (!dinoIframe.value || event.source !== dinoIframe.value.contentWindow) return;
  const msg = event.data;
  if (!msg || msg.jsonrpc !== '2.0') return;

  // Handle webxdc.ready notification
  if (msg.method === 'webxdc.ready') {
    if (dinoXdcBytes) {
      const xdc = dinoXdcBytes.slice(0); // copy for transfer
      dinoIframe.value!.contentWindow!.postMessage(
        {
          jsonrpc: '2.0',
          method: 'webxdc.init',
          params: {
            xdc,
            selfAddr: 'player@ditto.pub',
            selfName: 'Player',
            sendUpdateInterval: 1000,
            sendUpdateMaxSize: 128000,
          },
        },
        '*',
        [xdc],
      );
    }
    return;
  }

  // Handle requests (with id) — respond with simple acks
  if (msg.id !== undefined && msg.method) {
    const win = dinoIframe.value?.contentWindow;
    if (!win) return;
    switch (msg.method) {
      case 'webxdc.sendUpdate':
        win.postMessage({ jsonrpc: '2.0', id: msg.id, result: null }, '*');
        break;
      case 'webxdc.setUpdateListener':
        win.postMessage({ jsonrpc: '2.0', id: msg.id, result: null }, '*');
        break;
      case 'webxdc.getAllUpdates':
        win.postMessage({ jsonrpc: '2.0', id: msg.id, result: [] }, '*');
        break;
      case 'webxdc.sendToChat':
        win.postMessage({ jsonrpc: '2.0', id: msg.id, result: null }, '*');
        break;
      case 'webxdc.importFiles':
        win.postMessage({ jsonrpc: '2.0', id: msg.id, result: [] }, '*');
        break;
      default:
        win.postMessage({ jsonrpc: '2.0', id: msg.id, result: null }, '*');
        break;
    }
  }
}

// Reset all easter egg state when switching themes
watch(() => props.theme, () => {
  crtState.value = 'on';
  retroPageIndex.value = 0;
  bubbleTab.value = 0;
  paintHelpOpen.value = false;
  windowState.value = 'normal';
  showCloseConfirm.value = false;
  dinoState.value = 'hidden';
  dinoWindowState.value = 'minimized';
  dinoXdcBytes = null;
});

// ── Scroll forwarding ──
function onWheel(e: WheelEvent) {
  if (!viewport.value) return;
  // Don't forward scrolls when CRT is off or iframe is active
  if (props.theme === 'skater' && crtState.value !== 'on') return;
  if (retroActiveUrl.value || bubbleIframeUrl.value) return;
  // If the scroll didn't originate inside the viewport, forward it
  if (!viewport.value.contains(e.target as Node)) {
    viewport.value.scrollTop += e.deltaY;
  }
}

onMounted(() => {
  window.addEventListener('wheel', onWheel, { passive: true });
  window.addEventListener('click', closePaintHelp);
  window.addEventListener('message', onWebxdcMessage);
});
onUnmounted(() => {
  window.removeEventListener('wheel', onWheel);
  window.removeEventListener('click', closePaintHelp);
  window.removeEventListener('message', onWebxdcMessage);
});
</script>
