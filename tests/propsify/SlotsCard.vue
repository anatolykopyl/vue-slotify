<script setup lang="ts">
defineProps<{
  footer: string
}>()

defineSlots<{
  title: () => any
  body: () => any
}>()
</script>

<template>
  <div>
    <div><slot name="title" /></div>
    <div><slot name="body" /></div>
    <div>{{ footer }}</div>
  </div>
</template>
