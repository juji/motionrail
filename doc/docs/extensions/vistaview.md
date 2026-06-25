# VistaView Lightbox Extension

Open carousel images in a full-screen lightbox. Powered by [VistaView](https://vistaview.jujiplay.com) — a zero-dependency image lightbox library.

## Installation

The extension requires both `motionrail` and `vistaview`:

```bash
npm install motionrail vistaview
```

## Usage

```js
import { MotionRail } from "motionrail";
import { VistaViewLightbox } from "motionrail/extensions/vistaview";
import "motionrail/style.css";

const carousel = new MotionRail(element, {
  extensions: [VistaViewLightbox()],
});
```

Your carousel items should use `<a>` tags wrapping `<img>` tags so VistaView can extract the full-size image URLs:

```html
<div data-motionrail>
  <div data-motionrail-scrollable>
    <div data-motionrail-grid>
      <div>
        <a href="photo-full.jpg">
          <img src="photo-thumb.jpg" alt="Photo 1" />
        </a>
      </div>
      <div>
        <a href="photo-full2.jpg">
          <img src="photo-thumb2.jpg" alt="Photo 2" />
        </a>
      </div>
    </div>
  </div>
</div>
```

Clicking a carousel item opens the lightbox at that image. Navigate with arrow keys, swipe gestures, or on-screen controls.

## Options

### `vistaViewOptions`

- **Type**: `Partial<VistaOpt>`
- **Default**: `{}`

Options passed directly to the VistaView constructor. See the [VistaView configuration docs](https://vistaview.jujiplay.com/core/configuration/complete) for all available options.

```js
VistaViewLightbox({
  vistaViewOptions: {
    maxZoomLevel: 3,
    preloads: 2,
    animationDurationBase: 400,
  },
});
```

### `selector`

- **Type**: `string`
- **Default**: `[data-motionrail-grid] > *`

CSS selector for carousel items. Only change if your carousel uses a non-standard structure.

```js
VistaViewLightbox({
  selector: ".carousel-item",
});
```

## Complete Example

```js
import { MotionRail } from "motionrail";
import { VistaViewLightbox } from "motionrail/extensions/vistaview";
import "motionrail/style.css";

const carousel = new MotionRail(document.getElementById("carousel"), {
  breakpoints: [
    { columns: 1, gap: "16px" },
    { width: 768, columns: 2, gap: "16px" },
    { width: 1024, columns: 3, gap: "20px" },
  ],
  extensions: [
    VistaViewLightbox({
      vistaViewOptions: {
        maxZoomLevel: 3,
        controls: {
          topRight: ["zoomIn", "zoomOut", "close"],
        },
      },
    }),
  ],
});
```

## How It Works

On init, the extension attaches click listeners to each carousel item. On click, it collects all image sources from the carousel (using `<a href>` for full-size URLs) and creates a VistaView instance. The lightbox opens at the clicked index.

If the lightbox is already open, clicking a different item navigates to it without recreating the instance.

## Next Steps

- [VistaView Documentation](https://vistaview.jujiplay.com) - Full lightbox docs
- [Creating Custom Extensions](/docs/extensions/custom) - Build your own
