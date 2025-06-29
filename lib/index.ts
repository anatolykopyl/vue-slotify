import { type Component, h, createApp, type Slot, createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'

const slotToStringClient = (slotVal: Slot): string => {
  const tempApp = createApp({ render: slotVal })
  const mountedApp = tempApp.mount(document.createElement('div'))
  const content = mountedApp.$el.parentNode.innerHTML
  tempApp.unmount()

  return content
}

const slotToStringServer = async (slotVal: Slot): Promise<string> => {
  const tempApp = createSSRApp({ render: slotVal })
  return renderToString(tempApp)
}

export const slotify = (
  component: Component,
  slotToProp = (slotName: string) => slotName
): Component => {
  return {
    setup(props, { slots }) {
      let slotProps = []
      if (slots) {
        const propsEntries = Object.entries(slots).map(([slotKey, slot]) => {
          if (!slot) return [slotToProp(slotKey), slot]
          return [slotToProp(slotKey), slotToStringClient(slot)]
        })

        slotProps = Object.fromEntries(propsEntries)
      }

      return () => h(component, {
        ...props,
        ...slotProps
      })
    }
  }
}

export const slotifySSR = (
  component: Component,
  slotToProp = (slotName: string) => slotName
): Component => {
  if ((process as any).client) return slotify(component, slotToProp)

  return {
    async setup(props, { slots }) {
      let slotProps = []
      if (slots) {
        const propsEntries = await Promise.all(Object.entries(slots).map(async ([slotKey, slot]) => {
          if (!slot) return [slotToProp(slotKey), slot]
          return [slotToProp(slotKey), await slotToStringServer(slot)]
        }))

        slotProps = Object.fromEntries(propsEntries)
      }

      return () => h(component, {
        ...props,
        ...slotProps
      })
    }
  }
}