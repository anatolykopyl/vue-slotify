import { type Component, computed, h, createApp } from 'vue'

export const slotify = (
  component: Component, 
  slotToProp = (slotName: string) => slotName
): Component => {
  return {
    setup(props, {slots}) {
      const childrenProps = computed(() => {
        if (!slots) return []

        return Object.fromEntries(Object.entries(slots).map(([slotKey, slotVal]) => {
          const tempApp = createApp({
            render: slotVal
          })

          const el = document.createElement('div');
          const mountedApp = tempApp.mount(el)

          return [slotToProp(slotKey), mountedApp.$el.parentNode.innerHTML]
        }))
      })

      console.log(childrenProps.value)

      return () => h(component, {
        ...props,
        ...childrenProps.value
      })
    }
  }
}
