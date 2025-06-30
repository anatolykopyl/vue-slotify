<script setup lang="ts">
import './style.css'

defineSlots<{
  title: () => any
  body: () => any
  footer: () => any
}>()
</script>

<template>
  <div class="card">
    <h3><slot name="title" /></h3>
    <div><slot name="body" /></div>
    <div><slot name="footer" /></div>
  </div>
</template>
