# Dots Extension

Add pagination dots indicator to your carousel.

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

### `dotSize`

- **Type**: `number`
- **Default**: `34`

Size of each dot in pixels (controls the clickable area).

```js
Dots({ dotSize: 36 })
```

### `fontSize`

- **Type**: `number`
- **Default**: `12`

Font size in pixels for the index numbers (when `showIndex: true`).

```js
Dots({ showIndex: true, fontSize: 16 })
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

### UMD (CDN)

```html
<link rel="stylesheet" href="https://unpkg.com/motionrail@latest/dist/style.css">
<link rel="stylesheet" href="https://unpkg.com/motionrail@latest/dist/extensions/dots/style.css">

<div data-motionrail id="carousel">
  <!-- carousel items -->
</div>

<script src="https://unpkg.com/motionrail@latest/dist/motionrail.umd.cjs"></script>
<script src="https://unpkg.com/motionrail@latest/dist/extensions/dots.umd.cjs"></script>
<script>
  const carousel = new MotionRail(document.getElementById('carousel'), {
    breakpoints: [
      { columns: 1, gap: '16px' },
      { width: 768, columns: 2, gap: '16px' }
    ],
    extensions: [
      MotionRailDots({ showIndex: true })
    ]
  });
</script>
```

## Features

- **Clickable**: Click any dot to jump to that item
- **Active state**: Visual indicator for currently visible items
- **Scrollable**: Dots container scrolls when there are many items
- **Auto-center**: Active dot automatically scrolls into view
- **Accessible**: Proper ARIA labels for screen readers

## Styling

View the default styles: [/src/extensions/dots/style.css](https://github.com/juji/motionrail/blob/main/src/extensions/dots/style.css)

## Behavior

**Single Item:** Shows one active dot.

**Multiple Items:** All visible items have active dots.

**Many Items:** Dots container becomes scrollable, active dot auto-centers.

## With Index Numbers

```js
Dots({ showIndex: true })
```

The index is displayed inside each dot (1-based for users).

## Next Steps

- [Arrows Extension](/docs/extensions/arrows) - Add navigation arrows
- [Thumbnails Extension](/docs/extensions/thumbnails) - Thumbnail navigation
- [Creating Custom Extensions](/docs/extensions/custom) - Build your own
