<script setup lang="ts">
import PropsCard from "./components/PropsCard.vue"
import {slotify} from "../lib/main"

const SlotifiedCard = slotify(PropsCard)
</script>

<template>
  <SlotifiedCard>
    <template #title>Card title</template>
    Hello <strong>World</strong>!
    <template #footer>
      <small>Card footer</small>
    </template>
  </SlotifiedCard>
</template>
