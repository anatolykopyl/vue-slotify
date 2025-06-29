<script setup lang="ts">
import './style.css'

defineProps<{
  title: string
  body: string
  footer: string
}>()
</script>

<template>
  <div class="card">
    <h3 v-html="title"></h3>
    <div v-html="body"></div>
    <div v-html="footer"></div>
  </div>
</template>
