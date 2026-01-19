<script setup lang="ts">
import { MotionRail } from "motionrail/vue";
import { Dots } from "motionrail/extensions/dots";
import "motionrail/style.css";
import "motionrail/extensions/dots/style.css";

const options = {
  autoplay: true,
  extensions: [Dots({ showIndex: true, dotSize: 34, fontSize: 12 })],
};
</script>

<template>
  <MotionRail :options="options">
    <div class="demo-slide" v-for="i in 99" :key="i">
      <img
        :src="`https://picsum.photos/seed/extensions${i}/600/400`"
        :alt="`Extensions Demo ${i}`"
        loading="lazy"
      />
    </div>
  </MotionRail>
</template>

<style scoped>
.demo-slide {
  width: 100%;
  height: 300px;
  background: var(--vp-c-bg-soft);
  overflow: hidden;
}

.demo-slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
