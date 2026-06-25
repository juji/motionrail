<script setup lang="ts">
import { MotionRail } from "motionrail/vue";
import { VistaViewLightbox } from "motionrail/extensions/vistaview";
import "motionrail/style.css";
import "vistaview/style.css";

const options = {
  extensions: [VistaViewLightbox()],
};
</script>

<template>
  <MotionRail :options="options">
    <div class="demo-slide" v-for="i in 6" :key="i">
      <a :href="`https://picsum.photos/seed/vv${i}/800/600`">
        <img
          :src="`https://picsum.photos/seed/vv${i}/400/300`"
          :alt="`VistaView Demo ${i}`"
          loading="lazy"
        />
      </a>
    </div>
  </MotionRail>
</template>

<style scoped>
.demo-slide {
  width: 100%;
  height: 300px;
  overflow: hidden;
}

.demo-slide a {
  display: block;
  width: 100%;
  height: 100%;
}

.demo-slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
</style>
