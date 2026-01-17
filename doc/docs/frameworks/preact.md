# Preact Integration

MotionRail provides a first-class Preact component with full TypeScript support.

## Basic Usage

```jsx
import { MotionRail } from 'motionrail/preact';
import 'motionrail/style.css';

// Define options outside to prevent re-renders
const options = { breakpoints: [{ columns: 3, gap: '20px' }] };

function App() {
  return (
    <MotionRail options={options}>
      <div>Item 1</div>
      <div>Item 2</div>
      <div>Item 3</div>
    </MotionRail>
  );
}
```

## Props

### `options`

- **Type**: [MotionRailOptions](/docs/api/types/motionrail-options)
- **Required**: No

Configuration options for the carousel. See [Configuration](/docs/configuration) for all available options.

```jsx
const options = {
  autoplay: true,
  delay: 3000,
  breakpoints: [
    { columns: 1, gap: '16px' },
    { width: 768, columns: 2, gap: '16px' }
  ]
};

<MotionRail options={options}>
  {/* items */}
</MotionRail>
```

### Other Props

All other props are passed to the root `div` element:

```jsx
const options = {};

<MotionRail
  options={options}
  className="my-carousel"
  style={{ maxWidth: '1200px' }}
  aria-label="Product carousel"
>
  {/* items */}
</MotionRail>
```

::: warning
Unlike React, Preact does not expose refs to access the MotionRail instance. If you need programmatic control, consider using the vanilla JavaScript API directly.
:::

## Complete Example

```jsx
import { useState } from 'preact/hooks';
import { MotionRail } from 'motionrail/preact';
import 'motionrail/style.css';

function Carousel() {
  const [currentState, setCurrentState] = useState(null);

  const options = {
    autoplay: true,
    delay: 3000,
    breakpoints: [
      { columns: 1, gap: '16px' },
      { width: 768, columns: 2, gap: '16px' },
      { width: 1024, columns: 3, gap: '20px' }
    ],
    onChange: setCurrentState
  };

  return (
    <div>
      <MotionRail options={options} className="my-carousel">
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
        <div>Item 4</div>
        <div>Item 5</div>
      </MotionRail>

      {currentState && (
        <div className="state-info">
          <p>Visible items: {currentState.visibleItemIndexes.join(', ')}</p>
          <p>Total items: {currentState.totalItems}</p>
        </div>
      )}
    </div>
  );
}
```

## Dynamic Children

The Preact component automatically calls `update()` when children change:

```jsx
import { useState } from 'preact/hooks';
import { MotionRail } from 'motionrail/preact';

// Define options outside to prevent re-renders
const options = { breakpoints: [{ columns: 3, gap: '20px' }] };

function DynamicCarousel() {
  const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3']);

  const addItem = () => {
    setItems([...items, `Item ${items.length + 1}`]);
  };

  const removeItem = () => {
    setItems(items.slice(0, -1));
  };

  return (
    <>
      <MotionRail options={options}>
        {items.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </MotionRail>

      <button onClick={addItem}>Add Item</button>
      <button onClick={removeItem}>Remove Item</button>
    </>
  );
}
```

## TypeScript

Full TypeScript support is included:

```tsx
import { MotionRail } from 'motionrail/preact';
import type { MotionRailOptions, MotionRailState } from 'motionrail';

function TypedCarousel() {
  const options: MotionRailOptions = {
    autoplay: true,
    breakpoints: [{ columns: 3, gap: '20px' }],
    onChange: (state: MotionRailState) => {
      console.log(state);
    }
  };

  return (
    <MotionRail options={options}>
      <div>Item 1</div>
      <div>Item 2</div>
    </MotionRail>
  );
}
```

## Bundle Size

**Preact integration**: 0.82 kB (gzipped: 0.40 kB)

## Next Steps

- [Configuration](/docs/configuration) - All configuration options
- [API Methods](/docs/api) - Programmatic control
- [Extensions](/docs/extensions/) - Add more functionality
