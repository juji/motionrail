import { defineConfig, type DefaultTheme } from 'vitepress'
import fs from 'fs'
import path from 'path'

// Sidebar configuration
const sidebar: DefaultTheme.SidebarItem[] = [
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
      { text: 'RTL Support', link: '/docs/rtl' },
      { text: 'API Methods', link: '/docs/api' }
    ]
  },
  {
    text: 'Framework Integrations',
    items: [
      { text: 'React', link: '/docs/frameworks/react' },
      { text: 'Preact', link: '/docs/frameworks/preact' },
      { text: 'Solid.js', link: '/docs/frameworks/solid' },
      { text: 'Vue', link: '/docs/frameworks/vue' },
      { text: 'Svelte', link: '/docs/frameworks/svelte' },
      { text: 'Qwik', link: '/docs/frameworks/qwik' }
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
  },
  {
    text: 'API',
    items: [
      {
        text: 'Class',
        collapsed: false,
        items: [
          { text: 'MotionRail', link: '/docs/api/class/motionrail' }
        ]
      },
      {
        text: 'Types',
        collapsed: false,
        items: [
          { text: 'MotionRailOptions', link: '/docs/api/types/motionrail-options' },
          { text: 'MotionRailState', link: '/docs/api/types/motionrail-state' },
          { text: 'MotionRailBreakpoint', link: '/docs/api/types/motionrail-breakpoint' },
          { text: 'MotionRailExtension', link: '/docs/api/types/motionrail-extension' }
        ]
      }
    ]
  }
]

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "MotionRail",
  description: "A lightweight carousel library with momentum-based scrolling, snap alignment, and responsive breakpoints",
  
  buildEnd: async (config) => {
    const docsDir = path.join(config.srcDir, 'docs')
    const outDir = config.outDir
    
    // Extract all links from sidebar recursively
    const extractLinks = (items: DefaultTheme.SidebarItem[]): Array<{ text: string; link: string }> => {
      const links: Array<{ text: string; link: string }> = []
      for (const item of items) {
        if (item.link) {
          links.push({ text: item.text!, link: item.link })
        }
        if (item.items) {
          links.push(...extractLinks(item.items))
        }
      }
      return links
    }
    
    const allLinks = extractLinks(sidebar)
    
    // Generate .txt files from markdown docs
    for (const { link } of allLinks) {
      if (!link || link === '/docs/') continue
      
      // Handle directory index pages (ending with /)
      let mdPath = link.replace('/docs/', '')
      if (mdPath.endsWith('/')) {
        mdPath = mdPath + 'index.md'
      } else {
        mdPath = mdPath + '.md'
      }
      
      const txtName = mdPath.replace(/\//g, '-').replace('.md', '.txt')
      
      const srcPath = path.join(docsDir, mdPath)
      const destPath = path.join(outDir, txtName)
      
      if (fs.existsSync(srcPath)) {
        const content = fs.readFileSync(srcPath, 'utf-8')
        fs.writeFileSync(destPath, content)
      }
    }
    
    // Generate llms.txt dynamically from sidebar structure
    let docStructure = ''
    
    for (const section of sidebar) {
      if (!section.items) continue
      
      docStructure += `\n### ${section.text}\n`
      
      for (const item of section.items) {
        if (item.link && item.link !== '/docs/') {
          let mdPath = item.link.replace('/docs/', '')
          if (mdPath.endsWith('/')) {
            mdPath = mdPath + 'index.md'
          } else {
            mdPath = mdPath + '.md'
          }
          const txtName = mdPath.replace(/\//g, '-').replace('.md', '.txt')
          const description = item.text
          docStructure += `- **[${txtName}](./${txtName})** - ${description}\n`
        }
        
        // Handle nested items
        if (item.items) {
          for (const subItem of item.items) {
            if (subItem.link) {
              let mdPath = subItem.link.replace('/docs/', '')
              if (mdPath.endsWith('/')) {
                mdPath = mdPath + 'index.md'
              } else {
                mdPath = mdPath + '.md'
              }
              const txtName = mdPath.replace(/\//g, '-').replace('.md', '.txt')
              const description = subItem.text
              docStructure += `- **[${txtName}](./${txtName})** - ${description}\n`
            }
          }
        }
      }
    }
    
    const llmsTxt = `# MotionRail

> A lightweight, smooth carousel library with momentum-based scrolling

## Overview

MotionRail is a modern carousel library built with CSS Grid and vanilla JavaScript. It provides momentum-based scrolling, snap alignment, responsive breakpoints, and first-class framework integrations.

- Repository: https://github.com/juji/motionrail
- Documentation: https://motionrail.jujiplay.com
- License: MIT

## Documentation Structure
${docStructure}
## Key Features

- Momentum-based scrolling with natural drag physics
- Responsive breakpoints for different screen sizes
- Automatic snap-to-item positioning
- Optional autoplay with pause on interaction
- Built-in RTL layout support
- CSS Grid-based modern layout
- Zero dependencies, minimal bundle size
- Full control API for programmatic navigation
- Modular extension system
- Framework integrations for React, Preact, Solid, Vue, Svelte, and Qwik

## Quick Example

\`\`\`javascript
import MotionRail from 'motionrail';

const carousel = new MotionRail('.carousel', {
  columns: 3,
  gap: 16,
  snap: true
});
\`\`\`

## Contact & Support

- Issues: https://github.com/juji/motionrail/issues
- Discussions: https://github.com/juji/motionrail/discussions
`
    
    fs.writeFileSync(path.join(outDir, 'llms.txt'), llmsTxt)
  },
  
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    outline: [2, 4],  // Show h2, h3, and h4 in "On this page" navigation
    
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Docs', link: '/docs/' }
    ],

    sidebar,

    socialLinks: [
      { icon: 'github', link: 'https://github.com/juji/motionrail' }
    ]
  }
})
