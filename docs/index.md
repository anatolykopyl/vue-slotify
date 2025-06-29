---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Vue Slotify"
  text: ""
  tagline: Make props-driven components slot-driven

---

# Example

Given a component that takes in it's content from it's props, `slotify` can make it take in the content from slots.

::: code-group

<<< @/components/PropsCard.vue

:::

::: code-group

<<< @/components/SlotifyCard.vue

:::

<script setup lang="ts">
import SlotifyCard from "./components/SlotifyCard.vue"
</script>

### Output

<SlotifyCard />
