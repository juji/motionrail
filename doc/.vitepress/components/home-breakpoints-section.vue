<script setup lang="ts">
import HomeBreakpoints from "./home-breakpoints.vue";
import ResizableContainer from "./ResizableContainer.vue";
</script>

<template>
  <div class="breakpoints-section">
    <div class="container">
      <div class="section-content">
        <h2 class="section-title">Responsive Breakpoints</h2>
        <p class="section-description">
          Automatically adjust the number of columns based on screen size.
          Configure different layouts for different viewport widths.
        </p>
        <p class="resize-hint">
          👉 Drag the edges to resize and see breakpoints in action!
        </p>
      </div>
      <div class="section-demo">
        <ResizableContainer :min-width="280">
          <HomeBreakpoints />
        </ResizableContainer>
        <a href="/docs/breakpoints" class="demo-link"
          >Learn more about Breakpoints →</a
        >
      </div>
    </div>
  </div>
</template>

<style scoped>
.breakpoints-section {
  padding: 96px 48px;
  padding-top: 0px;
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
  max-width: 640px;
}

.resize-hint {
  font-size: 16px;
  line-height: 1.5;
  color: var(--vp-c-brand-1);
  margin: 12px auto 0;
  max-width: 520px;
  font-weight: 500;
}

.section-demo {
  max-width: 100%;
  margin: 0 auto;
}

.demo-link {
  display: block;
  text-align: center;
  margin-top: 24px;
  font-size: 16px;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  text-decoration: none;
}

.demo-link:hover {
  color: var(--vp-c-brand-2);
  text-decoration: underline;
}

@media (min-width: 1024px) {
  .section-demo {
    max-width: 1152px;
  }
}
</style>
