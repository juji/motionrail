<script setup lang="ts">
import { MotionRail } from 'motionrail/vue';
import 'motionrail/style.css';

const options = {
  autoplay: true,
  breakpoints: [
    { columns: 1, gap: '8px' },
    { width: 500, columns: 2, gap: '8px' },
    { width: 700, columns: 3, gap: '8px' },
  ],
};
</script>

<template>
  <MotionRail :options="options">
    <div class="demo-slide">
      <img src="https://picsum.photos/seed/breakpoint1/400/300" alt="Image 1">
    </div>
    <div class="demo-slide">
      <img src="https://picsum.photos/seed/breakpoint2/400/300" alt="Image 2">
    </div>
    <div class="demo-slide">
      <img src="https://picsum.photos/seed/breakpoint3/400/300" alt="Image 3">
    </div>
    <div class="demo-slide">
      <img src="https://picsum.photos/seed/breakpoint4/400/300" alt="Image 4">
    </div>
    <div class="demo-slide">
      <img src="https://picsum.photos/seed/breakpoint5/400/300" alt="Image 5">
    </div>
    <div class="demo-slide">
      <img src="https://picsum.photos/seed/breakpoint6/400/300" alt="Image 6">
    </div>
    <div class="demo-slide">
      <img src="https://picsum.photos/seed/breakpoint7/400/300" alt="Image 7">
    </div>
    <div class="demo-slide">
      <img src="https://picsum.photos/seed/breakpoint8/400/300" alt="Image 8">
    </div>
  </MotionRail>
</template>

<style scoped>
.demo-slide {
  width: 100%;
  height: 200px;
  background: var(--vp-c-bg-soft);
  overflow: hidden;
}

.demo-slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
