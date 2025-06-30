import type { Component } from 'vue'
import { h } from 'vue'

export function propsify(
  component: Component,
  propToSlot = (propName: string) => propName,
): Component {
  return {
    setup(props, ctx) {
      const childrenEntries = Object.entries(ctx.attrs)
        .map(([attrKey, attrVal]) => [
          propToSlot(attrKey),
          () => h('div', { innerHTML: attrVal }),
        ])
      const children = Object.fromEntries(childrenEntries)

      return () => h(component, props, children)
    },
  }
}
