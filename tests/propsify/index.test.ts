import { mount } from '@vue/test-utils'
import { expect, it } from 'vitest'
import { propsify } from '../../lib/propsify'
import SlotsCard from './SlotsCard.vue'

it('propsify', () => {
  const slotProps = {
    title: 'Title',
    body: 'Body',
    footer: 'Footer',
  }

  const original = mount(SlotsCard, {
    slots: slotProps,
  })

  const wrapped = mount(propsify(SlotsCard), {
    props: slotProps,
  })

  expect(original.text()).toBe(wrapped.text())
})
