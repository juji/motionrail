# Thumbnails Extension

Add thumbnail navigation to your carousel.

## Usage

```js
import { MotionRail } from "motionrail";
import { Thumbnails } from "motionrail/extensions/thumbnails";
import "motionrail/style.css";
import "motionrail/extensions/thumbnails/style.css";

const carousel = new MotionRail(element, {
  extensions: [Thumbnails()],
});
```

## Options

### `thumbnailWidth`

- **Type**: `number`
- **Default**: `80`

Width of each thumbnail in pixels.

```js
Thumbnails({ thumbnailWidth: 120 });
```

### `thumbnailHeight`

- **Type**: `number`
- **Default**: `80`

Height of each thumbnail in pixels.

```js
Thumbnails({ thumbnailHeight: 120 });
```

### `log`

- **Type**: `boolean`
- **Default**: `false`

Enable console logging for debugging.

```js
Thumbnails({ log: true });
```

## Complete Example

```js
import { MotionRail } from "motionrail";
import { Thumbnails } from "motionrail/extensions/thumbnails";
import "motionrail/style.css";
import "motionrail/extensions/thumbnails/style.css";

const carousel = new MotionRail(document.getElementById("carousel"), {
  breakpoints: [{ columns: 1, gap: "16px" }],
  extensions: [
    Thumbnails({
      thumbnailWidth: 100,
      thumbnailHeight: 100,
    }),
  ],
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
  href="https://unpkg.com/motionrail@latest/dist/extensions/thumbnails/style.css"
/>

<div data-motionrail id="carousel">
  <!-- carousel items -->
</div>

<script src="https://unpkg.com/motionrail@latest/dist/motionrail.umd.cjs"></script>
<script src="https://unpkg.com/motionrail@latest/dist/extensions/thumbnails.umd.cjs"></script>
<script>
  const carousel = new MotionRail(document.getElementById("carousel"), {
    breakpoints: [{ columns: 1, gap: "16px" }],
    extensions: [
      MotionRail.Thumbnails({
        thumbnailWidth: 100,
        thumbnailHeight: 100,
      }),
    ],
  });
</script>
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

View the default styles: [/src/extensions/thumbnails/style.css](https://github.com/juji/motionrail/blob/main/src/extensions/thumbnails/style.css)

## Next Steps

- [Dots Extension](/docs/extensions/dots) - Pagination dots
- [Arrows Extension](/docs/extensions/arrows) - Navigation arrows
- [Creating Custom Extensions](/docs/extensions/custom) - Build your own
