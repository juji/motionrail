# Svelte 5 Integration (Runes)

MotionRail provides a Svelte 5 component optimized for the modern runes syntax.

## Installation

```bash
npm install motionrail svelte
```

## Basic Usage

```svelte
<script>
  import { MotionRail } from 'motionrail/svelte5';
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

- **Type**: `MotionRailClass | null` (using `$bindable()`)

Bind to get the MotionRail instance for programmatic control.

```svelte
<script>
  let instance = $state();

  function handleNext() {
    instance?.next();
  }
</script>

<MotionRail {options} bind:instance>
  <div>Item 1</div>
  <div>Item 2</div>
</MotionRail>

<button onclick={handleNext}>Next</button>
```

### `bind:container`

- **Type**: `HTMLDivElement` (using `$bindable()`)

Bind to get the container HTMLDivElement.

```svelte
<script>
  let container = $state();
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
  import { MotionRail } from 'motionrail/svelte5';
  import 'motionrail/style.css';

  let instance = $state();
  let container = $state();
  let currentState = $state(null);

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
    <button onclick={handlePrev}>Previous</button>
    <button onclick={handleNext}>Next</button>
    <button onclick={handlePlay}>Play</button>
    <button onclick={handlePause}>Pause</button>
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

The Svelte 5 component automatically calls `update()` when slot content changes using a MutationObserver:

```svelte
<script>
  let items = $state(['Item 1', 'Item 2', 'Item 3']);

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

<button onclick={addItem}>Add Item</button>
<button onclick={removeItem}>Remove Item</button>
```

## TypeScript

Full TypeScript support with `<script lang="ts">`:

```svelte
<script lang="ts">
  import { MotionRail } from 'motionrail/svelte5';
  import type { MotionRailOptions, MotionRailState } from 'motionrail';

  let instance = $state<InstanceType<typeof import('motionrail').MotionRail> | null>();
  let container = $state<HTMLDivElement>();
  let currentState = $state<MotionRailState | null>(null);

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
  import { MotionRail } from 'motionrail/svelte5';

  let carouselComponent = $state();

  function logInstance() {
    const instance = carouselComponent?.getInstance();
    console.log(instance);
  }
</script>

<MotionRail bind:this={carouselComponent} options={{}}>
  <!-- items -->
</MotionRail>

<button onclick={logInstance}>Log Instance</button>
```

### `getContainer()`

Returns the container HTMLDivElement.

```svelte
<script>
  import { MotionRail } from 'motionrail/svelte5';

  let carouselComponent = $state();

  function logContainer() {
    const container = carouselComponent?.getContainer();
    console.log(container);
  }
</script>

<MotionRail bind:this={carouselComponent} options={{}}>
  <!-- items -->
</MotionRail>

<button onclick={logContainer}>Log Container</button>
```

## Differences from Svelte 4

The Svelte 5 integration uses modern runes syntax:

- `$state()` instead of `let` for reactive state
- `$props()` for prop destructuring
- `$effect()` for reactive effects
- `$bindable()` for two-way binding
- `{@render children?.()}` for slot content
- `onclick` instead of `on:click`

## Bundle Size

**Svelte 5 integration**: 1.80 kB (gzipped: 0.82 kB)

Smaller than the Svelte 4 version thanks to the more efficient runes compiler output.

## Svelte 4 Compatibility

If you need Svelte 4 or want to use the classic API:

```svelte
<script>
  import { MotionRail } from 'motionrail/svelte';
</script>
```

See [Svelte Integration](/docs/frameworks/svelte) for the classic API documentation.

## Next Steps

- [Svelte Integration](/docs/frameworks/svelte) - Classic Svelte 4/5 API
- [Configuration](/docs/configuration) - All configuration options
- [API Methods](/docs/api) - Programmatic control
- [Extensions](/docs/extensions/) - Add more functionality
