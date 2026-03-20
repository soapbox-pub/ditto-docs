<template>
  <div class="doc-theme-switcher" ref="root" v-if="isDocPage">
    <button
      class="doc-theme-btn"
      :class="{ 'is-open': isOpen }"
      @click="isOpen = !isOpen"
      :aria-label="isOpen ? 'Close doc theme picker' : 'Choose a doc theme'"
      :title="isOpen ? 'Close' : 'Change reading vibe'"
    >
      <span class="doc-theme-btn-icon">{{ currentTheme.emoji }}</span>
    </button>

    <Transition name="doc-theme-panel">
      <div v-if="isOpen" class="doc-theme-panel">
        <div class="doc-theme-panel-header">
          <span>Reading vibe</span>
          <button class="doc-theme-panel-close" @click="isOpen = false">&times;</button>
        </div>
        <div class="doc-theme-options">
          <button
            v-for="theme in themes"
            :key="theme.key"
            class="doc-theme-option"
            :class="[
              `doc-theme-option--${theme.key}`,
              { 'is-active': theme.key === activeKey }
            ]"
            @click="selectTheme(theme.key)"
          >
            <span class="doc-theme-option-emoji">{{ theme.emoji }}</span>
            <span class="doc-theme-option-label">{{ theme.label }}</span>
            <span class="doc-theme-option-desc">{{ theme.desc }}</span>
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { useRoute } from 'vitepress';

interface DocTheme {
  key: string;
  emoji: string;
  label: string;
  desc: string;
}

const themes: DocTheme[] = [
  { key: 'arcane', emoji: '🔮', label: 'Mystical & Arcane', desc: 'Sigils, gold & myth' },
  { key: 'warm', emoji: '📜', label: 'Warm & Textured', desc: 'Old-web parchment charm' },
  { key: 'celestial', emoji: '🌌', label: 'Dark & Celestial', desc: 'Deep space cosmic glow' },
  { key: 'pink', emoji: '🌸', label: 'Pink', desc: 'Soft blush, dreamy glow' },
];

const STORAGE_KEY = 'ditto-doc-theme';

const route = useRoute();
const isOpen = ref(false);
const root = ref<HTMLElement | null>(null);
const activeKey = ref('arcane');

const isDocPage = computed(() => {
  const path = route.path;
  return path !== '/' && path !== '';
});

const currentTheme = computed(() =>
  themes.find(t => t.key === activeKey.value) || themes[0]
);

// Store original dark mode state so we can restore it
let originalDarkMode: boolean | null = null;

function applyTheme(key: string) {
  const html = document.documentElement;

  // Save original dark mode state before first theme application
  if (originalDarkMode === null) {
    originalDarkMode = html.classList.contains('dark');
  }

  html.setAttribute('data-doc-theme', key);

  // Force appropriate color scheme for each theme
  if (key === 'celestial' || key === 'arcane' || key === 'pink') {
    html.classList.add('dark');
  } else {
    html.classList.remove('dark');
  }
}

function removeTheme() {
  const html = document.documentElement;
  html.removeAttribute('data-doc-theme');

  // Restore original dark mode state
  if (originalDarkMode !== null) {
    if (originalDarkMode) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
    originalDarkMode = null;
  }
}

function selectTheme(key: string) {
  activeKey.value = key;
  applyTheme(key);
  try { localStorage.setItem(STORAGE_KEY, key); } catch {}
  isOpen.value = false;
}

function onClickOutside(e: MouseEvent) {
  if (isOpen.value && root.value && !root.value.contains(e.target as Node)) {
    isOpen.value = false;
  }
}

// Apply theme on route change (SPA navigation)
watch(() => route.path, () => {
  if (isDocPage.value) {
    applyTheme(activeKey.value);
  } else {
    removeTheme();
  }
});

onMounted(() => {
  document.addEventListener('click', onClickOutside);
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && themes.some(t => t.key === saved)) {
      activeKey.value = saved;
    } else if (saved) {
      // Migrate stale keys (e.g. removed 'playful') to default
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch {}
  if (isDocPage.value) {
    applyTheme(activeKey.value);
  }
});

onUnmounted(() => {
  document.removeEventListener('click', onClickOutside);
  removeTheme();
});
</script>
