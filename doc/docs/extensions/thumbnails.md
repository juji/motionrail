# Thumbnails Extension

Add thumbnail navigation to your carousel.

## Installation

```bash
npm install motionrail
```

## Usage

```js
import { MotionRail } from 'motionrail';
import { Thumbnails } from 'motionrail/extensions/thumbnails';
import 'motionrail/style.css';
import 'motionrail/extensions/thumbnails/style.css';

const carousel = new MotionRail(element, {
  extensions: [Thumbnails()]
});
```

## Options

### `thumbnailWidth`

- **Type**: `number`
- **Default**: `80`

Width of each thumbnail in pixels.

```js
Thumbnails({ thumbnailWidth: 120 })
```

### `thumbnailHeight`

- **Type**: `number`
- **Default**: `80`

Height of each thumbnail in pixels.

```js
Thumbnails({ thumbnailHeight: 120 })
```

### `log`

- **Type**: `boolean`
- **Default**: `false`

Enable console logging for debugging.

```js
Thumbnails({ log: true })
```

## Complete Example

```js
import { MotionRail } from 'motionrail';
import { Thumbnails } from 'motionrail/extensions/thumbnails';
import 'motionrail/style.css';
import 'motionrail/extensions/thumbnails/style.css';

const carousel = new MotionRail(document.getElementById('carousel'), {
  breakpoints: [
    { columns: 1, gap: '16px' }
  ],
  extensions: [
    Thumbnails({
      thumbnailWidth: 100,
      thumbnailHeight: 100
    })
  ]
});
```

## Features

- **Cloned content**: Automatically clones carousel item content for thumbnails
- **Clickable**: Click any thumbnail to navigate to that item
- **Active state**: Visual indicator for currently visible items
- **Scrollable**: Thumbnail container scrolls when there are many items
- **Auto-center**: Active thumbnail automatically scrolls into view

## How It Works

The extension clones the content of each carousel item to create thumbnails. This works great for images and simple content.

```html
<div data-motionrail id="carousel">
  <div data-motionrail-scrollable>
    <div data-motionrail-grid>
      <div><img src="image1.jpg" /></div>
      <div><img src="image2.jpg" /></div>
      <div><img src="image3.jpg" /></div>
    </div>
  </div>
</div>
```

The extension creates thumbnails with the same images, scaled down.

## Styling

The extension applies the following default styles:

```css
.motionrail-thumbnails {
  --thumbnail-width: 80px;
  --thumbnail-height: 80px;
  display: flex;
  gap: 12px;
  padding: 12px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 8px;
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

.motionrail-thumbnail {
  min-width: var(--thumbnail-width);
  min-height: var(--thumbnail-height);
  width: var(--thumbnail-width);
  height: var(--thumbnail-height);
  border-radius: 4px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  flex-shrink: 0;
  overflow: hidden;
  padding: 0;
  position: relative;
}

.motionrail-thumbnail > * {
  width: 100% !important;
  height: 100% !important;
  border-radius: 0px !important;
}

.motionrail-thumbnail:hover {
  border-color: rgba(255, 255, 255, 0.6);
  scale: 1.05;
}

.motionrail-thumbnail:active {
  scale: 0.98;
}

.motionrail-thumbnail-active {
  border-color: white;
  border-width: 3px;
  scale: 1.1;
}

.motionrail-thumbnail-active:hover {
  border-color: white;
}
```

**Customization Tips:**
- Override `--thumbnail-width` and `--thumbnail-height` CSS variables to change thumbnail dimensions
- Modify `background`, `border`, and `border-radius` for different themes
- Adjust `gap` and `padding` on `.motionrail-thumbnails` for spacing
- Change `mask-image` gradient values to adjust edge fade effect
- Update `transition` and hover `scale` for different animation effects

## Next Steps

- [Dots Extension](/docs/extensions/dots) - Pagination dots
- [Arrows Extension](/docs/extensions/arrows) - Navigation arrows
- [Creating Custom Extensions](/docs/extensions/custom) - Build your own
