# Quick Start

## Basic Setup

### 1. HTML Structure

Create the carousel HTML structure with the required data attributes:

```html
<div data-motionrail id="carousel">
  <div data-motionrail-scrollable>
    <div data-motionrail-grid>
      <div>Item 1</div>
      <div>Item 2</div>
      <div>Item 3</div>
      <div>Item 4</div>
      <div>Item 5</div>
    </div>
  </div>
</div>

<style>
  #carousel [data-motionrail-grid] > div {
    background: #f0f0f0;
    border-radius: 8px;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    font-weight: 500;
    color: #333;
    height: 200px; /* YOU set the height, however you want */
  }
</style>
```

::: tip ABOUT HEIGHT
**The carousel height is not set by default**, giving you full control over your layout. You can set the height on individual items, or use any CSS approach that fits your design.
:::

**Structure layers:**

```
[data-motionrail]                    - Wrapper element
└── [data-motionrail-scrollable]     - Scrollable container with overflow and snap behavior
    └── [data-motionrail-grid]       - Grid layout container
        └── Direct children          - Carousel items
```

### 2. Import Styles & Initialize the Carousel

```js
import { MotionRail } from "motionrail";
import "motionrail/style.css";

const element = document.getElementById("carousel");
const carousel = new MotionRail(element, {
  // set autoplay true for this example
  autoplay: true,

  // set the breakpoints
  breakpoints: [
    { columns: 1, gap: "16px" },
    { width: 400, columns: 2, gap: "16px" },
    { width: 550, columns: 3, gap: "20px" },
  ],
});
```

<script setup>
import BasicExample from '../.vitepress/components/BasicExample.vue'
import ResizableContainer from '../.vitepress/components/ResizableContainer.vue'
</script>

### Result

**Try it yourself:** Drag the left or right edge to resize the container and see how the carousel responds to different breakpoints.

<ResizableContainer>
  <BasicExample />
</ResizableContainer>

## Using UMD (CDN)

If you prefer not to use a build tool, you can use the UMD version via CDN:

```html
<link
  rel="stylesheet"
  href="https://unpkg.com/motionrail@latest/dist/style.css"
/>

<div data-motionrail id="carousel">
  <div data-motionrail-scrollable>
    <div data-motionrail-grid>
      <div>Item 1</div>
      <div>Item 2</div>
      <div>Item 3</div>
      <div>Item 4</div>
      <div>Item 5</div>
    </div>
  </div>
</div>

<script src="https://unpkg.com/motionrail@latest/dist/motionrail.umd.cjs"></script>
<script>
  const carousel = new MotionRail(document.getElementById("carousel"), {
    autoplay: true,
    breakpoints: [
      { columns: 1, gap: "16px" },
      { width: 400, columns: 2, gap: "16px" },
      { width: 550, columns: 3, gap: "20px" },
    ],
  });
</script>
```

## Next Steps

- [Configuration](/docs/configuration) - Learn about all available options
- [Breakpoints](/docs/breakpoints) - Understand responsive configuration
- [API Methods](/docs/api) - Control the carousel programmatically
- [Extensions](/docs/extensions/) - Add arrows, dots, and more
