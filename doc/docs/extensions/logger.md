# Logger Extension

Debug extension for logging carousel state and events.

## Installation

```bash
npm install motionrail
```

## Usage

```js
import { MotionRail } from 'motionrail';
import { Logger } from 'motionrail/extensions/logger';
import 'motionrail/style.css';

const carousel = new MotionRail(element, {
  extensions: [Logger()]
});
```

## Purpose

The Logger extension is a development tool that logs carousel state and lifecycle events to the console. It's useful for:

- **Debugging**: Understanding when events fire
- **State inspection**: Seeing current carousel state
- **Extension development**: Watching the lifecycle flow
- **Testing**: Verifying behavior changes

## What It Logs

### Lifecycle Events

The logger outputs messages for all extension lifecycle hooks:

- `onInit`: When the carousel is initialized
- `onUpdate`: When the carousel state updates
- `onDestroy`: When the carousel is destroyed

### State Information

Each update logs the current state:

```js
{
  index: 0,           // Current slide index
  itemsCount: 5,      // Total number of items
  columns: 1,         // Columns per view
  gap: '16px',        // Gap between items
  isPlaying: true     // Autoplay status
}
```

## Example Output

```
[MotionRail Logger] onInit
[MotionRail Logger] onUpdate {
  index: 0,
  itemsCount: 5,
  columns: 1,
  gap: '16px',
  isPlaying: true
}
[MotionRail Logger] onUpdate {
  index: 1,
  itemsCount: 5,
  columns: 1,
  gap: '16px',
  isPlaying: true
}
```

## Complete Example

```js
import { MotionRail } from 'motionrail';
import { Logger } from 'motionrail/extensions/logger';
import 'motionrail/style.css';

const carousel = new MotionRail(document.getElementById('carousel'), {
  autoplay: true,
  delay: 3000,
  breakpoints: [
    { minWidth: '0px', columns: 1 },
    { minWidth: '768px', columns: 2 }
  ],
  extensions: [Logger()]
});
```

## When to Use

### Development

Perfect for development when you need to:
- Verify event timing
- Debug state changes
- Understand carousel behavior
- Test responsive breakpoints

### Production

**Remove the logger in production** to avoid console clutter:

```js
const extensions = [];

// Only add logger in development
if (import.meta.env.DEV) {
  extensions.push(Logger());
}

const carousel = new MotionRail(element, {
  extensions
});
```

## Conditional Loading

```js
// Only in development
const carousel = new MotionRail(element, {
  extensions: [
    process.env.NODE_ENV === 'development' && Logger()
  ].filter(Boolean)
});
```

## With Multiple Extensions

```js
import { Arrows } from 'motionrail/extensions/arrows';
import { Dots } from 'motionrail/extensions/dots';
import { Logger } from 'motionrail/extensions/logger';

const carousel = new MotionRail(element, {
  extensions: [
    Arrows(),
    Dots(),
    Logger() // Logs events from all extensions
  ]
});
```

## TypeScript

```ts
import { MotionRail } from 'motionrail';
import { Logger } from 'motionrail/extensions/logger';

const carousel = new MotionRail(element, {
  extensions: [Logger()]
});
```

## Next Steps

- [Creating Custom Extensions](/docs/extensions/custom) - Build your own extension
- [Extensions Overview](/docs/extensions/) - Understanding the extension API
- [API Reference](/docs/api) - Full API documentation
