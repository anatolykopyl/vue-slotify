import { mount } from '@vue/test-utils'
import { expect, it } from 'vitest'
import { propsify } from '../../lib/propsify'
import SlotsCard from './SlotsCard.vue'

it('has same text', () => {
  const slotProps = {
    title: 'Title',
    body: 'Body',
  }

  const original = mount(SlotsCard, {
    slots: slotProps,
  })

  const wrapped = mount(propsify(SlotsCard), {
    props: slotProps,
  })

  expect(original.text()).toBe(wrapped.text())
})

it('preserves unrelated props', () => {
  const slotProps = {
    title: 'Title',
    body: 'Body',
  }

  const original = mount(SlotsCard, {
    slots: slotProps,
    props: {
      footer: 'Footer',
    },
  })

  const wrapped = mount(propsify(SlotsCard), {
    props: {
      footer: 'Footer',
      ...slotProps,
    },
  })

  expect(original.text()).toBe(wrapped.text())
})
