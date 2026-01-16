# MotionRail

> ⚠️ **Not Ready for Production** - This library is currently in development and not yet ready for production use.

A lightweight, smooth carousel library with momentum-based scrolling, snap alignment, and responsive breakpoints. Works with vanilla JavaScript or your favorite framework.

## Features

- 🎯 Momentum-based scrolling with natural drag physics
- 📱 Responsive breakpoints for different screen sizes
- 🔄 Autoplay support with pause on interaction
- ↔️ RTL support built-in
- 🪶 Zero dependencies, minimal bundle size
- 🧩 Extension system (arrows, dots, thumbnails)
- ⚛️ Framework integrations (React, Solid, Vue, Svelte)

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
import { MotionRail } from 'motionrail';
import 'motionrail/style.css';

const carousel = new MotionRail(document.getElementById('carousel'), {
  breakpoints: [
    { columns: 1, gap: '16px' },
    { width: 768, columns: 2, gap: '16px' },
    { width: 1024, columns: 3, gap: '20px' }
  ]
});
```

### React

```jsx
import { MotionRail } from 'motionrail/react';
import 'motionrail/style.css';

function App() {
  return (
    <MotionRail options={{ breakpoints: [{ columns: 3, gap: '20px' }] }}>
      <div>Item 1</div>
      <div>Item 2</div>
      <div>Item 3</div>
    </MotionRail>
  );
}
```

### With Extensions

```js
import { MotionRail } from 'motionrail';
import { Arrows } from 'motionrail/extensions/arrows';
import { Dots } from 'motionrail/extensions/dots';
import 'motionrail/style.css';
import 'motionrail/extensions/arrows/style.css';
import 'motionrail/extensions/dots/style.css';

const carousel = new MotionRail(element, {
  breakpoints: [
    { columns: 1, gap: '16px' },
    { width: 768, columns: 2, gap: '16px' }
  ],
  extensions: [
    Arrows({ loop: true }),
    Dots({ showIndex: true })
  ]
});
```

### Autoplay Example

```js
const carousel = new MotionRail(element, {
  autoplay: true,
  delay: 3000,
  resumeDelay: 4000,
  breakpoints: [
    { columns: 1, gap: '16px' },
    { width: 768, columns: 2, gap: '16px' }
  ]
});
```

## Documentation

For complete documentation, API reference, and examples:

**[https://motionrail.jujiplay.com/](https://motionrail.jujiplay.com/)**

## License

MIT

---

[![Sponsor juji](https://img.shields.io/badge/sponsor-juji-ea4aaa?style=for-the-badge&logo=github)](https://github.com/sponsors/juji)