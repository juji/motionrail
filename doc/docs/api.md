# API Methods

MotionRail provides a comprehensive API for programmatic control of the carousel.

## Playback Control

### `play()`

Start autoplay scrolling.

```js
carousel.play();
```

::: tip
Autoplay must be enabled in options for this to work.
:::

### `pause()`

Pause autoplay scrolling.

```js
carousel.pause();
```

## Navigation

### `next()`

Navigate to the next page. Automatically pauses autoplay if enabled.

```js
carousel.next();
```

**Example with button:**
```js
document.getElementById('next-btn').addEventListener('click', () => {
  carousel.next();
});
```

### `prev()`

Navigate to the previous page. Automatically pauses autoplay if enabled.

```js
carousel.prev();
```

**Example with button:**
```js
document.getElementById('prev-btn').addEventListener('click', () => {
  carousel.prev();
});
```

### `scrollToIndex(index: number)`

Scroll to a specific item by its index (0-based). Automatically pauses autoplay if enabled.

```js
carousel.scrollToIndex(2);  // Scroll to the third item
```

**Example with pagination:**
```js
const dots = document.querySelectorAll('.dot');
dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    carousel.scrollToIndex(index);
  });
});
```

## State & Information

### `getState()`

Get the current carousel state.

**Returns:** `MotionRailState`

```js
const state = carousel.getState();
console.log(state.visibleItemIndexes);  // [0, 1, 2]
console.log(state.totalItems);          // 10
console.log(state.isFirstItemVisible);  // true
console.log(state.isLastItemVisible);   // false
```

**State object:**
```ts
interface MotionRailState {
  totalItems: number;              // Total number of items
  visibleItemIndexes: number[];    // Currently visible item indexes
  isFirstItemVisible: boolean;     // First item is visible
  isLastItemVisible: boolean;      // Last item is visible
}
```

### `getOptions()`

Get the current carousel configuration options. Returns a copy to prevent external modifications.

**Returns:** `MotionRailOptions`

```js
const options = carousel.getOptions();
console.log(options.autoplay);      // false
console.log(options.breakpoints);   // [{ columns: 1, gap: '16px' }, ...]
```

## Content Management

### `update()`

Refresh the carousel after dynamically adding or removing items from the DOM.

This method:
- Recounts total items
- Recaches snap points
- Re-observes edge items with IntersectionObserver
- Reapplies breakpoints
- Triggers onChange callback with updated state

```js
// Add items to the DOM
const grid = document.querySelector('[data-motionrail-grid]');
const newItem = document.createElement('div');
newItem.textContent = 'New Item';
grid.appendChild(newItem);

// Update carousel to recognize new items
carousel.update();
```

**Example: Dynamic add/remove**
```js
const addButton = document.getElementById('add-item');
const removeButton = document.getElementById('remove-item');
let itemCounter = 6;

addButton.addEventListener('click', () => {
  const grid = document.querySelector('[data-motionrail-grid]');
  const newItem = document.createElement('div');
  newItem.textContent = `Item ${itemCounter++}`;
  grid.appendChild(newItem);
  carousel.update();
});

removeButton.addEventListener('click', () => {
  const grid = document.querySelector('[data-motionrail-grid]');
  if (grid.children.length > 0) {
    grid.removeChild(grid.lastChild);
    carousel.update();
  }
});
```

::: tip Framework Users
Framework integrations (React, Solid, Vue, Svelte) automatically call `update()` when children change. You don't need to call it manually.
:::

## Lifecycle

### `destroy()`

Clean up event listeners, observers, and timers. Call this when removing the carousel from the DOM.

```js
carousel.destroy();
```

**Example: SPA cleanup**
```js
// Component unmount/cleanup
function cleanup() {
  if (carousel) {
    carousel.destroy();
    carousel = null;
  }
}
```

## Complete Example

```js
import { MotionRail } from 'motionrail';
import 'motionrail/style.css';

const carousel = new MotionRail(document.getElementById('carousel'), {
  autoplay: true,
  breakpoints: [
    { columns: 1, gap: '16px' },
    { width: 768, columns: 2, gap: '16px' }
  ],
  onChange: (state) => {
    // Update UI based on state
    updatePaginationDots(state);
    toggleNavigationButtons(state);
  }
});

// Playback controls
document.getElementById('play').addEventListener('click', () => {
  carousel.play();
});

document.getElementById('pause').addEventListener('click', () => {
  carousel.pause();
});

// Navigation
document.getElementById('prev').addEventListener('click', () => {
  carousel.prev();
});

document.getElementById('next').addEventListener('click', () => {
  carousel.next();
});

// Jump to specific item
document.querySelectorAll('.jump-button').forEach((btn, index) => {
  btn.addEventListener('click', () => {
    carousel.scrollToIndex(index);
  });
});

// Get current state
document.getElementById('get-state').addEventListener('click', () => {
  const state = carousel.getState();
  console.log('Current state:', state);
});

// Dynamic content
document.getElementById('add-item').addEventListener('click', () => {
  const grid = document.querySelector('[data-motionrail-grid]');
  const newItem = document.createElement('div');
  newItem.textContent = 'New Item';
  grid.appendChild(newItem);
  carousel.update();
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
  carousel.destroy();
});
```

## Method Chaining

Methods that don't return a value return `void`, so method chaining is not supported:

```js
// ❌ This won't work
carousel.pause().next().play();

// ✅ Do this instead
carousel.pause();
carousel.next();
carousel.play();
```

## Next Steps

- [Configuration](/docs/configuration) - All configuration options
- [Extensions](/docs/extensions/) - Extend functionality
- [Framework Integrations](/docs/frameworks/react) - Use with frameworks
