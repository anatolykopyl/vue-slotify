# Getting Started

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

## Example

::: code-group 
```vue [Slotify.vue]
<template>
  <component :is="slotify(PropsCard)">
    <template #title>Card title</template>

    <template #body>
      Hello <Badge type="warning">World</Badge>!
    </template>

    <template #footer>
      <small>Card footer</small>
    </template>
  </component>
</template>
```

<<< @/components/PropsCard.vue

```vue [Propsify.vue]
<template>
  <component
    :is="propsify(SlotsCard)"
    title="Card title"
    body="Hello <strong>World</strong>!"
    :footer="'<small>Card footer</small>'"
  />
</template>
```

<<< @/components/SlotsCard.vue
:::
