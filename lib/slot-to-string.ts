import type { Slot } from 'vue'
import { createApp, createSSRApp, h } from 'vue'
import { renderToString } from 'vue/server-renderer'

export function slotToStringCSR(slotVal: Slot): string {
  const tempApp = createApp({ render: slotVal })
  const mountedApp = tempApp.mount(document.createElement('div'))
  const content = mountedApp.$el.parentNode.innerHTML
  tempApp.unmount()

  return content
}

export async function slotToStringSSR(slotVal: Slot): Promise<string> {
  const tempApp = createSSRApp(h(slotVal))
  return renderToString(tempApp)
}
