# Quick Start

## Basic Setup

### 1. HTML Structure

Create the carousel HTML structure with the required data attributes:

```html
<div data-motionrail id="carousel">
  <div data-motionrail-scrollable>
    <div data-motionrail-grid>
      <div>Item 1</div>
      <div>Item 2</div>
      <div>Item 3</div>
      <div>Item 4</div>
      <div>Item 5</div>
    </div>
  </div>
</div>
```

**Structure layers:**
- `[data-motionrail]` - Wrapper element (receives the ID)
- `[data-motionrail-scrollable]` - Scrollable container with overflow and snap behavior
- `[data-motionrail-grid]` - Grid layout container
- Direct children - Carousel items (no specific class or attribute required)

### 2. Import Styles

```js
import 'motionrail/style.css';
```

### 3. Initialize the Carousel

```js
import { MotionRail } from 'motionrail';

const carousel = new MotionRail(document.getElementById('carousel'), {
  breakpoints: [
    { columns: 1, gap: '16px' },                    // Mobile (default)
    { width: 768, columns: 2, gap: '16px' },        // Tablet
    { width: 1024, columns: 3, gap: '20px' }        // Desktop
  ]
});
```

## With Autoplay

```js
const carousel = new MotionRail(document.getElementById('carousel'), {
  autoplay: true,
  delay: 3000,      // Auto-scroll every 3 seconds
  resumeDelay: 4000, // Resume after 4 seconds of inactivity
  breakpoints: [
    { columns: 1, gap: '16px' },
    { width: 768, columns: 2, gap: '16px' },
    { width: 1024, columns: 3, gap: '20px' }
  ]
});
```

## With Navigation Controls

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

<div class="controls">
  <button id="prev">Previous</button>
  <button id="next">Next</button>
</div>
```

```js
import { MotionRail } from 'motionrail';
import 'motionrail/style.css';

const carousel = new MotionRail(document.getElementById('carousel'), {
  breakpoints: [
    { columns: 1, gap: '16px' },
    { width: 768, columns: 2, gap: '16px' }
  ]
});

document.getElementById('prev').addEventListener('click', () => carousel.prev());
document.getElementById('next').addEventListener('click', () => carousel.next());
```

## Styling Items

```css
[data-motionrail] {
  height: 400px; /* Set carousel height */
}

[data-motionrail-grid] > * {
  /* Style your carousel items */
  background: #f0f0f0;
  border-radius: 8px;
  padding: 20px;
}
```

## Next Steps

- [Configuration](/docs/configuration) - Learn about all available options
- [Breakpoints](/docs/breakpoints) - Understand responsive configuration
- [API Methods](/docs/api) - Control the carousel programmatically
- [Extensions](/docs/extensions/) - Add arrows, dots, and more
