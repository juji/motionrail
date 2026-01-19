# MotionRail Class

The main carousel class that provides all functionality.

## Constructor

```ts
new MotionRail(element: HTMLElement, options?: MotionRailOptions)
```

**Parameters:**

- `element` - The HTML element that wraps the carousel
- `options` - Optional [MotionRailOptions](/docs/api/types/motionrail-options) configuration

**Returns:** MotionRail instance with all public methods

**Example:**

```ts
import { MotionRail } from "motionrail";
import "motionrail/style.css";

const carousel = new MotionRail(document.getElementById("carousel"), {
  autoplay: true,
  delay: 3000,
  breakpoints: [
    { columns: 1, gap: "16px" },
    { width: 768, columns: 2, gap: "24px" },
  ],
});
```

## Properties

### `element`

The root HTML element that wraps the carousel.

- **Type:** `HTMLElement`
- **Readonly:** Yes (enforced in TypeScript only)

```ts
const carousel = new MotionRail(document.getElementById("carousel"));
console.log(carousel.element); // <div id="carousel">...</div>
```

::: warning
Do not modify this property directly. It is managed internally by the carousel.
:::

---

### `scrollable`

The scrollable container element (the element with `data-motionrail-scrollable` attribute).

- **Type:** `HTMLElement`
- **Readonly:** Yes (enforced in TypeScript only)

```ts
const carousel = new MotionRail(document.getElementById("carousel"));
console.log(carousel.scrollable); // <div data-motionrail-scrollable>...</div>

// You can read scroll position
console.log(carousel.scrollable.scrollLeft);
```

::: warning
Do not modify this property directly. It is managed internally by the carousel.
:::

## Methods

### Playback Control

#### `play()`

Start autoplay scrolling.

```ts
play(): void
```

**Example:**

```ts
carousel.play();
```

::: tip
Autoplay must be enabled in options for this to work.
:::

---

#### `pause()`

Pause autoplay scrolling.

```ts
pause(): void
```

**Example:**

```ts
carousel.pause();
```

### Navigation

#### `next()`

Navigate to the next page. Automatically pauses autoplay if enabled.

```ts
next(): void
```

**Example:**

```ts
carousel.next();
```

---

#### `prev()`

Navigate to the previous page. Automatically pauses autoplay if enabled.

```ts
prev(): void
```

**Example:**

```ts
carousel.prev();
```

---

#### `scrollToIndex()`

Scroll to a specific item by its index (0-based). Automatically pauses autoplay if enabled.

```ts
scrollToIndex(index: number): void
```

**Parameters:**

- `index` - Zero-based index of the item to scroll to

**Example:**

```ts
carousel.scrollToIndex(2); // Scroll to the third item
```

### State & Information

#### `getState()`

Get the current carousel state.

```ts
getState(): MotionRailState
```

**Returns:** [MotionRailState](/docs/api/types/motionrail-state) object

**Example:**

```ts
const state = carousel.getState();
console.log(state.visibleItemIndexes); // [0, 1, 2]
console.log(state.totalItems); // 10
console.log(state.isFirstItemVisible); // true
console.log(state.isLastItemVisible); // false
```

---

#### `getOptions()`

Get the current carousel configuration options. Returns a copy to prevent external modifications.

```ts
getOptions(): MotionRailOptions
```

**Returns:** [MotionRailOptions](/docs/api/types/motionrail-options) object

**Example:**

```ts
const options = carousel.getOptions();
console.log(options.autoplay); // false
console.log(options.breakpoints); // [{ columns: 1, gap: '16px' }, ...]
```

### Content Management

#### `update()`

Refresh the carousel after dynamically adding or removing items from the DOM.

```ts
update(): void
```

This method:

- Recounts total items
- Recaches snap points
- Re-observes edge items with IntersectionObserver
- Reapplies breakpoints
- Triggers onChange callback with updated state

**Example:**

```ts
// Add items to the DOM
const grid = document.querySelector("[data-motionrail-grid]");
const newItem = document.createElement("div");
newItem.textContent = "New Item";
grid.appendChild(newItem);

// Update carousel to recognize new items
carousel.update();
```

::: tip Framework Users
Framework integrations (React, Solid, Vue, Svelte) automatically call `update()` when children change. You don't need to call it manually.
:::

### Lifecycle

#### `destroy()`

Clean up event listeners, observers, and timers. Call this when removing the carousel from the DOM.

```ts
destroy(): void
```

**Example:**

```ts
// Component unmount/cleanup
function cleanup() {
  if (carousel) {
    carousel.destroy();
    carousel = null;
  }
}
```

## Complete Example

```ts
import { MotionRail } from "motionrail";
import "motionrail/style.css";

const carousel = new MotionRail(document.getElementById("carousel"), {
  autoplay: true,
  breakpoints: [
    { columns: 1, gap: "16px" },
    { width: 768, columns: 2, gap: "16px" },
  ],
  onChange: (state) => {
    console.log("Visible items:", state.visibleItemIndexes);
  },
});

// Playback controls
document.getElementById("play").addEventListener("click", () => {
  carousel.play();
});

document.getElementById("pause").addEventListener("click", () => {
  carousel.pause();
});

// Navigation
document.getElementById("prev").addEventListener("click", () => {
  carousel.prev();
});

document.getElementById("next").addEventListener("click", () => {
  carousel.next();
});

// Jump to specific item
document.querySelectorAll(".jump-button").forEach((btn, index) => {
  btn.addEventListener("click", () => {
    carousel.scrollToIndex(index);
  });
});

// Get current state
const state = carousel.getState();
console.log("Current state:", state);

// Dynamic content
document.getElementById("add-item").addEventListener("click", () => {
  const grid = document.querySelector("[data-motionrail-grid]");
  const newItem = document.createElement("div");
  newItem.textContent = "New Item";
  grid.appendChild(newItem);
  carousel.update();
});

// Cleanup on page unload
window.addEventListener("beforeunload", () => {
  carousel.destroy();
});
```

## Next Steps

- [MotionRailOptions](/docs/api/types/motionrail-options) - Configuration options type
- [MotionRailState](/docs/api/types/motionrail-state) - State object type
- [Configuration](/docs/configuration) - All configuration options
- [Extensions](/docs/extensions/) - Extend functionality
