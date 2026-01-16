# Arrows Extension

Add previous/next navigation arrows to your carousel.

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

The extension applies the following default styles:

```css
.motionrail-arrow[disabled] {
  opacity: 0.3;
  pointer-events: none;
}

.motionrail-arrow-left,
.motionrail-arrow-right {
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  z-index: 10;
  position: absolute;
  position-anchor: --motionrail-scrollable;
  top: anchor(center);
  translate: 0 -50%;
}

.motionrail-arrow-left {
  left: anchor(left);
  margin-left: 10px;
}

.motionrail-arrow-right {
  right: anchor(right);
  margin-right: 10px;
}

.motionrail-arrow-left:hover,
.motionrail-arrow-right:hover {
  background: rgba(0, 0, 0, 0.8);
  scale: 1.1;
}

.motionrail-arrow-left:active,
.motionrail-arrow-right:active {
  scale: 0.95;
}
```

**Customization Tips:**
- Override `background` and `color` to match your theme
- Adjust `width`, `height`, and `border-radius` for different sizes/shapes  
- Modify `font-size` or use custom `leftIcon`/`rightIcon` options for custom icons
- Change `margin-left`/`margin-right` for positioning
- Update `transition` and hover `scale` for different animation effects

**Custom Icons:**

Use text symbols:
```js
Arrows({ leftIcon: '‹', rightIcon: '›' })
```

Or SVG icons:
```js
Arrows({
  leftIcon: '<svg width="24" height="24"><path d="M15 18l-6-6 6-6"/></svg>',
  rightIcon: '<svg width="24" height="24"><path d="M9 18l6-6-6-6"/></svg>'
})
```

## Next Steps

- [Dots Extension](/docs/extensions/dots) - Add pagination dots
- [Creating Custom Extensions](/docs/extensions/custom) - Build your own
- [API Methods](/docs/api) - Programmatic control
