# Qwik Integration

MotionRail provides a first-class Qwik component with full TypeScript support and optimized for Qwik's resumability.

## Basic Usage

```tsx
import { component$ } from "@builder.io/qwik";
import { MotionRail } from "motionrail/qwik";
import "motionrail/style.css";

export default component$(() => {
  const options = { breakpoints: [{ columns: 3, gap: "20px" }] };

  return (
    <MotionRail options={options}>
      <div>Item 1</div>
      <div>Item 2</div>
      <div>Item 3</div>
    </MotionRail>
  );
});
```

## Props

### `options`

- **Type**: [MotionRailOptions](/docs/api/types/motionrail-options)
- **Required**: No

Configuration options for the carousel. See [Configuration](/docs/configuration) for all available options.

::: warning Important: noSerialize Required
When passing options that include **functions** (like `onChange`) or **extension instances**, you must wrap the options object with `noSerialize()` from Qwik to prevent serialization errors.
:::

```tsx
import { component$, noSerialize } from "@builder.io/qwik";
import { MotionRail } from "motionrail/qwik";
import { Arrows } from "motionrail/extensions/arrows";

export default component$(() => {
  return (
    <MotionRail
      options={noSerialize({
        autoplay: true,
        delay: 3000,
        breakpoints: [
          { columns: 1, gap: "16px" },
          { width: 768, columns: 2, gap: "16px" },
        ],
        extensions: [Arrows()],
        onChange: (state) => console.log(state),
      })}
    >
      {/* items */}
    </MotionRail>
  );
});
```

### Other Props

All other props are passed to the root `div` element:

```tsx
<MotionRail
  options={noSerialize({ breakpoints: [{ columns: 3, gap: "20px" }] })}
  class="my-carousel"
  style={{ maxWidth: "1200px" }}
  aria-label="Product carousel"
>
  {/* items */}
</MotionRail>
```

## Complete Example

```tsx
import { component$, useSignal, noSerialize } from "@builder.io/qwik";
import { MotionRail } from "motionrail/qwik";
import { Arrows } from "motionrail/extensions/arrows";
import "motionrail/style.css";
import "motionrail/extensions/arrows/style.css";

export default component$(() => {
  const currentState = useSignal(null);

  return (
    <div>
      <MotionRail
        options={noSerialize({
          autoplay: true,
          delay: 3000,
          breakpoints: [
            { columns: 1, gap: "16px" },
            { width: 768, columns: 2, gap: "16px" },
            { width: 1024, columns: 3, gap: "20px" },
          ],
          extensions: [Arrows()],
          onChange: (state) => {
            currentState.value = state;
          },
        })}
        class="my-carousel"
      >
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
        <div>Item 4</div>
        <div>Item 5</div>
      </MotionRail>

      {currentState.value && (
        <div class="state-info">
          <p>
            Visible items: {currentState.value.visibleItemIndexes.join(", ")}
          </p>
          <p>Total items: {currentState.value.totalItems}</p>
        </div>
      )}
    </div>
  );
});
```

## Dynamic Children

The Qwik component automatically updates when slot content changes:

```tsx
import { component$, useSignal, noSerialize } from "@builder.io/qwik";
import { MotionRail } from "motionrail/qwik";

export default component$(() => {
  const items = useSignal([1, 2, 3]);

  return (
    <div>
      <MotionRail
        options={noSerialize({ breakpoints: [{ columns: 3, gap: "20px" }] })}
      >
        {items.value.map((item) => (
          <div key={item}>Item {item}</div>
        ))}
      </MotionRail>

      <button
        onClick$={() => {
          items.value = [...items.value, items.value.length + 1];
        }}
      >
        Add Item
      </button>
      <button
        onClick$={() => {
          items.value = items.value.slice(0, -1);
        }}
      >
        Remove Item
      </button>
    </div>
  );
});
```

## TypeScript

Full TypeScript support is included:

```tsx
import { component$, useSignal, noSerialize } from "@builder.io/qwik";
import { MotionRail } from "motionrail/qwik";
import type { MotionRailOptions, MotionRailState } from "motionrail";

export default component$(() => {
  const currentState = useSignal<MotionRailState | null>(null);

  const options: MotionRailOptions = {
    autoplay: true,
    breakpoints: [{ columns: 3, gap: "20px" }],
    onChange: (state: MotionRailState) => {
      currentState.value = state;
    },
  };

  return (
    <MotionRail options={noSerialize(options)}>
      <div>Item 1</div>
      <div>Item 2</div>
    </MotionRail>
  );
});
```

## Working with Extensions

When using extensions, always wrap the options object with `noSerialize()`:

```tsx
import { component$, noSerialize } from "@builder.io/qwik";
import { MotionRail } from "motionrail/qwik";
import { Arrows } from "motionrail/extensions/arrows";
import { Dots } from "motionrail/extensions/dots";
import "motionrail/style.css";
import "motionrail/extensions/arrows/style.css";
import "motionrail/extensions/dots/style.css";

export default component$(() => {
  return (
    <MotionRail
      options={noSerialize({
        breakpoints: [
          { columns: 1, gap: "16px" },
          { width: 768, columns: 2, gap: "16px" },
          { width: 1024, columns: 3, gap: "20px" },
        ],
        extensions: [Arrows(), Dots()],
      })}
    >
      <div>Item 1</div>
      <div>Item 2</div>
      <div>Item 3</div>
    </MotionRail>
  );
});
```

## Bundle Size

**Qwik integration**: 0.95 kB (gzipped: 0.52 kB)

## Next Steps

- [Configuration](/docs/configuration) - All configuration options
- [API Methods](/docs/api) - Programmatic control
- [Extensions](/docs/extensions/) - Add more functionality
