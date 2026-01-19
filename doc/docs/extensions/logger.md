# Logger Extension

Debug extension for logging carousel state and events.

## Usage

```js
import { MotionRail } from "motionrail";
import { Logger } from "motionrail/extensions/logger";
import "motionrail/style.css";

const carousel = new MotionRail(element, {
  extensions: [
    Logger({
      // Optional hooks
      onInit: (carousel, state) => {
        // custom logic on init
      },
      onUpdate: (carousel, state) => {
        // custom logic on update
      },
      onDestroy: (carousel, state) => {
        // custom logic on destroy
      },
      // Control console output (default: true)
      outputToConsole: true,
    }),
  ],
});
```

## Purpose

The Logger extension is a development tool that logs carousel state and lifecycle events to the console. It's useful for:

- **Debugging**: Understanding when events fire
- **State inspection**: Seeing current carousel state
- **Extension development**: Watching the lifecycle flow
- **Testing**: Verifying behavior changes

## API

```ts
Logger(options?: {
  onInit?: (carousel, state) => void;
  onUpdate?: (carousel, state) => void;
  onDestroy?: (carousel, state) => void;
  outputToConsole?: boolean; // default: true
}): MotionRailExtension
```

- **onInit**: Called after MotionRail initializes (after logging)
- **onUpdate**: Called after each state update (after logging)
- **onDestroy**: Called after MotionRail is destroyed (after logging)
- **outputToConsole**: Set to false to silence all logger output

### What It Logs

If `outputToConsole` is true, the logger outputs messages for all extension lifecycle hooks:

- `onInit`: When the carousel is initialized
- `onUpdate`: When the carousel state updates
- `onDestroy`: When the carousel is destroyed

### State Information

Each update logs the current state:

```js
{
  index: 0,           // Current slide index
  itemsCount: 5,      // Total number of items
  columns: 1,         // Columns per view
  gap: '16px',        // Gap between items
  isPlaying: true     // Autoplay status
}
```

## Example Output

```
[MotionRail Logger] onInit
[MotionRail Logger] onUpdate {
  index: 0,
  itemsCount: 5,
  columns: 1,
  gap: '16px',
  isPlaying: true
}
[MotionRail Logger] onUpdate {
  index: 1,
  itemsCount: 5,
  columns: 1,
  gap: '16px',
  isPlaying: true
}
```

## Complete Example

```js
import { MotionRail } from "motionrail";
import { Logger } from "motionrail/extensions/logger";
import "motionrail/style.css";

const carousel = new MotionRail(document.getElementById("carousel"), {
  autoplay: true,
  delay: 3000,
  breakpoints: [
    { minWidth: "0px", columns: 1 },
    { minWidth: "768px", columns: 2 },
  ],
  extensions: [
    Logger({
      outputToConsole: true,
      onUpdate: (carousel, state) => {
        // custom update logic
      },
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

<div data-motionrail id="carousel">
  <!-- carousel items -->
</div>

<script src="https://unpkg.com/motionrail@latest/dist/motionrail.umd.cjs"></script>
<script src="https://unpkg.com/motionrail@latest/dist/extensions/logger.umd.cjs"></script>
<script>
  const carousel = new MotionRail(document.getElementById("carousel"), {
    autoplay: true,
    delay: 3000,
    breakpoints: [
      { minWidth: "0px", columns: 1 },
      { minWidth: "768px", columns: 2 },
    ],
    extensions: [MotionRail.Logger()],
  });
</script>
```

## When to Use

### Development

Perfect for development when you need to:

- Verify event timing
- Debug state changes
- Understand carousel behavior
- Test responsive breakpoints

### Production

**Remove the logger in production** to avoid console clutter:

````js
const extensions = [];

// Only add logger in development
if (import.meta.env.DEV) {
  extensions.push(Logger());
}

const carousel = new MotionRail(element, {
  extensions,
});
// Or, silence output in production:
const carousel = new MotionRail(element, {
  extensions: [Logger({ outputToConsole: import.meta.env.DEV })],
});

## Conditional Loading

```js
// Only in development
const carousel = new MotionRail(element, {
  extensions: [process.env.NODE_ENV === "development" && Logger()].filter(
    Boolean,
  ),
});
````

## With Multiple Extensions

```js
import { Arrows } from "motionrail/extensions/arrows";
import { Dots } from "motionrail/extensions/dots";
import { Logger } from "motionrail/extensions/logger";

const carousel = new MotionRail(element, {
  extensions: [
    Arrows(),
    Dots(),
    Logger({ outputToConsole: true }), // Logs events from all extensions
  ],
});
```

## TypeScript

```ts
import { MotionRail } from "motionrail";
import { Logger } from "motionrail/extensions/logger";

const carousel = new MotionRail(element, {
  extensions: [Logger()],
});
```

## Next Steps

- [Creating Custom Extensions](/docs/extensions/custom) - Build your own extension
- [Extensions Overview](/docs/extensions/) - Understanding the extension API
- [API Reference](/docs/api) - Full API documentation
