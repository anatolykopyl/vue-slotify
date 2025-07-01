<script setup lang="ts">
defineProps<{
  title: string
  body: string
  footer: string
}>()
</script>

<template>
  <div class="card">
    <h3 v-html="title" />
    <div v-html="body" />
    <div v-html="footer" />
  </div>
</template>
