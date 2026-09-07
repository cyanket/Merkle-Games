<script setup lang="ts">
const colorMode = useColorMode()

function toggleColorMode() {
  colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <button
    class="theme-toggle"
    type="button"
    :aria-label="colorMode.preference === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
    :aria-pressed="colorMode.preference === 'dark'"
    @click="toggleColorMode"
  >
    {{ colorMode.preference === 'dark' ? 'Light mode' : 'Dark mode' }}
  </button>
</template>
