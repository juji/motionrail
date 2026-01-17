# Extensions

MotionRail supports a modular extension system that allows you to add functionality without bloating the core library.

## Built-in Extensions

MotionRail comes with several pre-built extensions:

- **[Arrows](/docs/extensions/arrows)** - Previous/next navigation arrows
- **[Dots](/docs/extensions/dots)** - Pagination dots indicator
- **[Thumbnails](/docs/extensions/thumbnails)** - Thumbnail navigation
- **[Logger](/docs/extensions/logger)** - Debug logging for development

## Installation

Extensions are included with MotionRail but must be imported separately:

```js
import { MotionRail } from 'motionrail';
import { Arrows } from 'motionrail/extensions/arrows';
import { Dots } from 'motionrail/extensions/dots';

// Don't forget to import extension styles
import 'motionrail/style.css';
import 'motionrail/extensions/arrows/style.css';
import 'motionrail/extensions/dots/style.css';
```

## Using Extensions

Add extensions through the `extensions` option:

```js
const carousel = new MotionRail(element, {
  breakpoints: [
    { columns: 1, gap: '16px' },
    { width: 768, columns: 2, gap: '16px' }
  ],
  extensions: [
    Arrows({ loop: true }),
    Dots({ showIndex: true })
  ]
});
```

## Extension API

All extensions follow a consistent lifecycle API:

```ts
interface MotionRailExtension {
  name: string;
  onInit?: (motionRail: MotionRail, state: MotionRailState) => void;
  onUpdate?: (motionRail: MotionRail, state: MotionRailState) => void;
  onDestroy?: (motionRail: MotionRail, state: MotionRailState) => void;
}
```

See [MotionRailExtension](/docs/api/types/motionrail-extension) for complete type documentation.

### Lifecycle Hooks

#### `onInit(motionRail, state)`

Called once when the carousel initializes. Use this to set up DOM elements, event listeners, or initial state.

**Parameters:**
- `motionRail` - The [MotionRail](/docs/api/class/motionrail) instance
- `state` - Current [MotionRailState](/docs/api/types/motionrail-state)

#### `onUpdate(motionRail, state)`

Called whenever the carousel state changes (scroll, resize, content update).

**Parameters:**
- `motionRail` - The [MotionRail](/docs/api/class/motionrail) instance
- `state` - Updated [MotionRailState](/docs/api/types/motionrail-state)

#### `onDestroy(motionRail, state)`

Called when the carousel is destroyed. Use this to clean up DOM elements, event listeners, and timers.

**Parameters:**
- `motionRail` - The [MotionRail](/docs/api/class/motionrail) instance
- `state` - Final [MotionRailState](/docs/api/types/motionrail-state)

## State Object

All hooks receive the current state:

```ts
interface MotionRailState {
  totalItems: number;              // Total number of items
  visibleItemIndexes: number[];    // Currently visible item indexes
  isFirstItemVisible: boolean;     // First item is visible
  isLastItemVisible: boolean;      // Last item is visible
}
```

See [MotionRailState](/docs/api/types/motionrail-state) for complete type documentation.

## Multiple Extensions

You can use multiple extensions together:

```js
import { Arrows } from 'motionrail/extensions/arrows';
import { Dots } from 'motionrail/extensions/dots';
import { Thumbnails } from 'motionrail/extensions/thumbnails';

const carousel = new MotionRail(element, {
  extensions: [
    Arrows({ loop: false }),
    Dots({ showIndex: true }),
    Thumbnails({ thumbnailWidth: 80 })
  ]
});
```

## Next Steps

- [Arrows Extension](/docs/extensions/arrows) - Navigation arrows
- [Dots Extension](/docs/extensions/dots) - Pagination indicators
- [Thumbnails Extension](/docs/extensions/thumbnails) - Thumbnail navigation
- [Logger Extension](/docs/extensions/logger) - Debug logging
- [Creating Custom Extensions](/docs/extensions/custom) - Build your own
