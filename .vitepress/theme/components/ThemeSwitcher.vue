<template>
  <div class="theme-switcher">
    <!-- Navbar icon button -->
    <button
      class="theme-nav-btn"
      :class="{ 'is-open': isOpen }"
      @click="isOpen = !isOpen"
      :aria-label="isOpen ? 'Close theme picker' : 'Open theme picker'"
      :title="isOpen ? 'Close theme picker' : 'Choose a theme'"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="13.5" cy="6.5" r="2.5" />
        <circle cx="17.5" cy="10.5" r="2.5" />
        <circle cx="8.5" cy="7.5" r="2.5" />
        <circle cx="6.5" cy="12.5" r="2.5" />
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
      </svg>
    </button>

    <!-- Dropdown panel (opens downward) -->
    <Transition name="theme-panel">
      <div v-if="isOpen" class="theme-panel">
        <div class="theme-panel-header">Choose a vibe</div>
        <div class="theme-panel-grid">
          <button
            v-for="theme in allThemes"
            :key="theme.key"
            class="theme-option"
            :class="{ 'is-active': theme.key === currentThemeKey }"
            @click="selectTheme(theme.key)"
            :title="theme.label"
          >
            <div
              class="theme-option-swatch"
              :style="{
                background: hsl(theme.colors.background),
                borderColor: hsl(theme.colors.primary),
              }"
            >
              <span class="theme-option-emoji">{{ theme.emoji }}</span>
            </div>
            <span
              class="theme-option-label"
              :style="{ color: hsl(theme.colors.text) }"
            >{{ theme.label }}</span>
          </button>
        </div>
      </div>
    </Transition>

    <!-- Click-away overlay -->
    <div v-if="isOpen" class="theme-overlay" @click="isOpen = false" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { themes as allThemes, hslToCSS } from '../themes';

const props = defineProps<{
  currentThemeKey: string;
}>();

const emit = defineEmits<{
  (e: 'select', key: string): void;
}>();

const isOpen = ref(false);

function hsl(val: string): string {
  return hslToCSS(val);
}

function selectTheme(key: string) {
  emit('select', key);
  isOpen.value = false;
}
</script>
