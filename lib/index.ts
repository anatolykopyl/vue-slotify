import type { Component, SetupContext, VNode } from 'vue'
import { h } from 'vue'
import { slotToStringCSR, slotToStringSSR } from './slot-to-string'

type TShallowSetup = (props: any, { slots }: SetupContext) => (() => VNode) | Promise<() => VNode>

function makeSetupCSR(component: Component, slotToProp = (slotName: string) => slotName): TShallowSetup {
  return function (props: any, { slots }: SetupContext) {
    let slotProps = []
    if (slots) {
      const propsEntries = Object.entries(slots).map(([slotKey, slot]) => {
        if (!slot)
          return [slotToProp(slotKey), slot]
        return [slotToProp(slotKey), slotToStringCSR(slot)]
      })

      slotProps = Object.fromEntries(propsEntries)
    }

    return () => h(component, {
      ...props,
      ...slotProps,
    })
  }
}

function makeSetupSSR(component: Component, slotToProp = (slotName: string) => slotName): TShallowSetup {
  return async function (props: any, { slots }: SetupContext) {
    let slotProps = []
    if (slots) {
      const propsEntries = await Promise.all(Object.entries(slots).map(async ([slotKey, slot]) => {
        if (!slot)
          return [slotToProp(slotKey), slot]
        return [slotToProp(slotKey), await slotToStringSSR(slot)]
      }))

      slotProps = Object.fromEntries(propsEntries)
    }

    return () => h(component, {
      ...props,
      ...slotProps,
    })
  }
}

export function slotify(
  component: Component,
  slotToProp = (slotName: string) => slotName,
): Component {
  if ((import.meta as any).server) {
    return {
      setup: makeSetupSSR(component, slotToProp),
    }
  }

  return {
    setup: makeSetupCSR(component, slotToProp),
  }
}
