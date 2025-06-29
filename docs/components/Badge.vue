<script setup lang="ts">
defineProps<{
  color: string
}>()
</script>

<template>
  <span
    class="badge"
    :style="{
      backgroundColor: color,
    }"
  >
    <slot />
  </span>
</template>

<style scoped>
.badge {
  padding: 2px 8px;
  border-radius: 8px;
}
</style>
