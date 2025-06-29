<script setup lang="ts">
import Badge from "./Badge.vue"
import PropsCard from "./PropsCard.vue"
import {slotify} from "../../lib/main"

const SlotifiedCard = slotify(PropsCard)
</script>

<template>
  <SlotifiedCard>
    <template #title>Card title</template>
    Hello <badge>World</badge>!
    <template #footer>
      <small>Card footer</small>
    </template>
  </SlotifiedCard>
</template>
