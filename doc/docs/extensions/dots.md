# Dots Extension

Add pagination dots indicator to your carousel.

## Usage

```js
import { MotionRail } from "motionrail";
import { Dots } from "motionrail/extensions/dots";
import "motionrail/style.css";
import "motionrail/extensions/dots/style.css";

const carousel = new MotionRail(element, {
  extensions: [Dots()],
});
```

## Options

### `showIndex`

- **Type**: `boolean`
- **Default**: `false`

Show item index numbers inside each dot.

```js
Dots({ showIndex: true });
```

### `log`

- **Type**: `boolean`
- **Default**: `false`

Enable console logging for debugging.

```js
Dots({ log: true });
```

## Complete Example

```js
import { MotionRail } from "motionrail";
import { Dots } from "motionrail/extensions/dots";
import "motionrail/style.css";
import "motionrail/extensions/dots/style.css";

const carousel = new MotionRail(document.getElementById("carousel"), {
  breakpoints: [
    { columns: 1, gap: "16px" },
    { width: 768, columns: 2, gap: "16px" },
  ],
  extensions: [Dots({ showIndex: true })],
});
```

### UMD (CDN)

```html
<link
  rel="stylesheet"
  href="https://unpkg.com/motionrail@latest/dist/style.css"
/>
<link
  rel="stylesheet"
  href="https://unpkg.com/motionrail@latest/dist/extensions/dots/style.css"
/>

<div data-motionrail id="carousel">
  <!-- carousel items -->
</div>

<script src="https://unpkg.com/motionrail@latest/dist/motionrail.umd.cjs"></script>
<script src="https://unpkg.com/motionrail@latest/dist/extensions/dots.umd.cjs"></script>
<script>
  const carousel = new MotionRail(document.getElementById("carousel"), {
    breakpoints: [
      { columns: 1, gap: "16px" },
      { width: 768, columns: 2, gap: "16px" },
    ],
    extensions: [MotionRailDots({ showIndex: true })],
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

The Dots extension uses CSS variables for easy customization. You can override these variables to match your design:

```css
.motionrail-dots {
  --dot-size: 34px; /* Size of each dot */
  --dot-font-size: 12px; /* Font size for index numbers */
  --dot-bg: rgba(128, 128, 128, 0.3); /* Dot background */
  --dot-bg-hover: rgba(128, 128, 128, 0.5); /* Dot hover background */
  --dot-bg-active: #666; /* Active dot background */
  --dot-bg-active-hover: #555; /* Active dot hover background */
  --dot-color: #999; /* Text color for index */
  --dot-color-active: #fff; /* Active dot text color */
}
```

### Example Customization

```css
/* Larger dots with different colors */
.motionrail-dots {
  --dot-size: 40px;
  --dot-font-size: 14px;
  --dot-bg: rgba(59, 130, 246, 0.3);
  --dot-bg-hover: rgba(59, 130, 246, 0.5);
  --dot-bg-active: #3b82f6;
  --dot-bg-active-hover: #2563eb;
  --dot-color: #60a5fa;
  --dot-color-active: #fff;
}
```

View the default styles: [/src/extensions/dots/style.css](https://github.com/juji/motionrail/blob/main/src/extensions/dots/style.css)

## Behavior

**Single Item:** Shows one active dot.

**Multiple Items:** All visible items have active dots.

**Many Items:** Dots container becomes scrollable, active dot auto-centers.

## With Index Numbers

```js
Dots({ showIndex: true });
```

The index is displayed inside each dot (1-based for users).

## Next Steps

- [Arrows Extension](/docs/extensions/arrows) - Add navigation arrows
- [Thumbnails Extension](/docs/extensions/thumbnails) - Thumbnail navigation
- [Creating Custom Extensions](/docs/extensions/custom) - Build your own
