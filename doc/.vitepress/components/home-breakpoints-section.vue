<script setup lang="ts">
import HomeBreakpoints from './home-breakpoints.vue';
import ResizableContainer from './ResizableContainer.vue';
</script>

<template>
  <div class="breakpoints-section">
    <div class="container">
      <div class="section-content">
        <h2 class="section-title">Responsive Breakpoints</h2>
        <p class="section-description">Configure different layouts for different screen sizes. Show 1 slide on mobile, 2 on tablet, 4 on desktop.</p>
        <p class="resize-hint">👉 Drag the edges to resize and see breakpoints in action!</p>
      </div>
      <div class="section-demo">
        <ResizableContainer :min-width="280">
          <HomeBreakpoints />
        </ResizableContainer>
      </div>
    </div>
  </div>
</template>

<style scoped>
.breakpoints-section {
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
 

.resize-hint {
  font-size: 16px;
  line-height: 1.5;
  color: var(--vp-c-brand-1);
  margin: 12px auto 0;
  max-width: 520px;
  font-weight: 500;
} color: var(--vp-c-text-2);
  margin: 0 auto;
  max-width: 520px;
}

.section-demo {
  max-width: 100%;
  margin: 0 auto;
}

@media (min-width: 1024px) {
  .section-demo {
    max-width: 1152px;
  }
}
</style>
