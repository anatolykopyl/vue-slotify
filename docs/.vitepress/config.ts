import { defineConfig } from 'vitepress'
import { groupIconMdPlugin, groupIconVitePlugin } from 'vitepress-plugin-group-icons'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Vue Slotify',
  base: '/vue-slotify/',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/anatolykopyl/vue-slotify' },
      { icon: 'npm', link: 'https://www.npmjs.com/package/vue-slotify' },
    ],

    sidebar: [
      {
        text: 'Getting Started',
        link: '/guide/getting-started',
      },
      {
        text: 'Slotify',
        link: '/guide/slotify',
      },
      {
        text: 'Propsify',
        link: '/guide/propsify',
      },
    ],
  },
  markdown: {
    config(md) {
      md.use(groupIconMdPlugin)
    },
  },
  vite: {
    plugins: [
      groupIconVitePlugin() as never,
    ],
  },
})
