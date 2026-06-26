<script setup lang="ts">
import { MotionRail } from "motionrail/vue";
import { Arrows } from "motionrail/extensions/arrows";
import { Dots } from "motionrail/extensions/dots";
import "motionrail/style.css";
import "motionrail/extensions/arrows/style.css";
import "motionrail/extensions/dots/style.css";

const options = {
  infinite: true,
  autoplay: true,
  extensions: [Arrows(), Dots()],
};
</script>

<template>
  <MotionRail :options="options">
    <div class="demo-slide slide-1">1</div>
    <div class="demo-slide slide-2">2</div>
    <div class="demo-slide slide-3">3</div>
    <div class="demo-slide slide-4">4</div>
    <div class="demo-slide slide-5">5</div>
  </MotionRail>
</template>

<style scoped>
.demo-slide {
  width: 100%;
  height: 200px;
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

.slide-4 {
  background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
}

.slide-5 {
  background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
}
</style>
