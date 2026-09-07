<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  src?: string
  alt: string
  large?: boolean
}>()

const imageFailed = ref(false)
</script>

<template>
  <img
    v-if="!src || imageFailed"
    src="/fallback-image.jpg"
    :alt="`${alt} image unavailable`"
    :class="{ 'game-image--large': large }"
  >
  <img
    v-else
    :src="src"
    :alt="alt"
    :class="{ 'game-image--large': large }"
    @error="imageFailed = true"
  >
</template>
