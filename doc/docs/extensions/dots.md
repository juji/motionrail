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
- **Default**: `44`

Size of each dot in pixels (controls the clickable area).

```js
Dots({ dotSize: 36 })
```

### `fontSize`

- **Type**: `number`
- **Default**: `14`

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

## Features

- **Clickable**: Click any dot to jump to that item
- **Active state**: Visual indicator for currently visible items
- **Scrollable**: Dots container scrolls when there are many items
- **Auto-center**: Active dot automatically scrolls into view
- **Accessible**: Proper ARIA labels for screen readers

## Styling

The extension applies the following default styles:

```css
.motionrail-dots {
  display: flex;
  gap: 8px;
  padding: 8px 12px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 24px;
  z-index: 10;
  max-width: calc(100% - 32px);
  margin: 16px auto 0;
  width: fit-content;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  position: relative;
  mask-image: linear-gradient(
    to right,
    transparent 0,
    black 12px,
    black calc(100% - 12px),
    transparent 100%
  );
}

.motionrail-dot {
  --dot-size: 44px;
  --dot-font-size: 14px;
  min-width: var(--dot-size);
  min-height: var(--dot-size);
  width: var(--dot-size);
  height: var(--dot-size);
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.5);
  background: rgba(255, 255, 255, 0.3);
  color: white;
  cursor: pointer;
  font-size: var(--dot-font-size);
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  flex-shrink: 0;
}

.motionrail-dot:hover {
  background: rgba(255, 255, 255, 0.5);
  border-color: rgba(255, 255, 255, 0.8);
  scale: 1.1;
}

.motionrail-dot:active {
  scale: 0.95;
}

.motionrail-dot-active {
  background: rgba(255, 255, 255, 0.9);
  border-color: white;
  color: #000;
}

.motionrail-dot-active:hover {
  background: white;
}
```

**Customization Tips:**
- Override `--dot-size` CSS variable to change dot dimensions
- Override `--dot-font-size` CSS variable to change index number size
- Modify `background`, `border`, and `color` for different themes
- Adjust `gap` and `padding` on `.motionrail-dots` for spacing
- Change `mask-image` gradient values to adjust edge fade effect
- Update `transition` and hover `scale` for different animation effects

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
