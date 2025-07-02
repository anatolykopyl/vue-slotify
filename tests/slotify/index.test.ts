import { mount } from '@vue/test-utils'
import { expect, it } from 'vitest'
import { slotify } from '../../lib/slotify'
import PropsCard from './PropsCard.vue'

it('has same text', () => {
  const slotProps = {
    title: 'Title',
    body: 'Body',
    footer: 'Footer',
  }

  const original = mount(PropsCard, {
    props: slotProps,
  })

  const wrapped = mount(slotify(PropsCard), {
    slots: slotProps,
  })

  expect(original.text()).toBe(wrapped.text())
})

it('preserves props', () => {
  const original = mount(PropsCard, {
    props: {
      title: 'Title',
      body: 'Body',
      footer: 'Footer',
    },
  })

  const wrapped = mount(slotify(PropsCard), {
    props: {
      title: 'Title',
    },
    slots: {
      body: 'Body',
      footer: 'Footer',
    },
  })

  expect(original.text()).toBe(wrapped.text())
})
