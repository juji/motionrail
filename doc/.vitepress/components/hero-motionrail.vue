<script setup lang="ts">
import MotionRail from 'motionrail/vue';
import { Arrows } from 'motionrail/extensions/arrows';
import { Thumbnails } from 'motionrail/extensions/thumbnails';
import 'motionrail/style.css';
import 'motionrail/extensions/arrows/style.css';
import 'motionrail/extensions/thumbnails/style.css';

const options = {
  autoplay: true,
  extensions: [
    Arrows(),
    Thumbnails({ thumbnailHeight: 60 }),
  ],
};
</script>

<template>
  <MotionRail :options="options">
    <div class="demo-slide">
      <img src="https://picsum.photos/seed/motionrail1/600/400" alt="Demo 1">
    </div>
    <div class="demo-slide">
      <img src="https://picsum.photos/seed/motionrail2/600/400" alt="Demo 2">
    </div>
    <div class="demo-slide">
      <img src="https://picsum.photos/seed/motionrail3/600/400" alt="Demo 3">
    </div>
  </MotionRail>
</template>

<style scoped>
.demo-slide {
  width: 100%;
  height: 300px;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  overflow: hidden;
}

.demo-slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
