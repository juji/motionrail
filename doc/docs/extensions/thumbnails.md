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

The extension uses CSS classes you can customize:

```css
/* Thumbnails container */
.motionrail-thumbnails {
  /* Horizontal scrollable container */
}

/* Individual thumbnail button */
.motionrail-thumbnail {
  /* Your custom styles */
}

/* Active thumbnail (visible item) */
.motionrail-thumbnail-active {
  /* Active state styles */
}
```

## Example with Custom Sizes

```js
// Small thumbnails
Thumbnails({
  thumbnailWidth: 60,
  thumbnailHeight: 60
})

// Large thumbnails
Thumbnails({
  thumbnailWidth: 150,
  thumbnailHeight: 150
})
```

## Custom Styling

```css
.motionrail-thumbnail {
  border: 2px solid transparent;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
}

.motionrail-thumbnail-active {
  border-color: #007bff;
  box-shadow: 0 0 8px rgba(0, 123, 255, 0.5);
}

.motionrail-thumbnail:hover {
  border-color: #ccc;
}
```

## Next Steps

- [Dots Extension](/docs/extensions/dots) - Pagination dots
- [Arrows Extension](/docs/extensions/arrows) - Navigation arrows
- [Creating Custom Extensions](/docs/extensions/custom) - Build your own
