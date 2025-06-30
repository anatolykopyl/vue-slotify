# Slotify

This does the opposite of `propsify`. It turns all the props of a component into slots.

## Basic Example

Given a component that takes in it's content from it's props, `slotify` can make it take in the content from slots.

::: code-group

```vue [App.vue]
<script setup lang="ts">
import {slotify} from "vue-slotify"
import Badge from "./Badge.vue"
import PropsCard from "./PropsCard.vue"

const SlotifiedCard = slotify(PropsCard) // [!code highlight]
</script>

<template>
  <SlotifiedCard>
    <template #title>Card title</template>

    Hello <Badge type="warning">World</Badge>!

    <template #footer>
      <small>Card footer</small>
    </template>
  </SlotifiedCard>
</template>
```

```vue [PropsCard.vue]
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

### Output

<script setup lang="ts">
import PropsCard from "../components/PropsCard.vue"
import {slotify} from "../../lib"
</script>

<component 
  :is="slotify(PropsCard)" 
>
  <template #title>Card title</template>

  <template #body>
    Hello <Badge type="warning">World</Badge>!
  </template>

  <template #footer>
    <small>Card footer</small>
  </template>
</component>


## `slotToProp` Example

`slotify` accepts a function as its second parameter. It is used to get the prop to forward to, based on the slot name.
This is useful when working with existing components from other packages.

::: code-group
```vue [App.vue]
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

    Hello <Badge type="warning">World</Badge>!

    <template #footer>
      <small>Card footer</small>
    </template>
  </SlotifiedCard>
</template>
```

```vue [PropsCard.vue]
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

## SSR

For SSR usage `vue-slotify` exports `slotifySSR` with the same API as the normal `slotify` function.

```typescript
import { slotifySSR } from "vue-slotify"
const SlotifiedComponent = slotifySSR(Component)
```
