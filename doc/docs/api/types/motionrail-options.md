# MotionRailOptions

Configuration options for the carousel.

## Type Definition

```ts
type MotionRailOptions = {
  autoplay?: boolean;
  resumeDelay?: number;
  delay?: number;
  rtl?: boolean;
  onChange?: (state: MotionRailState) => void;
  breakpoints?: MotionRailBreakpoint[];
  extensions?: MotionRailExtension[];
  containerName?: string;
};
```

## Properties

### `autoplay`

Enable automatic scrolling through items.

- **Type:** `boolean`
- **Default:** `false`

```ts
const carousel = new MotionRail(element, {
  autoplay: true,
});
```

---

### `resumeDelay`

Milliseconds to wait before resuming autoplay after user interaction.

- **Type:** `number`
- **Default:** `3000`

```ts
const carousel = new MotionRail(element, {
  autoplay: true,
  resumeDelay: 5000, // Wait 5 seconds before resuming
});
```

---

### `delay`

Milliseconds between autoplay scrolls.

- **Type:** `number`
- **Default:** `3000`

```ts
const carousel = new MotionRail(element, {
  autoplay: true,
  delay: 4000, // Scroll every 4 seconds
});
```

---

### `rtl`

Enable right-to-left scrolling mode.

- **Type:** `boolean`
- **Default:** `false`

```ts
const carousel = new MotionRail(element, {
  rtl: true,
});
```

---

### `onChange`

Callback function triggered when carousel state changes.

- **Type:** `(state: MotionRailState) => void`
- **Default:** `undefined`

```ts
const carousel = new MotionRail(element, {
  onChange: (state) => {
    console.log("Visible items:", state.visibleItemIndexes);
    console.log("Total items:", state.totalItems);
    console.log("First visible:", state.isFirstItemVisible);
    console.log("Last visible:", state.isLastItemVisible);
  },
});
```

---

### `breakpoints`

Responsive breakpoint configurations.

- **Type:** [MotionRailBreakpoint](/docs/api/types/motionrail-breakpoint)[]
- **Default:** `undefined`

```ts
const carousel = new MotionRail(element, {
  breakpoints: [
    { columns: 1, gap: "16px" }, // Base: 1 column
    { width: 768, columns: 2, gap: "24px" }, // >= 768px: 2 columns
    { width: 1024, columns: 3, gap: "32px" }, // >= 1024px: 3 columns
  ],
});
```

---

### `containerName`

Unique CSS container name for scoping container queries and styles to a specific carousel instance. This prevents style leakage and enables FOUC-free (Flash of Unstyled Content) rendering, especially with SSR. If not provided, a random name is generated automatically.

- **Type:** `string`
- **Default:** Randomly generated

```ts
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

See [MotionRailBreakpoint](/docs/api/types/motionrail-breakpoint) and [Breakpoints Guide](/docs/breakpoints).

---

### `extensions`

Extension plugins to add functionality.

- **Type:** [MotionRailExtension](/docs/api/types/motionrail-extension)[]
- **Default:** `undefined`

```ts
import { Arrows } from "motionrail/extensions/arrows";
import { Dots } from "motionrail/extensions/dots";

const carousel = new MotionRail(element, {
  extensions: [Arrows(), Dots()],
});
```

See [MotionRailExtension](/docs/api/types/motionrail-extension) and [Extensions](/docs/extensions/).

## Complete Example

```ts
import { MotionRail } from "motionrail";
import { Arrows } from "motionrail/extensions/arrows";
import { Dots } from "motionrail/extensions/dots";
import "motionrail/style.css";
import "motionrail/extensions/arrows/style.css";
import "motionrail/extensions/dots/style.css";

const carousel = new MotionRail(document.getElementById("carousel"), {
  autoplay: true,
  delay: 4000,
  resumeDelay: 5000,
  rtl: false,
  onChange: (state) => {
    console.log("State changed:", state);
  },
  breakpoints: [
    { columns: 1, gap: "16px" },
    { width: 768, columns: 2, gap: "24px" },
    { width: 1024, columns: 3, gap: "32px" },
  ],
  extensions: [Arrows(), Dots({ dotSize: 48 })],
});
```

## Next Steps

- [MotionRailState](/docs/api/types/motionrail-state)
- [MotionRailBreakpoint](/docs/api/types/motionrail-breakpoint)
- [MotionRailExtension](/docs/api/types/motionrail-extension)
- [Configuration Guide](/docs/configuration)
