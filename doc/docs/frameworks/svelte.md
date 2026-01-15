# Svelte Integration

MotionRail provides a Svelte component compatible with both Svelte 4 and Svelte 5 (classic API).

## Installation

```bash
npm install motionrail svelte
```

## Basic Usage

```svelte
<script>
  import { MotionRail } from 'motionrail/svelte';
  import 'motionrail/style.css';

  const options = { breakpoints: [{ columns: 3, gap: '20px' }] };
</script>

<MotionRail {options}>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</MotionRail>
```

## Props

### `options`

- **Type**: `MotionRailOptions`
- **Required**: No
- **Default**: `{}`

Configuration options for the carousel. See [Configuration](/docs/configuration) for all available options.

```svelte
<script>
  const options = {
    autoplay: true,
    delay: 3000,
    breakpoints: [
      { columns: 1, gap: '16px' },
      { width: 768, columns: 2, gap: '16px' }
    ]
  };
</script>

<MotionRail {options}>
  <!-- items -->
</MotionRail>
```

### `bind:instance`

- **Type**: `MotionRailClass | null`

Bind to get the MotionRail instance for programmatic control.

```svelte
<script>
  let instance;

  function handleNext() {
    instance?.next();
  }
</script>

<MotionRail {options} bind:instance>
  <div>Item 1</div>
  <div>Item 2</div>
</MotionRail>

<button on:click={handleNext}>Next</button>
```

### `bind:container`

- **Type**: `HTMLDivElement | undefined`

Bind to get the container HTMLDivElement.

```svelte
<script>
  let container;
</script>

<MotionRail {options} bind:container>
  <div>Item 1</div>
  <div>Item 2</div>
</MotionRail>
```

### Other Props

All other props are passed to the root `div` element:

```svelte
<MotionRail
  {options}
  class="my-carousel"
  style="max-width: 1200px"
  aria-label="Product carousel"
>
  <!-- items -->
</MotionRail>
```

## Complete Example

```svelte
<script>
  import { MotionRail } from 'motionrail/svelte';
  import 'motionrail/style.css';

  let instance;
  let container;
  let currentState = null;

  const options = {
    autoplay: true,
    delay: 3000,
    breakpoints: [
      { columns: 1, gap: '16px' },
      { width: 768, columns: 2, gap: '16px' },
      { width: 1024, columns: 3, gap: '20px' }
    ],
    onChange: (state) => {
      currentState = state;
    }
  };

  function handleNext() {
    instance?.next();
  }

  function handlePrev() {
    instance?.prev();
  }

  function handlePlay() {
    instance?.play();
  }

  function handlePause() {
    instance?.pause();
  }
</script>

<div>
  <MotionRail
    {options}
    bind:instance
    bind:container
    class="my-carousel"
  >
    <div>Item 1</div>
    <div>Item 2</div>
    <div>Item 3</div>
    <div>Item 4</div>
    <div>Item 5</div>
  </MotionRail>

  <div class="controls">
    <button on:click={handlePrev}>Previous</button>
    <button on:click={handleNext}>Next</button>
    <button on:click={handlePlay}>Play</button>
    <button on:click={handlePause}>Pause</button>
  </div>

  {#if currentState}
    <div class="state-info">
      <p>Visible items: {currentState.visibleItemIndexes.join(', ')}</p>
      <p>Total items: {currentState.totalItems}</p>
    </div>
  {/if}
</div>
```

## Dynamic Children

The Svelte component automatically calls `update()` when slot content changes using a MutationObserver:

```svelte
<script>
  let items = ['Item 1', 'Item 2', 'Item 3'];

  function addItem() {
    items = [...items, `Item ${items.length + 1}`];
  }

  function removeItem() {
    items = items.slice(0, -1);
  }
</script>

<MotionRail options={{ breakpoints: [{ columns: 3, gap: '20px' }] }}>
  {#each items as item}
    <div>{item}</div>
  {/each}
</MotionRail>

<button on:click={addItem}>Add Item</button>
<button on:click={removeItem}>Remove Item</button>
```

## TypeScript

Full TypeScript support with `<script lang="ts">`:

```svelte
<script lang="ts">
  import { MotionRail } from 'motionrail/svelte';
  import type { MotionRailOptions, MotionRailState } from 'motionrail';

  let instance: InstanceType<typeof import('motionrail').MotionRail> | null = null;
  let container: HTMLDivElement | undefined;
  let currentState: MotionRailState | null = null;

  const options: MotionRailOptions = {
    autoplay: true,
    breakpoints: [{ columns: 3, gap: '20px' }],
    onChange: (state: MotionRailState) => {
      currentState = state;
    }
  };

  function handleNext(): void {
    instance?.next();
  }
</script>

<MotionRail {options} bind:instance bind:container>
  <div>Item 1</div>
  <div>Item 2</div>
</MotionRail>
```

## Exported Functions

The component exports two helper functions:

### `getInstance()`

Returns the MotionRail instance.

```svelte
<script>
  import { MotionRail } from 'motionrail/svelte';

  let carouselComponent;

  function logInstance() {
    const instance = carouselComponent?.getInstance();
    console.log(instance);
  }
</script>

<MotionRail bind:this={carouselComponent} options={{}}>
  <!-- items -->
</MotionRail>

<button on:click={logInstance}>Log Instance</button>
```

### `getContainer()`

Returns the container HTMLDivElement.

```svelte
<script>
  import { MotionRail } from 'motionrail/svelte';

  let carouselComponent;

  function logContainer() {
    const container = carouselComponent?.getContainer();
    console.log(container);
  }
</script>

<MotionRail bind:this={carouselComponent} options={{}}>
  <!-- items -->
</MotionRail>

<button on:click={logContainer}>Log Container</button>
```

## Bundle Size

**Svelte integration**: 2.21 kB (gzipped: 0.94 kB)

## Svelte 5

For Svelte 5 with runes syntax, use the dedicated Svelte 5 integration:

```svelte
<script>
  import { MotionRail } from 'motionrail/svelte5';
</script>
```

See [Svelte 5](/docs/frameworks/svelte5) for more details.

## Next Steps

- [Svelte 5 Integration](/docs/frameworks/svelte5) - Use with Svelte 5 runes
- [Configuration](/docs/configuration) - All configuration options
- [API Methods](/docs/api) - Programmatic control
- [Extensions](/docs/extensions/) - Add more functionality
