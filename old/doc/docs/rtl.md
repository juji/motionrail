# RTL (Right-to-Left) Support

MotionRail provides built-in support for right-to-left languages such as Arabic, Hebrew, and other RTL languages.

## Configuration

Enable RTL mode by setting the `rtl` option to `true`:

```ts
const carousel = new MotionRail(container, {
  rtl: true
});
```

## How RTL Works

When RTL mode is enabled:
- The carousel scrolls from right to left instead of left to right
- Navigation arrows are reversed (right arrow goes to previous, left arrow goes to next)
- Thumbnails and dots order is reversed
- All directional logic is automatically adjusted

## Example

Here's a complete example using Vue with RTL enabled:

<script setup>
import HomeRtl from '../.vitepress/components/home-rtl.vue';
</script>

### Live Demo

<div dir="rtl" style="max-width: 600px; margin: 32px auto;">
  <HomeRtl />
</div>

### Code (Simplified)

```vue {7,14}
<script setup lang="ts">
// ... other imports
import { MotionRail } from 'motionrail/vue';


const options = {
  rtl: true,
  // ... other options 
};
</script>

<template>
  <!-- dont't forget the dir="rtl" attribute -->
  <div dir="rtl"> 
    <MotionRail :options="options">
      <div class="demo-slide centered slide-1">1</div>
      <div class="demo-slide centered slide-2">2</div>
      <div class="demo-slide centered slide-3">3</div>
    </MotionRail>
  </div>
</template>

<style scoped>
/* truncated */
</style>
```

::: tip HTML DIR ATTRIBUTE
Don't forget to add the `dir="rtl"` attribute to the container element (or a parent element) to properly set the text direction for RTL languages.
:::

## Framework Examples

### React

```tsx {7,14}
import { MotionRail } from 'motionrail/react';
import { Arrows } from 'motionrail/extensions/arrows';
import 'motionrail/style.css';
import 'motionrail/extensions/arrows/style.css';

const options = {
  rtl: true,
  extensions: [Arrows()]
};

function RTLCarousel() {

  return (
    <div dir="rtl">
      <MotionRail options={options}>
        <div className="slide">Slide 1</div>
        <div className="slide">Slide 2</div>
        <div className="slide">Slide 3</div>
      </MotionRail>
    </div>
  );
}
```

### Vanilla JavaScript

```js {9}
import { MotionRail } from 'motionrail';
import { Arrows } from 'motionrail/extensions/arrows';
import 'motionrail/style.css';
import 'motionrail/extensions/arrows/style.css';

const container = document.querySelector('.carousel-container');

const carousel = new MotionRail(container, {
  rtl: true,
  extensions: [Arrows()]
});
```
```html {1}
<div data-motionrail class="carousel-container" dir="rtl">
  <div data-motionrail-scrollable>
    <div data-motionrail-grid>
      <div>Item 1</div>
      <div>Item 2</div>
      <div>Item 3</div>
    </div>
  </div>
</div>
```

## See Also

- [Configuration](/docs/configuration) - All available configuration options
- [Arrows Extension](/docs/extensions/arrows) - Navigation arrows that work with RTL
- [Thumbnails Extension](/docs/extensions/thumbnails) - Thumbnail navigation with RTL support
