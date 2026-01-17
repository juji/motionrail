# MotionRailExtension

Extension plugin interface.

## Type Definition

```ts
type MotionRailExtension = {
  name: string;
  onInit?: (motionRail: MotionRail, state: MotionRailState) => void;
  onUpdate?: (motionRail: MotionRail, state: MotionRailState) => void;
  onDestroy?: (motionRail: MotionRail, state: MotionRailState) => void;
}
```

## Properties

### `name`

Unique identifier for the extension.

- **Type:** `string`
- **Required:** Yes

```ts
const customExtension: MotionRailExtension = {
  name: 'custom-logger'
};
```

---

### `onInit`

Called once when the carousel is initialized.

- **Type:** `(motionRail: MotionRail, state: MotionRailState) => void`
- **Optional:** Yes

**Parameters:**
- `motionRail` - The [MotionRail](/docs/api/class/motionrail) instance
- `state` - Current [MotionRailState](/docs/api/types/motionrail-state)

```ts
const customExtension: MotionRailExtension = {
  name: 'init-tracker',
  onInit: (motionRail, state) => {
    console.log('Carousel initialized with', state.totalItems, 'items');
  }
};
```

---

### `onUpdate`

Called whenever the carousel state updates (scroll, resize, content changes).

- **Type:** `(motionRail: MotionRail, state: MotionRailState) => void`
- **Optional:** Yes

**Parameters:**
- `motionRail` - The [MotionRail](/docs/api/class/motionrail) instance
- `state` - Updated [MotionRailState](/docs/api/types/motionrail-state)

```ts
const customExtension: MotionRailExtension = {
  name: 'scroll-tracker',
  onUpdate: (motionRail, state) => {
    console.log('Visible items:', state.visibleItemIndexes);
  }
};
```

---

### `onDestroy`

Called when the carousel is destroyed for cleanup.

- **Type:** `(motionRail: MotionRail, state: MotionRailState) => void`
- **Optional:** Yes

**Parameters:**
- `motionRail` - The [MotionRail](/docs/api/class/motionrail) instance
- `state` - Final [MotionRailState](/docs/api/types/motionrail-state)

```ts
const customExtension: MotionRailExtension = {
  name: 'cleanup-tracker',
  onDestroy: (motionRail, state) => {
    console.log('Carousel destroyed');
  }
};
```

## Lifecycle Order

Extensions follow this lifecycle:

1. **`onInit`** - Carousel initialization (called once)
2. **`onUpdate`** - State changes (called multiple times)
3. **`onDestroy`** - Carousel cleanup (called once)

```ts
const lifecycleExtension: MotionRailExtension = {
  name: 'lifecycle-demo',
  onInit: (motionRail, state) => {
    console.log('1. Init');
  },
  onUpdate: (motionRail, state) => {
    console.log('2. Update (called on scroll, resize, etc.)');
  },
  onDestroy: (motionRail, state) => {
    console.log('3. Destroy');
  }
};
```

## Usage

### Adding Extensions

```ts
import { MotionRail } from 'motionrail';

const carousel = new MotionRail(element, {
  extensions: [
    customExtension1,
    customExtension2
  ]
});
```

### Built-in Extensions

```ts
import { Arrows } from 'motionrail/extensions/arrows';
import { Dots } from 'motionrail/extensions/dots';
import { Thumbnails } from 'motionrail/extensions/thumbnails';
import { Logger } from 'motionrail/extensions/logger';

const carousel = new MotionRail(element, {
  extensions: [
    Arrows(),
    Dots({ dotSize: 48 }),
    Thumbnails(),
    Logger()
  ]
});
```

See [Extensions Overview](/docs/extensions/) for built-in extensions.

## Examples

### Simple Logger

```ts
const logger: MotionRailExtension = {
  name: 'simple-logger',
  onInit: (motionRail, state) => {
    console.log('Initialized');
  },
  onUpdate: (motionRail, state) => {
    console.log('State updated:', state);
  },
  onDestroy: (motionRail, state) => {
    console.log('Destroyed');
  }
};
```

### Counter Display

```ts
const counter: MotionRailExtension = {
  name: 'counter',
  onUpdate: (motionRail, state) => {
    const counterEl = document.querySelector('.counter');
    if (counterEl) {
      const current = state.visibleItemIndexes[0] + 1;
      counterEl.textContent = `${current} / ${state.totalItems}`;
    }
  }
};
```

### Custom Controls

```ts
const customControls: MotionRailExtension = {
  name: 'custom-controls',
  onInit: (motionRail, state) => {
    const prevBtn = document.querySelector('.my-prev');
    const nextBtn = document.querySelector('.my-next');
    
    prevBtn?.addEventListener('click', () => motionRail.prev());
    nextBtn?.addEventListener('click', () => motionRail.next());
  },
  onUpdate: (motionRail, state) => {
    const prevBtn = document.querySelector('.my-prev') as HTMLButtonElement;
    const nextBtn = document.querySelector('.my-next') as HTMLButtonElement;
    
    if (prevBtn) prevBtn.disabled = state.isFirstItemVisible;
    if (nextBtn) nextBtn.disabled = state.isLastItemVisible;
  }
};
```

### Progress Bar

```ts
const progressBar: MotionRailExtension = {
  name: 'progress-bar',
  onInit: (motionRail, state) => {
    const container = motionRail.getOptions();
    const progressEl = document.createElement('div');
    progressEl.className = 'progress-bar';
    progressEl.style.cssText = 'height: 4px; background: #ccc; position: relative;';
    
    const bar = document.createElement('div');
    bar.className = 'progress-bar-fill';
    bar.style.cssText = 'height: 100%; background: #007bff; width: 0; transition: width 0.3s;';
    
    progressEl.appendChild(bar);
    // Insert progress bar before carousel
  },
  onUpdate: (motionRail, state) => {
    const bar = document.querySelector('.progress-bar-fill') as HTMLElement;
    if (bar && state.totalItems > 0) {
      const progress = ((state.visibleItemIndexes[0] + 1) / state.totalItems) * 100;
      bar.style.width = `${progress}%`;
    }
  }
};
```

### Keyboard Navigation

```ts
const keyboardNav: MotionRailExtension = {
  name: 'keyboard-navigation',
  onInit: (motionRail, state) => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') motionRail.prev();
      if (e.key === 'ArrowRight') motionRail.next();
    };
    
    document.addEventListener('keydown', handleKeydown);
    
    // Store for cleanup
    (motionRail as any)._keyboardHandler = handleKeydown;
  },
  onDestroy: (motionRail, state) => {
    const handler = (motionRail as any)._keyboardHandler;
    if (handler) {
      document.removeEventListener('keydown', handler);
    }
  }
};
```

### External State Sync

```ts
const stateSync: MotionRailExtension = {
  name: 'state-sync',
  onUpdate: (motionRail, state) => {
    // Sync to external state management (Redux, Vuex, etc.)
    window.dispatchEvent(new CustomEvent('carousel-state-change', {
      detail: state
    }));
  }
};
```

## TypeScript Support

Full TypeScript support with type checking:

```ts
import { MotionRail } from 'motionrail';
import type { MotionRailExtension, MotionRailState } from 'motionrail';

const typedExtension: MotionRailExtension = {
  name: 'typed-extension',
  onInit: (motionRail: MotionRail, state: MotionRailState) => {
    // Full type checking and autocomplete
    console.log(state.totalItems);
    motionRail.play();
  }
};
```

## Next Steps

- [Creating Custom Extensions](/docs/extensions/custom) - Detailed guide
- [Built-in Extensions](/docs/extensions/) - Arrows, Dots, Thumbnails, Logger
- [MotionRail Class](/docs/api/class/motionrail)
- [MotionRailState](/docs/api/types/motionrail-state)
