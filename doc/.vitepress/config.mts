import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "MotionRail",
  description: "A lightweight carousel library with momentum-based scrolling, snap alignment, and responsive breakpoints",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Docs', link: '/docs/' }
    ],

    sidebar: [
      {
        text: 'Getting Started',
        items: [
          { text: 'Introduction', link: '/docs/' },
          { text: 'Installation', link: '/docs/installation' },
          { text: 'Quick Start', link: '/docs/quick-start' }
        ]
      },
      {
        text: 'Core Concepts',
        items: [
          { text: 'Configuration', link: '/docs/configuration' },
          { text: 'Breakpoints', link: '/docs/breakpoints' },
          { text: 'API Methods', link: '/docs/api' }
        ]
      },
      {
        text: 'Framework Integrations',
        items: [
          { text: 'React', link: '/docs/frameworks/react' },
          { text: 'Solid.js', link: '/docs/frameworks/solid' },
          { text: 'Vue', link: '/docs/frameworks/vue' },
          { text: 'Svelte', link: '/docs/frameworks/svelte' },
          { text: 'Svelte 5', link: '/docs/frameworks/svelte5' }
        ]
      },
      {
        text: 'Extensions',
        items: [
          { text: 'Overview', link: '/docs/extensions/' },
          { text: 'Arrows', link: '/docs/extensions/arrows' },
          { text: 'Dots', link: '/docs/extensions/dots' },
          { text: 'Thumbnails', link: '/docs/extensions/thumbnails' },
          { text: 'Logger', link: '/docs/extensions/logger' },
          { text: 'Creating Extensions', link: '/docs/extensions/custom' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/juji/motionrail' }
    ]
  }
})
