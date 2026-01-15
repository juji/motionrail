# Arrows Extension

Add previous/next navigation arrows to your carousel.

## Installation

```bash
npm install motionrail
```

## Usage

```js
import { MotionRail } from 'motionrail';
import { Arrows } from 'motionrail/extensions/arrows';
import 'motionrail/style.css';
import 'motionrail/extensions/arrows/style.css';

const carousel = new MotionRail(element, {
  extensions: [Arrows()]
});
```

## Options

### `loop`

- **Type**: `boolean`
- **Default**: `true`

When `false`, arrows are disabled at carousel edges (first/last items visible).

```js
Arrows({ loop: false })
```

### `leftIcon`

- **Type**: `string`
- **Default**: Default SVG left arrow

Custom HTML string for the left arrow icon.

```js
Arrows({
  leftIcon: '<svg>...</svg>'
})
```

### `rightIcon`

- **Type**: `string`
- **Default**: Default SVG right arrow  

Custom HTML string for the right arrow icon.

```js
Arrows({
  rightIcon: '<svg>...</svg>'
})
```

### `log`

- **Type**: `boolean`
- **Default**: `false`

Enable console logging for debugging.

```js
Arrows({ log: true })
```

## Complete Example

```js
import { MotionRail } from 'motionrail';
import { Arrows } from 'motionrail/extensions/arrows';
import 'motionrail/style.css';
import 'motionrail/extensions/arrows/style.css';

const carousel = new MotionRail(document.getElementById('carousel'), {
  breakpoints: [
    { columns: 1, gap: '16px' },
    { width: 768, columns: 2, gap: '16px' },
    { width: 1024, columns: 3, gap: '20px' }
  ],
  extensions: [
    Arrows({
      loop: true,
      leftIcon: '←',
      rightIcon: '→'
    })
  ]
});
```

## Features

- **Auto-hide**: Arrows automatically hide when all items are visible
- **RTL-aware**: Navigation direction swaps in RTL mode
- **Customizable**: Use SVG, text, or HTML for icons
- **Disabled state**: Visual feedback when `loop: false` and at edges
- **Accessible**: Proper ARIA labels and keyboard support

## Styling

The extension uses CSS classes you can customize:

```css
/* Arrow buttons */
.motionrail-arrow {
  /* Your custom styles */
}

.motionrail-arrow-left {
  /* Left arrow specific styles */
}

.motionrail-arrow-right {
  /* Right arrow specific styles */
}

.motionrail-arrow:disabled {
  /* Disabled state when loop: false */
}

/* Hide arrows when all items visible */
.motionrail-arrows-hidden {
  display: none;
}
```

## Custom Icons

### Text Icons

```js
Arrows({
  leftIcon: '‹',
  rightIcon: '›'
})
```

### SVG Icons

```js
Arrows({
  leftIcon: `
    <svg width="24" height="24" viewBox="0 0 24 24">
      <path d="M15 18l-6-6 6-6"/>
    </svg>
  `,
  rightIcon: `
    <svg width="24" height="24" viewBox="0 0 24 24">
      <path d="M9 18l6-6-6-6"/>
    </svg>
  `
})
```

## Next Steps

- [Dots Extension](/docs/extensions/dots) - Add pagination dots
- [Creating Custom Extensions](/docs/extensions/custom) - Build your own
- [API Methods](/docs/api) - Programmatic control
