# Propsify

This does the opposite of `slotify`. It turns all the slots of a component into props.

## Basic Example

Given a component that takes in it's content from it's slots, `propsify` can make it take in the content from the props.

::: code-group
```vue [App.vue]
<script setup lang="ts">
import {propsify} from "vue-slotify"
import Badge from "./Badge.vue"
import SlotsCard from "./SlotsCard.vue"

const PropsifiedCard = slotify(SlotsCard) // [!code highlight]
</script>

<template>
  <PropsifiedCard
    title="Card title"
    body="Hello <strong>World</strong>!"
    :footer="'<small>Card footer</small>'"
  />
</template>
```

```vue [SlotsCard.vue]
<script setup lang="ts">
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

```
:::

### Output

<script setup lang="ts">
import {propsify} from "../../lib"
import SlotCard from "../components/SlotsCard.vue"
</script>

<component
  :is="propsify(SlotCard)"
  title="Card title"
  body='Hello <strong>World</strong>!'
  :footer="'<small>Card footer</small>'"
/>

## `slotToProp` Example

`propsify` accepts a function as its second parameter. It is used to get the slot to forward to, based on the prop name.
This is useful when working with existing components from other packages.
