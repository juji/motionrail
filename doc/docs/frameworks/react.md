# React Integration

MotionRail provides a first-class React component with full TypeScript support.

## Basic Usage

```jsx
import { MotionRail } from 'motionrail/react';
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

### `ref`

- **Type**: `RefObject<MotionRailClass>`
- **Required**: No

Ref to access the MotionRail instance for programmatic control.

```jsx
import { useRef } from 'react';

const options = {};

function MyCarousel() {
  const carouselRef = useRef(null);

  const handleNext = () => {
    carouselRef.current?.next();
  };

  return (
    <>
      <MotionRail ref={carouselRef} options={options}>
        <div>Item 1</div>
        <div>Item 2</div>
      </MotionRail>
      <button onClick={handleNext}>Next</button>
    </>
  );
}
```

### `divRef`

- **Type**: `RefObject<HTMLDivElement>`
- **Required**: No

Ref to access the container HTMLDivElement.

```jsx
import { useRef } from 'react';

const options = {};

function MyCarousel() {
  const containerRef = useRef(null);

  return (
    <MotionRail divRef={containerRef} options={options}>
      <div>Item 1</div>
      <div>Item 2</div>
    </MotionRail>
  );
}
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

## Complete Example

```jsx
import { useRef, useState } from 'react';
import { MotionRail } from 'motionrail/react';
import 'motionrail/style.css';

function Carousel() {
  const carouselRef = useRef(null);
  const containerRef = useRef(null);
  const [currentState, setCurrentState] = useState(null);

  const handleNext = () => {
    carouselRef.current?.next();
  };

  const handlePrev = () => {
    carouselRef.current?.prev();
  };

  const handlePlay = () => {
    carouselRef.current?.play();
  };

  const handlePause = () => {
    carouselRef.current?.pause();
  };

  // Define options inside only when using setState (setCurrentState)
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
      <MotionRail
        ref={carouselRef}
        divRef={containerRef}
        options={options}
        className="my-carousel"
      >
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
        <div>Item 4</div>
        <div>Item 5</div>
      </MotionRail>

      <div className="controls">
        <button onClick={handlePrev}>Previous</button>
        <button onClick={handleNext}>Next</button>
        <button onClick={handlePlay}>Play</button>
        <button onClick={handlePause}>Pause</button>
      </div>

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

The React component automatically calls `update()` when children change:

```jsx
import { useState } from 'react';
import { MotionRail } from 'motionrail/react';

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
import { useRef } from 'react';
import { MotionRail } from 'motionrail/react';
import type { MotionRailOptions, MotionRailState } from 'motionrail';

function TypedCarousel() {
  const carouselRef = useRef<InstanceType<typeof import('motionrail').MotionRail>>(null);
  
  const options: MotionRailOptions = {
    autoplay: true,
    breakpoints: [{ columns: 3, gap: '20px' }],
    onChange: (state: MotionRailState) => {
      console.log(state);
    }
  };

  return (
    <MotionRail ref={carouselRef} options={options}>
      <div>Item 1</div>
      <div>Item 2</div>
    </MotionRail>
  );
}
```

## Bundle Size

**React integration**: 0.87 kB (gzipped: 0.42 kB)

## Next Steps

- [Configuration](/docs/configuration) - All configuration options
- [API Methods](/docs/api) - Programmatic control
- [Extensions](/docs/extensions/) - Add more functionality
