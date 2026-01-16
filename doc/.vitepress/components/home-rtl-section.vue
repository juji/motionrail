<script setup lang="ts">
import HomeRtl from './home-rtl.vue';
</script>

<template>
  <div class="rtl-section">
    <div class="container">
      <div class="section-content">
        <h2 class="section-title">RTL Support</h2>
        <p class="section-description">Built-in right-to-left language support for Arabic, Hebrew, and other RTL languages.</p>
      </div>
      <div class="section-demo" dir="rtl">
        <HomeRtl />
      </div>
    </div>
  </div>
</template>

<style scoped>
.rtl-section {
  padding: 96px 48px;
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

  .section-demo {
    margin: 0;
  }
}
</style>
