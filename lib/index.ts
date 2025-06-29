import type { Component, Slot } from 'vue'
import { createApp, createSSRApp, h } from 'vue'
import { renderToString } from 'vue/server-renderer'

function slotToStringClient(slotVal: Slot): string {
  const tempApp = createApp({ render: slotVal })
  const mountedApp = tempApp.mount(document.createElement('div'))
  const content = mountedApp.$el.parentNode.innerHTML
  tempApp.unmount()

  return content
}

async function slotToStringServer(slotVal: Slot): Promise<string> {
  const tempApp = createSSRApp(h(slotVal))
  return renderToString(tempApp)
}

export function slotify(
  component: Component,
  slotToProp = (slotName: string) => slotName,
): Component {
  return {
    setup(props, { slots }) {
      let slotProps = []
      if (slots) {
        const propsEntries = Object.entries(slots).map(([slotKey, slot]) => {
          if (!slot)
            return [slotToProp(slotKey), slot]
          return [slotToProp(slotKey), slotToStringClient(slot)]
        })

        slotProps = Object.fromEntries(propsEntries)
      }

      return () => h(component, {
        ...props,
        ...slotProps,
      })
    },
  }
}

export function slotifySSR(
  component: Component,
  slotToProp = (slotName: string) => slotName,
): Component {
  return {
    async setup(props, { slots }) {
      let slotProps = []
      if (slots) {
        const propsEntries = await Promise.all(Object.entries(slots).map(async ([slotKey, slot]) => {
          if (!slot)
            return [slotToProp(slotKey), slot]
          return [slotToProp(slotKey), await slotToStringServer(slot)]
        }))

        slotProps = Object.fromEntries(propsEntries)
      }

      return () => h(component, {
        ...props,
        ...slotProps,
      })
    },
  }
}
