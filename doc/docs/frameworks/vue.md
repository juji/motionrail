# Vue Integration

MotionRail provides a first-class Vue 3 component (SFC) with full TypeScript support.

## FOUC-Free Styling Example

```vue
<script setup lang="ts">
import { MotionRail } from "motionrail/vue";
import { MotionRail as MotionRailClass } from "motionrail";
import "motionrail/style.css";
import { useHead } from "#imports";

// FOUC-safe container query setup for the first carousel
const { containerName, containerQueries } = MotionRailClass.getBreakPoints({
  breakpoints: [
    { columns: 1, gap: "16px" },
    { width: 768, columns: 2, gap: "16px" },
    { width: 1024, columns: 3, gap: "20px" },
  ],
  totalItems: 8,
});

// SSR/FOUC prevention: inject containerQueries in the head
useHead({
  style: [
    containerName && containerQueries
      ? {
          key: containerName,
          innerHTML: containerQueries,
          "data-motionrail-style": containerName,
        }
      : undefined,
  ].filter(Boolean),
});
</script>

<template>
  <MotionRail
    :options="{
      breakpoints: [
        { columns: 1, gap: '16px' },
        { width: 768, columns: 2, gap: '16px' },
        { width: 1024, columns: 3, gap: '20px' },
      ],
      containerName,
    }"
  >
    <div v-for="i in [1, 2, 3, 4, 5, 6, 7, 8]" :key="i">
      <!-- ...carousel item content... -->
    </div>
  </MotionRail>
</template>
```

## Basic Usage

```vue
<script setup>
import { MotionRail } from "motionrail/vue";
import "motionrail/style.css";

const options = { breakpoints: [{ columns: 3, gap: "20px" }] };
</script>

<template>
  <MotionRail :options="options">
    <div>Item 1</div>
    <div>Item 2</div>
    <div>Item 3</div>
  </MotionRail>
</template>
```

## Props

### `options`

- **Type**: [MotionRailOptions](/docs/api/types/motionrail-options)
- **Required**: No
- **Default**: `{}`

Configuration options for the carousel. See [Configuration](/docs/configuration) for all available options.

```vue
<script setup>
const options = {
  autoplay: true,
  delay: 3000,
  breakpoints: [
    { columns: 1, gap: "16px" },
    { width: 768, columns: 2, gap: "16px" },
  ],
};
</script>

<template>
  <MotionRail :options="options">
    <!-- items -->
  </MotionRail>
</template>
```

## Template Ref Access

Use template refs to access the MotionRail instance and container:

```vue
<script setup>
import { ref } from "vue";
import { MotionRail } from "motionrail/vue";

const carouselRef = ref(null);

const handleNext = () => {
  carouselRef.value?.instance?.next();
};

const handlePrev = () => {
  carouselRef.value?.instance?.prev();
};
</script>

<template>
  <div>
    <MotionRail ref="carouselRef" :options="{}">
      <div>Item 1</div>
      <div>Item 2</div>
    </MotionRail>

    <button @click="handlePrev">Previous</button>
    <button @click="handleNext">Next</button>
  </div>
</template>
```

### Exposed Properties

The component exposes two properties via `defineExpose`:

- **`instance`**: The MotionRail class instance (for API methods)
- **`container`**: The container HTMLDivElement

```vue
<script setup>
import { ref, onMounted } from "vue";

const carouselRef = ref(null);

onMounted(() => {
  // Access the MotionRail instance
  console.log(carouselRef.value.instance);

  // Access the container element
  console.log(carouselRef.value.container);
});
</script>

<template>
  <MotionRail ref="carouselRef" :options="{}">
    <!-- items -->
  </MotionRail>
</template>
```

## Complete Example

```vue
<script setup>
import { ref } from "vue";
import { MotionRail } from "motionrail/vue";
import "motionrail/style.css";

const carouselRef = ref(null);
const currentState = ref(null);

const options = {
  autoplay: true,
  delay: 3000,
  breakpoints: [
    { columns: 1, gap: "16px" },
    { width: 768, columns: 2, gap: "16px" },
    { width: 1024, columns: 3, gap: "20px" },
  ],
  onChange: (state) => {
    currentState.value = state;
  },
};

const handleNext = () => {
  carouselRef.value?.instance?.next();
};

const handlePrev = () => {
  carouselRef.value?.instance?.prev();
};

const handlePlay = () => {
  carouselRef.value?.instance?.play();
};

const handlePause = () => {
  carouselRef.value?.instance?.pause();
};
</script>

<template>
  <div>
    <MotionRail ref="carouselRef" :options="options" class="my-carousel">
      <div>Item 1</div>
      <div>Item 2</div>
      <div>Item 3</div>
      <div>Item 4</div>
      <div>Item 5</div>
    </MotionRail>

    <div class="controls">
      <button @click="handlePrev">Previous</button>
      <button @click="handleNext">Next</button>
      <button @click="handlePlay">Play</button>
      <button @click="handlePause">Pause</button>
    </div>

    <div v-if="currentState" class="state-info">
      <p>Visible items: {{ currentState.visibleItemIndexes.join(", ") }}</p>
      <p>Total items: {{ currentState.totalItems }}</p>
    </div>
  </div>
</template>
```

## Dynamic Children

The Vue component automatically calls `update()` when slot content changes:

```vue
<script setup>
import { ref } from "vue";
import { MotionRail } from "motionrail/vue";

const items = ref(["Item 1", "Item 2", "Item 3"]);
// Define options in script setup to avoid inline object creation
const options = { breakpoints: [{ columns: 3, gap: "20px" }] };

const addItem = () => {
  items.value.push(`Item ${items.value.length + 1}`);
};

const removeItem = () => {
  items.value.pop();
};
</script>

<template>
  <div>
    <MotionRail :options="options">
      <div v-for="(item, index) in items" :key="index">
        {{ item }}
      </div>
    </MotionRail>

    <button @click="addItem">Add Item</button>
    <button @click="removeItem">Remove Item</button>
  </div>
</template>
```

## TypeScript

Full TypeScript support with `<script setup lang="ts">`:

```vue
<script setup lang="ts">
import { ref } from "vue";
import { MotionRail } from "motionrail/vue";
import type { MotionRailOptions, MotionRailState } from "motionrail";

const carouselRef = ref<{ instance: any; container: HTMLDivElement } | null>(
  null,
);
const currentState = ref<MotionRailState | null>(null);

const options: MotionRailOptions = {
  autoplay: true,
  breakpoints: [{ columns: 3, gap: "20px" }],
  onChange: (state: MotionRailState) => {
    currentState.value = state;
  },
};

const handleNext = (): void => {
  carouselRef.value?.instance?.next();
};
</script>

<template>
  <MotionRail ref="carouselRef" :options="options">
    <div>Item 1</div>
    <div>Item 2</div>
  </MotionRail>
</template>
```

## Attributes

All attributes are passed to the root `div` element:

```vue
<template>
  <MotionRail
    :options="{}"
    class="my-carousel"
    style="max-width: 1200px"
    aria-label="Product carousel"
  >
    <!-- items -->
  </MotionRail>
</template>
```

## Bundle Size

**Vue integration**: 1.22 kB (gzipped: 0.62 kB)

## Next Steps

- [Configuration](/docs/configuration) - All configuration options
- [API Methods](/docs/api) - Programmatic control
- [Extensions](/docs/extensions/) - Add more functionality
