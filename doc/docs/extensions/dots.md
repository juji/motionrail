# Dots Extension

Add pagination dots indicator to your carousel.

## Installation

```bash
npm install motionrail
```

## Usage

```js
import { MotionRail } from 'motionrail';
import { Dots } from 'motionrail/extensions/dots';
import 'motionrail/style.css';
import 'motionrail/extensions/dots/style.css';

const carousel = new MotionRail(element, {
  extensions: [Dots()]
});
```

## Options

### `showIndex`

- **Type**: `boolean`
- **Default**: `false`

Show item index numbers inside each dot.

```js
Dots({ showIndex: true })
```

### `log`

- **Type**: `boolean`
- **Default**: `false`

Enable console logging for debugging.

```js
Dots({ log: true })
```

## Complete Example

```js
import { MotionRail } from 'motionrail';
import { Dots } from 'motionrail/extensions/dots';
import 'motionrail/style.css';
import 'motionrail/extensions/dots/style.css';

const carousel = new MotionRail(document.getElementById('carousel'), {
  breakpoints: [
    { columns: 1, gap: '16px' },
    { width: 768, columns: 2, gap: '16px' }
  ],
  extensions: [
    Dots({ showIndex: true })
  ]
});
```

## Features

- **Clickable**: Click any dot to jump to that item
- **Active state**: Visual indicator for currently visible items
- **Scrollable**: Dots container scrolls when there are many items
- **Auto-center**: Active dot automatically scrolls into view
- **Accessible**: Proper ARIA labels for screen readers

## Styling

The extension uses CSS classes you can customize:

```css
/* Dots container */
.motionrail-dots {
  /* Horizontal scrollable container */
}

/* Individual dot button */
.motionrail-dot {
  /* Your custom styles */
}

/* Active dot (visible item) */
.motionrail-dot-active {
  /* Active state styles */
}
```

## Behavior

### Single Item
Shows one active dot.

### Multiple Items
All visible items have active dots.

### Many Items
Dots container becomes scrollable, active dot auto-centers.

## Example with Custom Styles

```css
.motionrail-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #ccc;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.motionrail-dot-active {
  background: #333;
  transform: scale(1.2);
}

.motionrail-dot:hover {
  background: #999;
}
```

## With Index Numbers

```js
Dots({ showIndex: true })
```

The index is displayed inside each dot (1-based for users).

## Next Steps

- [Arrows Extension](/docs/extensions/arrows) - Add navigation arrows
- [Thumbnails Extension](/docs/extensions/thumbnails) - Thumbnail navigation
- [Creating Custom Extensions](/docs/extensions/custom) - Build your own
