<script setup lang="ts">
import Badge from "./Badge.vue"
import PropsCard from "./PropsCard.vue"
import {slotify} from "../../lib"

const SlotifiedCard = slotify(PropsCard, (propsKey) => {
  if (propsKey === 'default') return 'body'
  return propsKey
})
</script>

<template>
  <SlotifiedCard>
    <template #title>Card title</template>
    Hello <badge color="var(--vp-c-yellow-soft)">World</badge>!
    <template #footer>
      <small>Card footer</small>
    </template>
  </SlotifiedCard>
</template>
