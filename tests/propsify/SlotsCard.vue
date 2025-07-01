<script setup lang="ts">
defineSlots<{
  title: () => any
  body: () => any
  footer: () => any
}>()
</script>

<template>
  <div>
    <div><slot name="title" /></div>
    <div><slot name="body" /></div>
    <div><slot name="footer" /></div>
  </div>
</template>
