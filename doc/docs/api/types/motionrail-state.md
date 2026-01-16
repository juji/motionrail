# MotionRailState

Current state of the carousel.

## Type Definition

```ts
type MotionRailState = {
  totalItems: number;
  visibleItemIndexes: number[];
  isFirstItemVisible: boolean;
  isLastItemVisible: boolean;
}
```

## Properties

### `totalItems`

Total number of items in the carousel.

- **Type:** `number`

```ts
const state = carousel.getState();
console.log(state.totalItems);  // 10
```

---

### `visibleItemIndexes`

Array of currently visible item indexes (0-based).

- **Type:** `number[]`

```ts
const state = carousel.getState();
console.log(state.visibleItemIndexes);  // [0, 1, 2]
```

This array updates as the user scrolls and items enter/exit the viewport.

---

### `isFirstItemVisible`

Whether the first item is currently visible.

- **Type:** `boolean`

```ts
const state = carousel.getState();
console.log(state.isFirstItemVisible);  // true

// Use for disabling "previous" button
const prevButton = document.querySelector('.prev-button');
prevButton.disabled = state.isFirstItemVisible;
```

---

### `isLastItemVisible`

Whether the last item is currently visible.

- **Type:** `boolean`

```ts
const state = carousel.getState();
console.log(state.isLastItemVisible);  // false

// Use for disabling "next" button
const nextButton = document.querySelector('.next-button');
nextButton.disabled = state.isLastItemVisible;
```

## Usage

### Getting Current State

Use the `getState()` method to retrieve the current state:

```ts
const state = carousel.getState();
console.log(state);
// {
//   totalItems: 10,
//   visibleItemIndexes: [0, 1, 2],
//   isFirstItemVisible: true,
//   isLastItemVisible: false
// }
```

### Listening to State Changes

Use the `onChange` option to receive state updates:

```ts
const carousel = new MotionRail(element, {
  onChange: (state) => {
    console.log('Total:', state.totalItems);
    console.log('Visible:', state.visibleItemIndexes);
    console.log('At start:', state.isFirstItemVisible);
    console.log('At end:', state.isLastItemVisible);
  }
});
```

## Common Patterns

### Disable Navigation at Boundaries

```ts
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

const carousel = new MotionRail(element, {
  onChange: (state) => {
    prevButton.disabled = state.isFirstItemVisible;
    nextButton.disabled = state.isLastItemVisible;
  }
});
```

### Update Pagination Counter

```ts
const counter = document.querySelector('.counter');

const carousel = new MotionRail(element, {
  onChange: (state) => {
    const currentPage = state.visibleItemIndexes[0] + 1;
    counter.textContent = `${currentPage} / ${state.totalItems}`;
  }
});
```

### Custom Dot Indicators

```ts
const dotsContainer = document.querySelector('.dots');

const carousel = new MotionRail(element, {
  onChange: (state) => {
    // Update active dot based on first visible item
    const firstVisibleIndex = state.visibleItemIndexes[0];
    document.querySelectorAll('.dot').forEach((dot, index) => {
      dot.classList.toggle('active', index === firstVisibleIndex);
    });
  }
});
```

### Conditional Auto-Pause

```ts
const carousel = new MotionRail(element, {
  autoplay: true,
  onChange: (state) => {
    // Pause when reaching the last item
    if (state.isLastItemVisible) {
      carousel.pause();
    }
  }
});
```

## Next Steps

- [MotionRail Class](/docs/api/class/motionrail)
- [MotionRailOptions](/docs/api/types/motionrail-options)
- [onChange Callback](/docs/configuration#onchange)
