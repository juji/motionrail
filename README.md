# MotionRail

A lightweight, smooth carousel library with momentum-based scrolling, snap alignment, and responsive breakpoints. Works with vanilla JavaScript or your favorite framework.

## Features

- 🎯󠅅󠅞󠅢󠅙󠅦󠅑󠅜󠅕󠅔󠄐󠅣󠅝󠅟󠅟󠅤󠅘󠅞󠅕󠅣󠅣󠄐󠅑󠅞󠅔󠄐󠅓󠅟󠅞󠅤󠅢󠅟󠅜 **Momentum-based scrolling** - Natural drag physics with smooth animations
- 📱󠄵󠅖󠅖󠅟󠅢󠅤󠅜󠅕󠅣󠅣󠄐󠅢󠅕󠅣󠅠󠅟󠅞󠅣󠅙󠅦󠅕󠄐󠅜󠅑󠅩󠅟󠅥󠅤󠅣 **Responsive breakpoints** - Configure columns and gaps for different screen sizes
- ♿󠅀󠅢󠅕󠅓󠅙󠅣󠅙󠅟󠅞󠄐󠅣󠅞󠅑󠅠󠄐󠅑󠅜󠅙󠅗󠅞󠅝󠅕󠅞󠅤󠄜󠄐󠅑󠅜󠅧󠅑󠅩󠅣󠄐󠅠󠅕󠅢󠅖󠅕󠅓󠅤 **Snap alignment** - Automatic snap-to-item positioning
- 🔄󠄱󠅥󠅤󠅟󠅠󠅜󠅑󠅩󠄐󠅤󠅘󠅑󠅤󠄐󠅖󠅕󠅕󠅜󠅣󠄐󠅞󠅑󠅤󠅥󠅢󠅑󠅜 **Autoplay support** - Optional auto-scrolling with pause on interaction
- ↔️󠅂󠅄󠄼󠄐󠅣󠅥󠅠󠅠󠅟󠅢󠅤󠄜󠄐󠅞󠅟󠄐󠅓󠅟󠅝󠅠󠅢󠅟󠅝󠅙󠅣󠅕󠅣 **RTL support** - Built-in right-to-left layout support
- 🎨󠄽󠅟󠅔󠅕󠅢󠅞󠄐󠄳󠅃󠅃󠄐󠄷󠅢󠅙󠅔󠄐󠅝󠅑󠅣󠅤󠅕󠅢󠅩 **CSS Grid based** - Modern layout with customizable styling
- 🪶󠄽󠅙󠅞󠅙󠅝󠅑󠅜󠄜󠄐󠅥󠅜󠅤󠅢󠅑󠄝󠅜󠅙󠅗󠅘󠅤󠅧󠅕󠅙󠅗󠅘󠅤 **Lightweight** - Zero dependencies, minimal bundle size
- 🎮󠅄󠅟󠅤󠅑󠅜󠄐󠄱󠅀󠄹󠄐󠅓󠅟󠅞󠅤󠅢󠅟󠅜󠄜󠄐󠅞󠅟󠄐󠅜󠅙󠅝󠅙󠅤󠅣 **Full control API** - Programmatic navigation and playback control
- 🧩󠄵󠅨󠅤󠅕󠅞󠅣󠅙󠅟󠅞󠅣󠄐󠅖󠅟󠅢󠄐󠅕󠅞󠅔󠅜󠅕󠅣󠅣󠄐󠅠󠅟󠅣󠅣󠅙󠅒󠅙󠅜󠅙󠅤󠅙󠅕󠅣 **Extension system** - Modular architecture with built-in extensions
- ⚡󠅃󠅕󠅑󠅝󠅜󠅕󠅣󠅣󠄐󠅖󠅢󠅑󠅝󠅕󠅧󠅟󠅢󠅛󠄐󠅙󠅞󠅤󠅕󠅗󠅢󠅑󠅤󠅙󠅟󠅞 **Framework integrations** - React, Preact, Qwik, Solid, Vue, Svelte components

## Installation

```bash
npm install motionrail
```

## Quick Start

### Vanilla JavaScript

```html
<div data-motionrail id="carousel">
  <div data-motionrail-scrollable>
    <div data-motionrail-grid>
      <div>Item 1</div>
      <div>Item 2</div>
      <div>Item 3</div>
    </div>
  </div>
</div>
```

```js
import { MotionRail } from "motionrail";
import "motionrail/style.css";

const carousel = new MotionRail(document.getElementById("carousel"), {
  breakpoints: [
    { columns: 1, gap: "16px" },
    { width: 768, columns: 2, gap: "16px" },
    { width: 1024, columns: 3, gap: "20px" },
  ],
});
```

### React

```jsx
import { MotionRail } from "motionrail/react";
import "motionrail/style.css";

function App() {
  return (
    <MotionRail options={{ breakpoints: [{ columns: 3, gap: "20px" }] }}>
      <div>Item 1</div>
      <div>Item 2</div>
      <div>Item 3</div>
    </MotionRail>
  );
}
```

### With Extensions

```js
import { MotionRail } from "motionrail";
import { Arrows } from "motionrail/extensions/arrows";
import { Dots } from "motionrail/extensions/dots";
import "motionrail/style.css";
import "motionrail/extensions/arrows/style.css";
import "motionrail/extensions/dots/style.css";

const carousel = new MotionRail(element, {
  breakpoints: [
    { columns: 1, gap: "16px" },
    { width: 768, columns: 2, gap: "16px" },
  ],
  extensions: [Arrows({ loop: true }), Dots({ showIndex: true })],
});
```

### Autoplay Example

```js
const carousel = new MotionRail(element, {
  autoplay: true,
  delay: 3000,
  resumeDelay: 4000,
  breakpoints: [
    { columns: 1, gap: "16px" },
    { width: 768, columns: 2, gap: "16px" },
  ],
});
```

## Recent Updates

- **Docs site AI readiness** — llms.txt, llms-full.txt, MCP server, sitemap, robots.txt, `.well-known` discovery, Markdown-for-Agents middleware
- **AI Integration docs** — MCP Readiness and Markdown for Agents pages
- **Search** — VitePress local search enabled on docs site
- **Qwik fix** — pinned `@eslint/js` to resolve build incompatibility
- **Homepage redesign** — improved footer, agent discoverability links in hero

## AI Discovery

- [llms.txt](https://motionrail.jujiplay.com/llms.txt) — concise AI-friendly summary
- [llms-full.txt](https://motionrail.jujiplay.com/llms-full.txt) — full documentation for AI consumption
- `POST /mcp` — MCP server endpoint

  | Tool               | Description                      |
  | ------------------ | -------------------------------- |
  | `get_package_info` | Get package metadata and version |
  | `get_build_status` | Check CI build status            |
  | `search_docs`      | Search MotionRail documentation  |

## Documentation

For complete documentation, API reference, and examples:

**[https://motionrail.jujiplay.com/](https://motionrail.jujiplay.com/)**

## License

MIT

---

[![Sponsor juji](https://img.shields.io/badge/sponsor-juji-ea4aaa?style=for-the-badge&logo=github)](https://github.com/sponsors/juji)
