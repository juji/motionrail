# MotionRailBreakpoint

Responsive breakpoint configuration.

## Type Definition

```ts
type MotionRailBreakpoint = {
  width?: number;
  columns?: number;
  gap?: string;
};
```

## Properties

### `width`

Container width threshold in pixels.

- **Type:** `number`
- **Optional:** Yes (omit for base breakpoint)

Uses CSS Container Queries with `min-width` (mobile-first approach).

```ts
const breakpoints = [
  { columns: 1, gap: "16px" }, // Base (no width)
  { width: 768, columns: 2, gap: "24px" }, // >= 768px
  { width: 1024, columns: 3, gap: "32px" }, // >= 1024px
];
```

::: tip Container Width, Not Viewport
The `width` value refers to the **carousel container's width**, not the viewport/screen width. MotionRail uses CSS Container Queries internally.
:::

---

### `columns`

Number of columns to display at this breakpoint.

- **Type:** `number`
- **Optional:** Yes

```ts
const breakpoints = [
  { columns: 1 }, // 1 column
  { width: 768, columns: 2 }, // 2 columns at >= 768px
  { width: 1024, columns: 3 }, // 3 columns at >= 1024px
];
```

---

### `gap`

Gap between items as a CSS value.

- **Type:** `string`
- **Optional:** Yes

Accepts any valid CSS gap value: `px`, `rem`, `em`, `%`, etc.

```ts
const breakpoints = [
  { gap: "16px" },
  { width: 768, gap: "24px" },
  { width: 1024, gap: "2rem" },
  { width: 1280, gap: "5%" },
];
```

## Usage Patterns

### Basic Responsive Layout

```ts
const carousel = new MotionRail(element, {
  breakpoints: [
    { columns: 1, gap: "16px" }, // Mobile
    { width: 768, columns: 2, gap: "24px" }, // Tablet
    { width: 1024, columns: 3, gap: "32px" }, // Desktop
  ],
});
```

### Gap Only Changes

```ts
const carousel = new MotionRail(element, {
  breakpoints: [
    { gap: "8px" }, // Small gap on mobile
    { width: 768, gap: "16px" }, // Medium gap on tablet
    { width: 1024, gap: "24px" }, // Large gap on desktop
  ],
});
```

### Columns Only Changes

```ts
const carousel = new MotionRail(element, {
  breakpoints: [
    { columns: 1 }, // 1 column
    { width: 640, columns: 2 }, // 2 columns
    { width: 1024, columns: 4 }, // 4 columns
  ],
});
```

### Variable Columns (1 → 2 → 3 → 4)

```ts
const carousel = new MotionRail(element, {
  breakpoints: [
    { columns: 1, gap: "16px" }, // Mobile: 1 column
    { width: 640, columns: 2, gap: "16px" }, // >= 640px: 2 columns
    { width: 1024, columns: 3, gap: "24px" }, // >= 1024px: 3 columns
    { width: 1280, columns: 4, gap: "32px" }, // >= 1280px: 4 columns
  ],
});
```

### Mixed Units

```ts
const carousel = new MotionRail(element, {
  breakpoints: [
    { columns: 1, gap: "1rem" },
    { width: 768, columns: 2, gap: "1.5rem" },
    { width: 1024, columns: 3, gap: "2rem" },
  ],
});
```

## How Breakpoints Work

### Mobile-First Approach

Breakpoints use `min-width` and are applied in order from smallest to largest:

```ts
// This configuration:
[
  { columns: 1, gap: "16px" }, // Base
  { width: 768, columns: 2, gap: "24px" }, // >= 768px
  { width: 1024, columns: 3, gap: "32px" }, // >= 1024px
];

// Applies like this:
// Container width 0-767px:    1 column, 16px gap
// Container width 768-1023px: 2 columns, 24px gap
// Container width 1024px+:    3 columns, 32px gap
```

### Partial Overrides

Each breakpoint only needs to specify the properties that change:

```ts
const breakpoints = [
  { columns: 2, gap: "16px" }, // Base: 2 columns, 16px gap
  { width: 768, gap: "24px" }, // >= 768px: Still 2 columns, but 24px gap
  { width: 1024, columns: 4 }, // >= 1024px: 4 columns, still 24px gap
];
```

### Container Queries

MotionRail uses CSS Container Queries, so breakpoints respond to the **container's width**, not the viewport:

```html
<!-- Container is 600px wide, even on a 1920px screen -->
<div style="width: 600px">
  <div id="carousel">...</div>
</div>
```

```ts
// This breakpoint won't activate because the container is 600px
{ width: 768, columns: 2 }
```

## Next Steps

- [Breakpoints Guide](/docs/breakpoints) - Detailed breakpoints guide with examples
- [MotionRailOptions](/docs/api/types/motionrail-options)
- [Configuration](/docs/configuration)
