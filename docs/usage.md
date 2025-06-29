# Usage

## Install

::: code-group
```sh [npm]
npm install -D vue-slotify
```
```sh [yarn]
yarn add -D vue-slotify
```
```sh [pnpm]
pnpm add -D vue-slotify
```
```sh [bun]
bun add -D vue-slotify
```
:::

## Basic Example

Given a component that takes in it's content from it's props, `slotify` can make it take in the content from slots.

::: code-group
```vue
<script setup lang="ts">
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
```
:::

::: code-group
```vue
<script setup lang="ts">
import {slotify} from "vue-slotify"
import Badge from "./Badge.vue"
import PropsCard from "./PropsCard.vue"

const SlotifiedCard = slotify(PropsCard) // [!code highlight]
</script>

<template>
  <SlotifiedCard>
    <template #title>Card title</template>

    Hello <badge color="coral">World</badge>!

    <template #footer>
      <small>Card footer</small>
    </template>
  </SlotifiedCard>
</template>
```
:::

<script setup lang="ts">
import SlotifyCard from "./components/SlotifyCard.vue"
</script>

### Output

<SlotifyCard />


## `slotToProp` Example

`slotify` accepts a function as its second parameter. It is used to get the prop to forward to, based on the slot name.
This is useful when working with existing components from other packages.

::: code-group
```vue
<script setup lang="ts">
defineProps<{
  title: string
  body: string // [!code highlight]
  footer: string
}>()
</script>

<template>
  <div class="card">
    <h3 v-html="title"></h3>
    <div v-html="body"></div> <!-- [!code highlight] -->
    <div v-html="footer"></div>
  </div>
</template>
```
:::

::: code-group
```vue
<script setup lang="ts">
import {slotify} from "vue-slotify"
import Badge from "./Badge.vue"
import PropsCard from "./PropsCard.vue"

const SlotifiedCard = slotify(PropsCard, ((slotName) => {   // [!code highlight]
  if (slotName === 'default') return 'body'                 // [!code highlight]
  return slotName                                           // [!code highlight]
}))                                                         // [!code highlight]
</script>

<template>
  <SlotifiedCard>
    <template #title>Card title</template>

    Hello <badge color="coral">World</badge>!

    <template #footer>
      <small>Card footer</small>
    </template>
  </SlotifiedCard>
</template>
```
:::

## SSR

For SSR usage `vue-slotify` exports `slotifySSR` with the same API as the normal `slotify` function.

```typescript
import { slotifySSR } from "vue-slotify"
const SlotifiedComponent = slotifySSR(Component)
```
