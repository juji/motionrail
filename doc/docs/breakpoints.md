# Breakpoints

Breakpoints allow you to configure how many columns and what gap size to use at different viewport widths, creating a fully responsive carousel.

## Configuration

```ts
interface MotionRailBreakpoint {
  width?: number;   // Maximum viewport width (optional)
  columns?: number; // Number of visible columns (optional)
  gap?: string;     // Gap between items (optional, CSS value)
}
```

## How Breakpoints Work

Breakpoints are applied **mobile-first**. Start with your default configuration (no `width` property), then add breakpoints with increasing `width` values.

::: tip ELEMENT WIDTH, NOT SCREEN WIDTH
The `width` values in breakpoints refer to the **carousel container's width**, not the viewport/screen width. MotionRail uses CSS Container Queries internally, making carousels responsive to their parent container rather than the screen size.
:::

::: warning
The examples below assume the carousel container is full-width. If your carousel is constrained within a narrower container, adjust the breakpoint values accordingly.
:::

### Basic Example

```js
// the following is an example for full-width carousel
const carousel = new MotionRail(element, {
  breakpoints: [
    { columns: 1, gap: '16px' },                    // Default (mobile)
    { width: 768, columns: 2, gap: '16px' },        // Tablets
    { width: 1024, columns: 3, gap: '20px' }        // Desktop
  ]
});
```

**How it applies:**
- 0-767px: 1 column, 16px gap
- 768-1023px: 2 columns, 16px gap  
- 1024px+: 3 columns, 20px gap

## Common Patterns

### Variable Columns (1 → 2 → 3 → 4)

```js
breakpoints: [
  { columns: 1, gap: '12px' },                    // < 480px
  { width: 480, columns: 2, gap: '16px' },        // 480px - 767px
  { width: 768, columns: 3, gap: '20px' },        // 768px - 1023px
  { width: 1024, columns: 4, gap: '24px' }        // >= 1024px
]
```

### Fixed Layout (No Responsiveness)

```js
breakpoints: [
  { columns: 2, gap: '20px' }  // Always 2 columns at any width
]
```

### Mobile-First Progressive Enhancement

```js
breakpoints: [
  { columns: 1, gap: '8px' },                     // Small phones
  { width: 375, columns: 1, gap: '12px' },        // Standard phones
  { width: 640, columns: 2, gap: '16px' },        // Phablets/small tablets
  { width: 768, columns: 2, gap: '20px' },        // Tablets
  { width: 1024, columns: 3, gap: '24px' },       // Small desktops
  { width: 1280, columns: 4, gap: '28px' },       // Standard desktops
  { width: 1536, columns: 5, gap: '32px' }        // Large screens
]
```

### Columns Only (Consistent Gap)

```js
breakpoints: [
  { columns: 1 },
  { width: 768, columns: 2 },
  { width: 1024, columns: 3 }
]
// Gap defaults to "0px" for all breakpoints
```

### Gap Only (Single Column)

```js
breakpoints: [
  { columns: 1, gap: '12px' },
  { width: 768, gap: '20px' },
  { width: 1024, gap: '28px' }
]
// Always 1 column, but gap increases on larger screens
```

## Default Behavior

If you omit the `breakpoints` option entirely, MotionRail uses this default:

```js
breakpoints: [
  { columns: 1, gap: "0px" }
]
```

## Important Notes

### Width Ordering

::: warning
Breakpoints **must** be ordered from smallest to largest width. The first breakpoint should have no `width` property.
:::

**❌ Wrong:**
```js
breakpoints: [
  { width: 1024, columns: 3, gap: '20px' },  // This won't work as intended
  { width: 768, columns: 2, gap: '16px' },
  { columns: 1, gap: '16px' }
]
```

**✅ Correct:**
```js
breakpoints: [
  { columns: 1, gap: '16px' },               // Default (no width)
  { width: 768, columns: 2, gap: '16px' },
  { width: 1024, columns: 3, gap: '20px' }
]
```

### Container Queries

MotionRail uses **CSS Container Queries** internally, which means breakpoints respond to the carousel container's width, not the viewport width. This allows carousels to be responsive within their parent container.

### Gap Values

The `gap` property accepts any valid CSS value:

```js
breakpoints: [
  { columns: 2, gap: '16px' },                // Pixels
  { width: 768, columns: 2, gap: '1rem' },    // Rem units
  { width: 1024, columns: 2, gap: '2%' },     // Percentage
  { width: 1280, columns: 2, gap: '1.5em' }   // Em units
]
```

## Dynamic Updates

Changes to breakpoints require recreating the carousel instance:

```js
let carousel = new MotionRail(element, {
  breakpoints: [{ columns: 2, gap: '16px' }]
});

// To change breakpoints:
carousel.destroy();
carousel = new MotionRail(element, {
  breakpoints: [{ columns: 3, gap: '20px' }]
});
```

## Examples

### E-commerce Product Grid

```js
breakpoints: [
  { columns: 2, gap: '12px' },        // Mobile: 2 products
  { width: 640, columns: 3, gap: '16px' },   // Small tablets: 3 products
  { width: 1024, columns: 4, gap: '20px' },  // Desktop: 4 products
  { width: 1280, columns: 5, gap: '24px' }   // Large screens: 5 products
]
```

### Image Gallery

```js
breakpoints: [
  { columns: 1, gap: '0px' },         // Mobile: full-width images
  { width: 768, columns: 2, gap: '8px' },    // Tablets: 2 images
  { width: 1024, columns: 3, gap: '12px' }   // Desktop: 3 images
]
```

### Content Carousel

```js
breakpoints: [
  { columns: 1, gap: '20px' },        // Mobile: one card at a time
  { width: 1024, columns: 2, gap: '32px' }   // Desktop: two cards
]
```

## Next Steps

- [Configuration](/docs/configuration) - All configuration options
- [API Methods](/docs/api) - Programmatic control
- [Examples](#) - More real-world examples
