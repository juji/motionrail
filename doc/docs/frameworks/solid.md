# Solid.js Integration

MotionRail provides a first-class Solid.js component with full TypeScript support.

## Installation

```bash
npm install motionrail
```

## Basic Usage

```jsx
import { MotionRail } from 'motionrail/solid';
import 'motionrail/style.css';

function App() {
  return (
    <MotionRail options={{ breakpoints: [{ columns: 3, gap: '20px' }] }}>
      <div>Item 1</div>
      <div>Item 2</div>
      <div>Item 3</div>
    </MotionRail>
  );
}
```

## Props

### `options`

- **Type**: `MotionRailOptions`
- **Required**: No

Configuration options for the carousel. See [Configuration](/docs/configuration) for all available options.

```jsx
<MotionRail
  options={{
    autoplay: true,
    delay: 3000,
    breakpoints: [
      { columns: 1, gap: '16px' },
      { width: 768, columns: 2, gap: '16px' }
    ]
  }}
>
  {/* items */}
</MotionRail>
```

### `ref`

- **Type**: `(instance: MotionRailClass) => void`
- **Required**: No

Callback that receives the MotionRail instance for programmatic control.

```jsx
function MyCarousel() {
  let carousel;

  const handleNext = () => {
    carousel?.next();
  };

  return (
    <>
      <MotionRail
        ref={(instance) => carousel = instance}
        options={{}}
      >
        <div>Item 1</div>
        <div>Item 2</div>
      </MotionRail>
      <button onClick={handleNext}>Next</button>
    </>
  );
}
```

### `divRef`

- **Type**: `(element: HTMLDivElement) => void`
- **Required**: No

Callback that receives the container HTMLDivElement.

```jsx
function MyCarousel() {
  let container;

  return (
    <MotionRail
      divRef={(el) => container = el}
      options={{}}
    >
      <div>Item 1</div>
      <div>Item 2</div>
    </MotionRail>
  );
}
```

### Other Props

All other props are passed to the root `div` element:

```jsx
<MotionRail
  options={{}}
  class="my-carousel"
  style={{ "max-width": '1200px' }}
  aria-label="Product carousel"
>
  {/* items */}
</MotionRail>
```

## Complete Example

```jsx
import { createSignal } from 'solid-js';
import { MotionRail } from 'motionrail/solid';
import 'motionrail/style.css';

function Carousel() {
  let carousel;
  let container;
  const [currentState, setCurrentState] = createSignal(null);

  const handleNext = () => {
    carousel?.next();
  };

  const handlePrev = () => {
    carousel?.prev();
  };

  const handlePlay = () => {
    carousel?.play();
  };

  const handlePause = () => {
    carousel?.pause();
  };

  return (
    <div>
      <MotionRail
        ref={(instance) => carousel = instance}
        divRef={(el) => container = el}
        options={{
          autoplay: true,
          delay: 3000,
          breakpoints: [
            { columns: 1, gap: '16px' },
            { width: 768, columns: 2, gap: '16px' },
            { width: 1024, columns: 3, gap: '20px' }
          ],
          onChange: (state) => {
            setCurrentState(state);
          }
        }}
        class="my-carousel"
      >
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
        <div>Item 4</div>
        <div>Item 5</div>
      </MotionRail>

      <div class="controls">
        <button onClick={handlePrev}>Previous</button>
        <button onClick={handleNext}>Next</button>
        <button onClick={handlePlay}>Play</button>
        <button onClick={handlePause}>Pause</button>
      </div>

      {currentState() && (
        <div class="state-info">
          <p>Visible items: {currentState().visibleItemIndexes.join(', ')}</p>
          <p>Total items: {currentState().totalItems}</p>
        </div>
      )}
    </div>
  );
}
```

## Dynamic Children

The Solid component automatically calls `update()` when children change:

```jsx
import { createSignal, For } from 'solid-js';
import { MotionRail } from 'motionrail/solid';

function DynamicCarousel() {
  const [items, setItems] = createSignal(['Item 1', 'Item 2', 'Item 3']);

  const addItem = () => {
    setItems([...items(), `Item ${items().length + 1}`]);
  };

  const removeItem = () => {
    setItems(items().slice(0, -1));
  };

  return (
    <>
      <MotionRail options={{ breakpoints: [{ columns: 3, gap: '20px' }] }}>
        <For each={items()}>
          {(item) => <div>{item}</div>}
        </For>
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
import { createSignal } from 'solid-js';
import { MotionRail } from 'motionrail/solid';
import type { MotionRailOptions, MotionRailState } from 'motionrail';

function TypedCarousel() {
  let carousel: InstanceType<typeof import('motionrail').MotionRail> | undefined;
  
  const options: MotionRailOptions = {
    autoplay: true,
    breakpoints: [{ columns: 3, gap: '20px' }],
    onChange: (state: MotionRailState) => {
      console.log(state);
    }
  };

  return (
    <MotionRail
      ref={(instance) => carousel = instance}
      options={options}
    >
      <div>Item 1</div>
      <div>Item 2</div>
    </MotionRail>
  );
}
```

## Bundle Size

**Solid.js integration**: 0.89 kB (gzipped: 0.48 kB)

## Next Steps

- [Configuration](/docs/configuration) - All configuration options
- [API Methods](/docs/api) - Programmatic control
- [Extensions](/docs/extensions/) - Add more functionality
