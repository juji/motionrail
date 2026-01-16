# Creating Custom Extensions

Learn how to build your own MotionRail extensions.

## Extension API

Extensions are objects that implement lifecycle hooks to interact with the carousel.

```ts
interface MotionRailExtension {
  name: string;
  onInit?: (motionRail: MotionRail, state: MotionRailState) => void;
  onUpdate?: (motionRail: MotionRail, state: MotionRailState) => void;
  onDestroy?: (motionRail: MotionRail, state: MotionRailState) => void;
}
```

## State Object

The state object passed to `onInit`, `onUpdate`, and `onDestroy`:

```ts
interface MotionRailState {
  totalItems: number;              // Total number of items in carousel
  visibleItemIndexes: number[];    // Array of currently visible item indexes
  isFirstItemVisible: boolean;     // Whether the first item is visible
  isLastItemVisible: boolean;      // Whether the last item is visible
}
```

## Lifecycle Hooks

### `onInit(motionRail, state)`

Called once when the carousel is initialized.

**Parameters:**
- `motionRail`: MotionRail instance with API methods
- `state`: Initial carousel state

**Use for:**
- Creating DOM elements
- Setting up event listeners
- Initial configuration

```js
onInit(motionRail, state) {
  console.log('Carousel initialized with', state.totalItems, 'items');
  // Create UI elements
  // Attach event listeners
}
```

### `onUpdate(motionRail, state)`

Called whenever the carousel state changes (navigation, resize, etc).

**Parameters:**
- `motionRail`: MotionRail instance with API methods
- `state`: Updated carousel state

**Use for:**
- Updating UI based on state
- Responding to navigation
- Syncing external elements

```js
onUpdate(motionRail, state) {
  console.log('Visible items:', state.visibleItemIndexes);
  // Update UI elements
  // Sync with other components
}
```

### `onDestroy(motionRail, state)`

Called when the carousel is destroyed.

**Parameters:**
- `motionRail`: MotionRail instance
- `state`: Final carousel state

**Use for:**
- Cleanup event listeners
- Remove DOM elements
- Release resources

```js
onDestroy(motionRail, state) {
  // Remove event listeners
  // Clean up DOM
  // Release resources
}
```

## Simple Example

A counter that tracks visible items:

```js
function Counter() {
  let counterElement;

  return {
    name: 'counter',
    onInit(motionRail, state) {
      counterElement = document.createElement('div');
      counterElement.textContent = `Showing ${state.visibleItemIndexes.length} of ${state.totalItems}`;
      motionRail.container.appendChild(counterElement);
    },

    onUpdate(motionRail, state) {
      counterElement.textContent = `Showing ${state.visibleItemIndexes.length} of ${state.totalItems}`;
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
    name: 'custom-controls',
    onInit(motionRail, state) {
      // Create buttons
      const container = document.createElement('div');
      container.className = 'custom-controls';

      prevBtn = document.createElement('button');
      prevBtn.textContent = 'Previous';
      prevBtn.onclick = () => motionRail.prev();

      nextBtn = document.createElement('button');
      nextBtn.textContent = 'Next';
      nextBtn.onclick = () => motionRail.next();

      container.append(prevBtn, nextBtn);
      motionRail.container.appendChild(container);
    },

    onUpdate(motionRail, state) {
      // Disable prev when at start
      prevBtn.disabled = state.isFirstItemVisible;
      
      // Disable next when at end
      nextBtn.disabled = state.isLastItemVisible;
    },

    onDestroy() {
      prevBtn?.remove();
      nextBtn?.remove();
    }
  };
}
```

## Progress Bar Example

A progress indicator showing first/last item visibility:

```js
function ProgressBar() {
  let progressElement;

  return {
    name: 'progress-bar',
    onInit(motionRail, state) {
      progressElement = document.createElement('div');
      progressElement.className = 'carousel-progress';
      
      const bar = document.createElement('div');
      bar.className = 'carousel-progress-bar';
      progressElement.appendChild(bar);
      
      motionRail.container.appendChild(progressElement);
    },

    onUpdate(motionRail, state) {
      const bar = progressElement.querySelector('.carousel-progress-bar');
      // Calculate progress based on scroll position
      const scrollPercentage = (motionRail.container.querySelector('.motionrail-container').scrollLeft / 
        (motionRail.container.querySelector('.motionrail-container').scrollWidth - 
         motionRail.container.querySelector('.motionrail-container').clientWidth)) * 100;
      bar.style.width = `${scrollPercentage}%`;
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
    name: 'keyboard-controls',
    onInit(motionRail, state) {
      handleKeydown = (e) => {
        if (e.key === 'ArrowLeft') {
          motionRail.prev();
        } else if (e.key === 'ArrowRight') {
          motionRail.next();
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

## External Sync Example

Sync carousel with external UI elements:

```js
function ExternalSync(config) {
  const { thumbnailContainer } = config;

  return {
    name: 'external-sync',
    onInit(motionRail, state) {
      // Create thumbnail buttons for each item
      for (let i = 0; i < state.totalItems; i++) {
        const btn = document.createElement('button');
        btn.textContent = i + 1;
        btn.onclick = () => motionRail.scrollToIndex(i);
        thumbnailContainer.appendChild(btn);
      }
    },

    onUpdate(motionRail, state) {
      // Update active thumbnails based on visible items
      const buttons = thumbnailContainer.querySelectorAll('button');
      buttons.forEach((btn, i) => {
        btn.classList.toggle('active', state.visibleItemIndexes.includes(i));
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
    name: 'my-extension',
    onInit(motionRail: MotionRail, state: MotionRailState) {
      element = document.createElement('div');
      element.textContent = `Total items: ${state.totalItems}`;
      motionRail.container.appendChild(element);
    },

    onUpdate(motionRail: MotionRail, state: MotionRailState) {
      if (element) {
        element.textContent = `Visible: ${state.visibleItemIndexes.join(', ')}`;
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
onDestroy(motionRail, state) {
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
onUpdate(motionRail, state) {
  if (!element) return;
  element.textContent = `${state.visibleItemIndexes.length} visible`;
}
```

### Use Configuration

Make extensions configurable:

```js
function MyExtension(config = {}) {
  const { enabled = true, className = 'default' } = config;
  
  return {
    name: 'my-extension',
    onInit(motionRail, state) {
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
    name: 'my-extension',
    onInit(motionRail, state) {
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
