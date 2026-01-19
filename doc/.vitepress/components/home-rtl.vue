<script setup lang="ts">
import { MotionRail } from "motionrail/vue";
import { Arrows } from "motionrail/extensions/arrows";
import { Thumbnails } from "motionrail/extensions/thumbnails";
import "motionrail/style.css";
import "motionrail/extensions/arrows/style.css";
import "motionrail/extensions/thumbnails/style.css";

const options = {
  rtl: true,
  autoplay: true,
  extensions: [Arrows(), Thumbnails({ thumbnailHeight: 60 })],
};
</script>

<template>
  <MotionRail :options="options">
    <div class="demo-slide centered slide-1">1</div>
    <div class="demo-slide centered slide-2">2</div>
    <div class="demo-slide centered slide-3">3</div>
  </MotionRail>
</template>

<style scoped>
.demo-slide {
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.demo-slide.centered {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 34px;
  font-weight: 700;
  color: white;
}

.slide-1 {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.slide-2 {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.slide-3 {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}
</style>
