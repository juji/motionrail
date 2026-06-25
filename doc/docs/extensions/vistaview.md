# VistaView Lightbox Extension

Open carousel images in a full-screen lightbox. Powered by [VistaView](https://vistaview.jujiplay.com) — a zero-dependency image lightbox library.

## Installation

The extension requires both `motionrail` and `vistaview`:

```bash
npm install motionrail vistaview
```

## Usage

Import the extension and VistaView's CSS:

```js
import { MotionRail } from "motionrail";
import { VistaViewLightbox } from "motionrail/extensions/vistaview";
import "motionrail/style.css";
import "vistaview/style.css";

const carousel = new MotionRail(element, {
  extensions: [VistaViewLightbox()],
});
```

Each grid item should contain an `<a>` wrapping an `<img>` so VistaView can extract the full-size image URL from the anchor's `href`:

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

Clicking a carousel item opens the lightbox at that image. Navigate with arrow keys, swipe gestures, or on-screen controls. After closing, clicking again re-opens the lightbox.

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
import "vistaview/style.css";

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

On init, the extension caches pointer start position on `pointerdown`. On `pointerup`, it compares the start and end position — if within 5px (a click, not a swipe), it finds which grid item's bounding box contains the pointer and opens a VistaView instance at that index.

The extension bypasses DOM event targeting entirely, working around MotionRail's `pointer-events: none` on grid items.

## Next Steps

- [VistaView Documentation](https://vistaview.jujiplay.com) - Full lightbox docs
- [Creating Custom Extensions](/docs/extensions/custom) - Build your own
