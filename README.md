# MotionRail

A lightweight, smooth carousel library with momentum-based scrolling, snap alignment, and responsive breakpoints.

## Features

- 🎯 **Momentum-based scrolling** - Natural drag physics with smooth animations
- 📱 **Responsive breakpoints** - Configure columns and gaps for different screen sizes
- ♿ **Snap alignment** - Automatic snap-to-item positioning
- 🔄 **Autoplay support** - Optional auto-scrolling with pause on interaction
- ↔️ **RTL support** - Built-in right-to-left layout support
- 🎨 **CSS Grid based** - Modern layout with customizable styling
- 🪶 **Lightweight** - Zero dependencies, minimal bundle size
- 🎮 **Full control API** - Programmatic navigation and playback control

## Installation

```bash
npm install motionrail
```

## Usage

### HTML Structure

```html
<div class="motion-rail" id="carousel">
  <div class="motion-rail-container">
    <div class="motion-rail-item">Item 1</div>
    <div class="motion-rail-item">Item 2</div>
    <div class="motion-rail-item">Item 3</div>
    <!-- Add more items -->
  </div>
</div>
```

### CSS Import

```js
import 'motionrail/style.css';
```

### JavaScript

```js
import { MotionRail } from 'motionrail';

const element = document.getElementById('carousel');

const carousel = new MotionRail(element, {
  autoplay: false,
  rtl: false,
  delay: 3000,      // Time between auto-scrolls (ms)
  resumeDelay: 4000,     // Time to resume after interaction (ms)
  breakpoints: [
    { columns: 1, gap: '16px' },                    // Mobile (default)
    { width: 768, columns: 2, gap: '16px' },        // Tablet
    { width: 1024, columns: 3, gap: '20px' }        // Desktop
  ]
});
```

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `autoplay` | `boolean` | `false` | Enable automatic scrolling |
| `rtl` | `boolean` | `false` | Enable right-to-left layout |
| `delay` | `number` | `3000` | Delay between auto-scrolls (milliseconds) |
| `resumeDelay` | `number` | `4000` | Time to resume autoplay after user interaction (milliseconds) |
| `breakpoints` | `MotionRailBreakpoint[]` | `[]` | Array of responsive breakpoint configurations |

### Breakpoint Configuration

Each breakpoint can specify:

| Property | Type | Description |
|----------|------|-------------|
| `width` | `number` (optional) | Maximum viewport width for this breakpoint |
| `columns` | `number` (optional) | Number of visible columns |
| `gap` | `string` (optional) | Gap between items (CSS value) |

**Important:** Breakpoints are applied mobile-first. Start with your default (no `width`), then add breakpoints with increasing `width` values.

**Example ordering:**
```js
breakpoints: [
  { columns: 1, gap: '12px' },                    // Default (mobile)
  { width: 768, columns: 2, gap: '16px' },        // Tablets
  { width: 1024, columns: 3, gap: '20px' }        // Desktop
]
```

## API Methods

### `play()`
Start autoplay scrolling.

```js
carousel.play();
```

### `pause()`
Pause autoplay scrolling.

```js
carousel.pause();
```

### `next()`
Navigate to the next page. Pauses autoplay.

```js
carousel.next();
```

### `prev()`
Navigate to the previous page. Pauses autoplay.

```js
carousel.prev();
```

### `scrollToIndex(index: number)`
Scroll to a specific item by index. Pauses autoplay.

```js
carousel.scrollToIndex(2); // Scroll to the third item
```

### `destroy()`
Clean up event listeners and timers.

```js
carousel.destroy();
```

## Examples

### Basic Carousel

```js
const carousel = new MotionRail(
  document.getElementById('carousel'),
  {
    breakpoints: [
      { columns: 1, gap: '16px' },                    // Mobile (default)
      { width: 768, columns: 2, gap: '16px' },        // Tablet
      { width: 1024, columns: 3, gap: '20px' }        // Desktop
    ]
  }
);
```

### Autoplay Carousel with RTL

```js
const carousel = new MotionRail(
  document.getElementById('carousel'),
  {
    autoplay: true,
    rtl: true,
    delay: 2500,      // Auto-scroll every 2.5 seconds
    resumeDelay: 4000,     // Resume after 4 seconds of inactivity
    breakpoints: [
      { columns: 1, gap: '16px' },
      { width: 768, columns: 2, gap: '16px' },
      { width: 1024, columns: 3, gap: '20px' }
    ]
  }
);
```

### Variable Columns (4 → 3 → 2 → 1)

```js
const carousel = new MotionRail(
  document.getElementById('carousel'),
  {
    breakpoints: [
      { columns: 1, gap: '12px' },                    // < 480px
      { width: 480, columns: 2, gap: '16px' },        // 480px - 768px
      { width: 768, columns: 3, gap: '20px' },        // 768px - 1024px
      { width: 1024, columns: 4, gap: '24px' }        // > 1024px
    ]
  }
);
```

### Fixed Layout (No Responsiveness)

```js
const carousel = new MotionRail(
  document.getElementById('carousel'),
  {
    breakpoints: [
      { columns: 2, gap: '20px' }  // Always 2 columns
    ]
  }
);
```

### With Navigation Controls

```html
<div class="motion-rail" id="carousel">
  <div class="motion-rail-container">
    <div class="motion-rail-item">Item 1</div>
    <div class="motion-rail-item">Item 2</div>
    <div class="motion-rail-item">Item 3</div>
  </div>
</div>

<div class="controls">
  <button id="prev">Previous</button>
  <button id="next">Next</button>
  <button id="play">Play</button>
  <button id="pause">Pause</button>
</div>
```

```js
const carousel = new MotionRail(
  document.getElementById('carousel'),
  {
    autoplay: true,
    breakpoints: [
      { columns: 1, gap: '16px' },
      { width: 768, columns: 2, gap: '16px' },
      { width: 1024, columns: 3, gap: '20px' }
    ]
  }
);

document.getElementById('prev').addEventListener('click', () => carousel.prev());
document.getElementById('next').addEventListener('click', () => carousel.next());
document.getElementById('play').addEventListener('click', () => carousel.play());
document.getElementById('pause').addEventListener('click', () => carousel.pause());
```

## Styling

The library includes base styles via `motionrail/style.css`. You can customize the appearance of items with your own CSS:

```css
.motion-rail {
  height: 400px; /* Set carousel height */
}

.motion-rail-item {
  /* Style your carousel items */
  background: #f0f0f0;
  border-radius: 8px;
  padding: 20px;
}
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Modern mobile browsers

Requires support for:
- CSS Grid
- Pointer Events API
- Container Queries
- Scroll Snap

## License

MIT
