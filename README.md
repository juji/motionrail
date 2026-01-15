# MotionRail

> ⚠️ **Not Ready for Production** - This library is currently in development and not yet ready for production use.

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
- 🧩 **Extension system** - Modular architecture with built-in extensions (Arrows, Logger)

## Installation

```bash
npm install motionrail
```

## Quick Start

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

## Usage

### HTML Structure

```html
<div data-motion-rail id="carousel">
  <div data-motion-rail-scrollable>
    <div data-motion-rail-grid>
      <div>Item 1</div>
      <div>Item 2</div>
      <div>Item 3</div>
      <!-- Add more items -->
    </div>
  </div>
</div>
```

**Structure layers:**
- `[data-motion-rail]` - Wrapper element (receives the ID)
- `[data-motion-rail-scrollable]` - Scrollable container with overflow and snap behavior
- `[data-motion-rail-grid]` - Grid layout container
- Direct children - Carousel items (no specific class or attribute required)

### CSS Import

```js
import 'motionrail/style.css';
```

### JavaScript

```js
import { MotionRail } from 'motionrail';
// Import types if using TypeScript
import type { MotionRailOptions, MotionRailState, MotionRailBreakpoint } from 'motionrail';

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
| `breakpoints` | `MotionRailBreakpoint[]` | `[{ columns: 1, gap: "0px" }]` | Array of responsive breakpoint configurations (optional) |
| `onChange` | `(state: MotionRailState) => void` | `undefined` | Callback fired when carousel state changes (optional) |
| `extensions` | `MotionRailExtension[]` | `[]` | Array of extension instances (optional) |

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

**Note:** Breakpoints are optional. If omitted, a default single-column layout with no gap is used.

### State Management

The `onChange` callback receives a `MotionRailState` object whenever the carousel state changes:

```typescript
interface MotionRailState {
  totalItems: number;              // Total number of items in carousel
  visibleItemIndexes: number[];    // Array of currently visible item indexes
  isFirstItemVisible: boolean;     // Whether the first item is visible
  isLastItemVisible: boolean;      // Whether the last item is visible
}
```

**Example:**
```js
const carousel = new MotionRail(element, {
  breakpoints: [
    { columns: 1, gap: '16px' },
    { width: 768, columns: 2, gap: '16px' }
  ],
  onChange: (state) => {
    console.log('Visible items:', state.visibleItemIndexes);
    console.log('At start:', state.isFirstItemVisible);
    console.log('At end:', state.isLastItemVisible);
  }
});
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

### `getState()`
Get the current carousel state.

```js
const state = carousel.getState();
console.log(state.visibleItemIndexes); // [0, 1, 2]
```

### `getOptions()`
Get the current carousel configuration options. Returns a copy to prevent external modifications.

```js
const options = carousel.getOptions();
console.log(options.autoplay); // false
console.log(options.breakpoints); // [{ columns: 1, gap: '16px' }, ...]
```

### `update()`
Refresh the carousel after dynamically adding or removing items from the DOM. This method:
- Recounts total items
- Recaches snap points
- Re-observes edge items with IntersectionObserver
- Reapplies breakpoints
- Triggers onChange callback with updated state

```js
// Add items to the DOM
const grid = document.querySelector('[data-motion-rail-grid]');
const newItem = document.createElement('div');
newItem.textContent = 'New Item';
grid.appendChild(newItem);

// Update carousel to recognize new items
carousel.update();
```

### `destroy()`
Clean up event listeners and timers.

```js
car

## Extensions

MotionRail supports a modular extension system that allows you to add functionality without bloating the core library.

### Built-in Extensions

#### Arrow Navigation

Add previous/next navigation arrows to your carousel.

```js
import { MotionRail } from 'motionrail';
import { Arrows } from 'motionrail/extensions/arrows';
import 'motionrail/style.css';
import 'motionrail/extensions/arrows/style.css';

const carousel = new MotionRail(element, {
  breakpoints: [
    { columns: 1, gap: '16px' },
    { width: 768, columns: 2, gap: '16px' }
  ],
  extensions: [
    Arrows({
      loop: true,              // Enable/disable arrows at edges (default: true)
      leftIcon: '<svg>...</svg>',   // Custom left arrow HTML (optional)
      rightIcon: '<svg>...</svg>',  // Custom right arrow HTML (optional)
      log: false               // Enable console logging (default: false)
    })
  ]
});
```

**Arrow Options:**
- `loop` (boolean, default: `true`) - When `false`, arrows are disabled at carousel edges
- `leftIcon` (string, optional) - HTML string for left arrow icon
- `rightIcon` (string, optional) - HTML string for right arrow icon
- `log` (boolean, default: `false`) - Enable debug logging

**Features:**
- Automatically hides when all items are visible
- RTL-aware (swaps navigation direction)
- Customizable icons (SVG or text)
- Disabled state styling when `loop: false`

#### Logger Extension

Debug extension that logs lifecycle events to console.

```js
import { MotionRail } from 'motionrail';
import { Logger } from 'motionrail/extensions/logger';

const carousel = new MotionRail(element, {
  extensions: [Logger()]
});
```

Logs:
- Initialization with initial state
- State updates on scroll/resize
- Destruction cleanup

### Creating Custom Extensions

Extensions follow a simple lifecycle API:

```typescript
interface MotionRailExtension {
  name: string;
  onInit?: (motionRail: MotionRail, state: MotionRailState) => void;
  onUpdate?: (motionRail: MotionRail, state: MotionRailState) => void;
  onDestroy?: (motionRail: MotionRail, state: MotionRailState) => void;
}
```

**Example - Custom Page Indicator:**

```js
function PageIndicator() {
  let indicators;
  
  return {
    name: "PageIndicator",
    
    onInit(motionRail, state) {
      // Create indicator dots
      indicators = document.createElement('div');
      indicators.className = 'carousel-indicators';
      
      for (let i = 0; i < state.totalItems; i++) {
        const dot = document.createElement('button');
        dot.addEventListener('click', () => motionRail.scrollToIndex(i));
        indicators.appendChild(dot);
      }
      
      motionRail.element.appendChild(indicators);
    },
    
    onUpdate(motionRail, state) {
      // Update active indicator
      const dots = indicators.querySelectorAll('button');
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', state.visibleItemIndexes.includes(i));
      });
    },
    
    onDestroy() {
      // Clean up
      indicators.remove();
    }
  };
}

// Use it
const carousel = new MotionRail(element, {
  extensions: [PageIndicator()]
});
```

**Lifecycle Hooks:**
- `onInit(motionRail, state)` - Called once when carousel initializes
- `onUpdate(motionRail, state)` - Called whenever carousel state changes
- `onDestroy(motionRail, state)` - Called when carousel is destroyed

**Extension State Access:**
Both hooks receive:
- `motionRail` - Full API access (methods, element, getOptions())
- `state` - Current carousel state (totalItems, visibleItemIndexes, etc.)

## UMD/CommonJS Usage

For non-module environments or CommonJS:

```html
<script src="node_modules/motionrail/dist/motionrail.umd.cjs"></script>
<script src="node_modules/motionrail/dist/extensions/arrows.umd.cjs"></script>
<link rel="stylesheet" href="node_modules/motionrail/dist/style.css">
<link rel="stylesheet" href="node_modules/motionrail/dist/extensions/arrows/style.css">

<script>
  const carousel = new MotionRail.MotionRail(element, {
    extensions: [MotionRailArrows.Arrows()]
  });
</script>
```

Or with CommonJS:

```js
const { MotionRail } = require('motionrail');
const { Arrows } = require('motionrail/extensions/arrows');
```ousel.destroy();
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
<div data-motion-rail id="carousel">
  <div data-motion-rail-scrollable>
    <div data-motion-rail-grid>
      <div>Item 1</div>
      <div>Item 2</div>
      <div>Item 3</div>
    </div>
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

### Dynamic Content

```html
<div data-motion-rail id="carousel">
  <div data-motion-rail-scrollable>
    <div data-motion-rail-grid id="carousel-grid">
      <div>Item 1</div>
      <div>Item 2</div>
      <div>Item 3</div>
    </div>
  </div>
</div>

<button id="add-item">Add Item</button>
<button id="remove-item">Remove Item</button>
```

```js
const carousel = new MotionRail(
  document.getElementById('carousel'),
  {
    breakpoints: [
      { columns: 1, gap: '16px' },
      { width: 768, columns: 2, gap: '16px' }
    ]
  }
);

let itemCounter = 4;
document.getElementById('add-item').addEventListener('click', () => {
  const grid = document.getElementById('carousel-grid');
  const newItem = document.createElement('div');
  newItem.textContent = `Item ${itemCounter++}`;
  grid.appendChild(newItem);
  carousel.update(); // Refresh carousel after adding items
});

document.getElementById('remove-item').addEventListener('click', () => {
  const grid = document.getElementById('carousel-grid');
  if (grid.children.length > 0) {
    grid.removeChild(grid.lastChild);
    carousel.update(); // Refresh carousel after removing items
  }
});
```

## Styling

The library includes base styles via `motionrail/style.css`. You can customize the appearance of items with your own CSS:

```css
[data-motion-rail] {
  height: 400px; /* Set carousel height */
}

[data-motion-rail-grid] > * {
  /* Style your carousel items */
  background: #f0f0f0;
  border-radius: 8px;
  padding: 20px;
  scroll-snap-align: start; /* Enable snap behavior */
}
```

**Key selectors:**
- `[data-motion-rail]` - Wrapper element
- `[data-motion-rail-scrollable]` - Scrollable container (has overflow and snap type)
- `[data-motion-rail-grid]` - Grid layout container
- `[data-motion-rail-grid] > *` - Direct children (carousel items)

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
- IntersectionObserver API
- ResizeObserver API

## License

MIT
