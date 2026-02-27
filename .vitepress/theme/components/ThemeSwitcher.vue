<template>
  <div class="theme-switcher">
    <!-- FAB button -->
    <button
      class="theme-fab"
      :class="{ 'is-open': isOpen }"
      @click="isOpen = !isOpen"
      :aria-label="isOpen ? 'Close theme picker' : 'Open theme picker'"
      :title="isOpen ? 'Close theme picker' : 'Choose a theme'"
    >
      <span class="theme-fab-icon">{{ isOpen ? '\u2715' : '\uD83C\uDFA8' }}</span>
    </button>

    <!-- Dropdown panel -->
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
