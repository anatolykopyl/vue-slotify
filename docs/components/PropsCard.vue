<script setup lang="ts">
import './style.css'

defineProps<{
  title: string
  default: string
  footer: string
}>()
</script>

<template>
  <div class="card">
    <h3 v-html="title"></h3>
    <div v-html="default"></div>
    <div v-html="footer"></div>
  </div>
</template>
