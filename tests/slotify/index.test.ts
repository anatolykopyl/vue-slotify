import { mount } from '@vue/test-utils'
import { expect, it } from 'vitest'
import { slotify } from '../../lib/slotify'
import PropsCard from './PropsCard.vue'

it('slotify', () => {
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
