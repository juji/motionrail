# Creating Custom Extensions

Learn how to build your own MotionRail extensions.

## Extension API

Extensions are objects that implement lifecycle hooks to interact with the carousel.

```ts
interface MotionRailExtension {
  onInit?: (state: MotionRailState, instance: MotionRail) => void;
  onUpdate?: (state: MotionRailState, instance: MotionRail) => void;
  onDestroy?: () => void;
}
```

## State Object

The state object passed to `onInit` and `onUpdate`:

```ts
interface MotionRailState {
  index: number;      // Current slide index
  itemsCount: number; // Total number of items
  columns: number;    // Columns per view
  gap: string;        // Gap between items
  isPlaying: boolean; // Autoplay status
}
```

## Lifecycle Hooks

### `onInit(state, instance)`

Called once when the carousel is initialized.

**Parameters:**
- `state`: Initial carousel state
- `instance`: MotionRail instance with API methods

**Use for:**
- Creating DOM elements
- Setting up event listeners
- Initial configuration

```js
onInit(state, instance) {
  console.log('Carousel initialized with', state.itemsCount, 'items');
  // Create UI elements
  // Attach event listeners
}
```

### `onUpdate(state, instance)`

Called whenever the carousel state changes (navigation, resize, etc).

**Parameters:**
- `state`: Updated carousel state
- `instance`: MotionRail instance with API methods

**Use for:**
- Updating UI based on state
- Responding to navigation
- Syncing external elements

```js
onUpdate(state, instance) {
  console.log('Now showing item', state.index);
  // Update UI elements
  // Sync with other components
}
```

### `onDestroy()`

Called when the carousel is destroyed.

**Use for:**
- Cleanup event listeners
- Remove DOM elements
- Release resources

```js
onDestroy() {
  // Remove event listeners
  // Clean up DOM
  // Release resources
}
```

## Simple Example

A counter that tracks carousel navigation:

```js
function Counter() {
  let counterElement;

  return {
    onInit(state, instance) {
      counterElement = document.createElement('div');
      counterElement.textContent = `Item ${state.index + 1} of ${state.itemsCount}`;
      instance.container.appendChild(counterElement);
    },

    onUpdate(state) {
      counterElement.textContent = `Item ${state.index + 1} of ${state.itemsCount}`;
    },

    onDestroy() {
      counterElement?.remove();
    }
  };
}

// Usage
new MotionRail(element, {
  extensions: [Counter()]
});
```

## Navigation Controls Example

A custom navigation extension:

```js
function CustomControls() {
  let prevBtn, nextBtn;

  return {
    onInit(state, instance) {
      // Create buttons
      const container = document.createElement('div');
      container.className = 'custom-controls';

      prevBtn = document.createElement('button');
      prevBtn.textContent = 'Previous';
      prevBtn.onclick = () => instance.prev();

      nextBtn = document.createElement('button');
      nextBtn.textContent = 'Next';
      nextBtn.onclick = () => instance.next();

      container.append(prevBtn, nextBtn);
      instance.container.appendChild(container);
    },

    onUpdate(state) {
      // Disable prev on first item
      prevBtn.disabled = state.index === 0;
      
      // Disable next on last item
      const lastIndex = state.itemsCount - state.columns;
      nextBtn.disabled = state.index >= lastIndex;
    },

    onDestroy() {
      prevBtn?.remove();
      nextBtn?.remove();
    }
  };
}
```

## Progress Bar Example

A progress indicator that shows scroll position:

```js
function ProgressBar() {
  let progressElement;

  return {
    onInit(state, instance) {
      progressElement = document.createElement('div');
      progressElement.className = 'carousel-progress';
      
      const bar = document.createElement('div');
      bar.className = 'carousel-progress-bar';
      progressElement.appendChild(bar);
      
      instance.container.appendChild(progressElement);
    },

    onUpdate(state) {
      const bar = progressElement.querySelector('.carousel-progress-bar');
      const totalSlides = state.itemsCount - state.columns + 1;
      const progress = ((state.index + 1) / totalSlides) * 100;
      bar.style.width = `${progress}%`;
    },

    onDestroy() {
      progressElement?.remove();
    }
  };
}
```

**CSS:**

```css
.carousel-progress {
  width: 100%;
  height: 4px;
  background: #e0e0e0;
  margin-top: 16px;
}

.carousel-progress-bar {
  height: 100%;
  background: #007bff;
  transition: width 0.3s ease;
}
```

## Keyboard Navigation Example

Add keyboard controls to the carousel:

```js
function KeyboardControls() {
  let handleKeydown;

  return {
    onInit(state, instance) {
      handleKeydown = (e) => {
        if (e.key === 'ArrowLeft') {
          instance.prev();
        } else if (e.key === 'ArrowRight') {
          instance.next();
        }
      };

      document.addEventListener('keydown', handleKeydown);
    },

    onDestroy() {
      if (handleKeydown) {
        document.removeEventListener('keydown', handleKeydown);
      }
    }
  };
}
```

## Autoplay Toggle Example

A play/pause button for autoplay control:

```js
function PlayPauseButton() {
  let button;

  return {
    onInit(state, instance) {
      button = document.createElement('button');
      button.className = 'play-pause-btn';
      
      button.onclick = () => {
        const currentState = instance.getState();
        if (currentState.isPlaying) {
          instance.pause();
        } else {
          instance.play();
        }
      };

      instance.container.appendChild(button);
    },

    onUpdate(state) {
      button.textContent = state.isPlaying ? 'Pause' : 'Play';
    },

    onDestroy() {
      button?.remove();
    }
  };
}
```

## External Sync Example

Sync carousel with external UI elements:

```js
function ExternalSync(config) {
  const { thumbnailContainer } = config;

  return {
    onInit(state, instance) {
      // Create thumbnail buttons
      for (let i = 0; i < state.itemsCount; i++) {
        const btn = document.createElement('button');
        btn.textContent = i + 1;
        btn.onclick = () => instance.scrollToIndex(i);
        thumbnailContainer.appendChild(btn);
      }
    },

    onUpdate(state) {
      // Update active thumbnail
      const buttons = thumbnailContainer.querySelectorAll('button');
      buttons.forEach((btn, i) => {
        btn.classList.toggle('active', i === state.index);
      });
    },

    onDestroy() {
      thumbnailContainer.innerHTML = '';
    }
  };
}

// Usage
const thumbnailContainer = document.getElementById('thumbnails');

new MotionRail(element, {
  extensions: [ExternalSync({ thumbnailContainer })]
});
```

## TypeScript Support

Full type definitions:

```ts
import type { MotionRail, MotionRailState, MotionRailExtension } from 'motionrail';

function MyExtension(): MotionRailExtension {
  let element: HTMLElement | null = null;

  return {
    onInit(state: MotionRailState, instance: MotionRail) {
      element = document.createElement('div');
      instance.container.appendChild(element);
    },

    onUpdate(state: MotionRailState, instance: MotionRail) {
      if (element) {
        element.textContent = `Index: ${state.index}`;
      }
    },

    onDestroy() {
      element?.remove();
    }
  };
}
```

## Best Practices

### Cleanup Resources

Always clean up in `onDestroy`:

```js
onDestroy() {
  // Remove event listeners
  document.removeEventListener('keydown', handleKeydown);
  
  // Remove DOM elements
  element?.remove();
  
  // Clear references
  element = null;
}
```

### Handle Missing Container

Check if elements exist before manipulating:

```js
onUpdate(state, instance) {
  if (!element) return;
  element.textContent = `${state.index}`;
}
```

### Use Configuration

Make extensions configurable:

```js
function MyExtension(config = {}) {
  const { enabled = true, className = 'default' } = config;
  
  return {
    onInit(state, instance) {
      if (!enabled) return;
      // Use config...
    }
  };
}
```

### Prevent Memory Leaks

Store references properly:

```js
function MyExtension() {
  let listeners = [];

  return {
    onInit(state, instance) {
      const handler = () => { /* ... */ };
      listeners.push(handler);
      document.addEventListener('click', handler);
    },

    onDestroy() {
      listeners.forEach(handler => {
        document.removeEventListener('click', handler);
      });
      listeners = [];
    }
  };
}
```

## Next Steps

- [Extensions Overview](/docs/extensions/) - Understanding the extension system
- [Arrows Extension](/docs/extensions/arrows) - Example extension source
- [Dots Extension](/docs/extensions/dots) - Another example
- [API Reference](/docs/api) - Complete API documentation
