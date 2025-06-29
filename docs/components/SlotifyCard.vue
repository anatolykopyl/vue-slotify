<script setup lang="ts">
import { slotify } from '../../lib'
import Badge from './Badge.vue'
import PropsCard from './PropsCard.vue'

const SlotifiedCard = slotify(PropsCard, (propsKey) => {
  if (propsKey === 'default')
    return 'body'
  return propsKey
})
</script>

<template>
  <SlotifiedCard>
    <template #title>
      Card title
    </template>
    Hello <Badge color="var(--vp-c-yellow-soft)">
      World
    </Badge>!
    <template #footer>
      <small>Card footer</small>
    </template>
  </SlotifiedCard>
</template>
