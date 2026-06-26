<script setup lang="ts">
import HomeInfinite from "./home-infinite.vue";
</script>

<template>
  <div class="infinite-section">
    <div class="container">
      <div class="section-content">
        <h2 class="section-title">Infinite Scroll</h2>
        <p class="section-description">
          Enable seamless looping with <code>infinite: true</code>. Swipe past
          the last item and it wraps back to the first — no jumps, no flicker.
          Works with drag, touch, autoplay, and arrow navigation.
        </p>
      </div>
      <div class="section-demo">
        <HomeInfinite />
      </div>
    </div>
  </div>
</template>

<style scoped>
.infinite-section {
  padding: 96px 48px;
  padding-top: 0;
}

.container {
  max-width: 1152px;
  margin: 0 auto;
  display: block;
  padding-top: 48px;
  border-top: 1px solid var(--vp-c-divider);
}

.section-content {
  text-align: center;
  margin-bottom: 48px;
}

.section-title {
  font-size: 32px;
  font-weight: 700;
  line-height: 1.2;
  color: var(--vp-c-text-1);
  margin: 0 0 16px 0;
  border: none;
  padding-top: 0;
}

.section-description {
  font-size: 18px;
  line-height: 1.5;
  color: var(--vp-c-text-2);
  margin: 0 auto;
  max-width: 420px;
}

.section-description code {
  font-size: 15px;
  color: var(--vp-c-brand-1);
  background: var(--vp-c-default-soft);
  padding: 2px 6px;
  border-radius: 4px;
}

.section-demo {
  max-width: 600px;
  margin: 0 auto;
}

@media (min-width: 1024px) {
  .container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 48px;
  }

  .section-content {
    text-align: left;
    margin-bottom: 0;
  }

  .section-description {
    margin: 0;
  }

  .section-demo {
    margin: 0;
  }
}
</style>
