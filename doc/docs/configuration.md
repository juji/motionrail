# Configuration

## Options Overview

```ts
interface MotionRailOptions {
  autoplay?: boolean;
  rtl?: boolean;
  delay?: number;
  resumeDelay?: number;
  breakpoints?: MotionRailBreakpoint[];
  onChange?: (state: MotionRailState) => void;
  extensions?: MotionRailExtension[];
  containerName?: string;
}
```

See [MotionRailOptions](/docs/api/types/motionrail-options) for complete type documentation.

## Core Options

### `autoplay`

- **Type**: `boolean`
- **Default**: `false`

Enable automatic scrolling through carousel items.

```js
const carousel = new MotionRail(element, {
  autoplay: true,
});
```

### `rtl`

- **Type**: `boolean`
- **Default**: `false`

Enable right-to-left layout support for RTL languages.

See [RTL Support](/docs/rtl) for detailed documentation and examples.

```js
const carousel = new MotionRail(element, {
  rtl: true,
});
```

### `delay`

- **Type**: `number`
- **Default**: `3000`

Delay between auto-scrolls in milliseconds. Only applies when `autoplay` is enabled.

```js
const carousel = new MotionRail(element, {
  autoplay: true,
  delay: 2500, // Auto-scroll every 2.5 seconds
});
```

### `resumeDelay`

- **Type**: `number`
- **Default**: `4000`

Time to wait before resuming autoplay after user interaction (in milliseconds).

```js
const carousel = new MotionRail(element, {
  autoplay: true,
  resumeDelay: 5000, // Resume after 5 seconds of inactivity
});
```

### `breakpoints`

- **Type**: [MotionRailBreakpoint](/docs/api/types/motionrail-breakpoint)[]
- **Default**: `[{ columns: 1, gap: "0px" }]`

Array of responsive breakpoint configurations. See [Breakpoints](/docs/breakpoints) for detailed documentation.

```js
const carousel = new MotionRail(element, {
  breakpoints: [
    { columns: 1, gap: "16px" }, // Mobile
    { width: 768, columns: 2, gap: "16px" }, // Tablet
    { width: 1024, columns: 3, gap: "20px" }, // Desktop
  ],
});
```

## Advanced Options

### `onChange`

- **Type**: `(state: MotionRailState) => void`
- **Default**: `undefined`

Callback function fired when carousel state changes (on scroll, resize, etc.). Receives [MotionRailState](/docs/api/types/motionrail-state) object.

```js
const carousel = new MotionRail(element, {
  onChange: (state) => {
    console.log("Visible items:", state.visibleItemIndexes);
    console.log("At start:", state.isFirstItemVisible);
    console.log("At end:", state.isLastItemVisible);
  },
});
```

**State object:**

```ts
interface MotionRailState {
  totalItems: number; // Total number of items in carousel
  visibleItemIndexes: number[]; // Array of currently visible item indexes
  isFirstItemVisible: boolean; // Whether the first item is visible
  isLastItemVisible: boolean; // Whether the last item is visible
}
```

See [MotionRailState](/docs/api/types/motionrail-state) for complete type documentation.

### `containerName`

Unique CSS container name for scoping container queries and styles to a specific carousel instance. This prevents style leakage and enables FOUC-free (Flash of Unstyled Content) rendering, especially with SSR. If not provided, a random name is generated automatically.

- **Type**: `string`
- **Default**: Randomly generated

```js
const { containerName, containerQueries } = MotionRail.getBreakPoints({
  breakpoints: [
    { columns: 1, gap: "16px" },
    { width: 768, columns: 2, gap: "24px" },
    { width: 1024, columns: 3, gap: "32px" },
  ],
  totalItems: 8,
  containerName: "my-carousel-container",
});

const carousel = new MotionRail(element, {
  breakpoints: [
    { columns: 1, gap: "16px" },
    { width: 768, columns: 2, gap: "24px" },
    { width: 1024, columns: 3, gap: "32px" },
  ],
  containerName: "my-carousel-container",
});
```

## Complete Example

```js
import { MotionRail } from "motionrail";
import { Arrows } from "motionrail/extensions/arrows";
import "motionrail/style.css";
import "motionrail/extensions/arrows/style.css";

// FOUC prevention: generate containerName and containerQueries for SSR
const { containerName, containerQueries } = MotionRail.getBreakPoints({
  breakpoints: [
    { columns: 1, gap: "12px" },
    { width: 480, columns: 2, gap: "16px" },
    { width: 768, columns: 3, gap: "20px" },
    { width: 1024, columns: 4, gap: "24px" },
  ],
  totalItems: 8,
  containerName: "my-carousel-container",
});

// Inject containerQueries into <head> for SSR/FOUC-free styling
// for true FOUC prevention, use SSR to inject:
// <style data-motionrail-style="${containerName}">${containerQueries}</style>
// See the Framework Integrations guide for real SSR examples

const carousel = new MotionRail(document.getElementById("carousel"), {
  autoplay: true,
  rtl: false,
  delay: 3000,
  resumeDelay: 4000,
  breakpoints: [
    { columns: 1, gap: "12px" },
    { width: 480, columns: 2, gap: "16px" },
    { width: 768, columns: 3, gap: "20px" },
    { width: 1024, columns: 4, gap: "24px" },
  ],
  containerName,
  onChange: (state) => {
    console.log("State updated:", state);
  },
  extensions: [Arrows({ loop: true })],
});
```

## Next Steps

- [Breakpoints](/docs/breakpoints) - Detailed breakpoint configuration
- [API Methods](/docs/api) - Control the carousel programmatically
- [Extensions](/docs/extensions/) - Add more functionality
