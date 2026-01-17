<script setup>
import { onMounted, ref } from 'vue';
import { MotionRail } from 'motionrail';
import 'motionrail/style.css';

const carouselRef = ref(null);

onMounted(() => {
  if (carouselRef.value) {
    new MotionRail(carouselRef.value, {
      autoplay: true,
      breakpoints: [
        { columns: 1, gap: '16px' },
        { width: 400, columns: 2, gap: '16px' },
        { width: 550, columns: 3, gap: '20px' }
      ]
    });
  }
});
</script>

<template>
  <div ref="carouselRef" data-motionrail id="carousel" style="margin: 20px 0;">
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
</template>

<style scoped>
[data-motionrail-grid] > div {
  background: #f0f0f0;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 500;
  color: #333;
  height: 200px;
}
</style>
