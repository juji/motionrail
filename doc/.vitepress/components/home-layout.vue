<script setup lang="ts">
</script>

<template>
  <div class="home-layout">
    <div class="hero-section">
      <div class="container">
        <div class="hero-content">
          <h1 class="name">MotionRail</h1>
          <p class="text">Smooth Carousel Library</p>
          <p class="tagline">A lightweight carousel library with momentum-based scrolling, snap alignment, and responsive breakpoints</p>
          
          <div class="actions">
            <a class="action-button brand" href="/docs">Read The Docs</a>
            <a class="action-button alt" href="https://github.com/juji/motionrail">Github</a>
          </div>
        </div>
        <div class="hero-demo">
          <!-- Empty for now -->
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-layout {
  padding: 0;
  margin: 0;
}

.container {
  max-width: 1152px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: center;
}

.hero-content {
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 8px;

  p, h1 {
    margin: 0;
  }
}

.hero-demo {
  /* Empty for now */;
}

.name {
  font-size: 48px;
  font-weight: 700;
  line-height: 1.2;
  background: linear-gradient(315deg, var(--vp-c-brand-1) 25%, var(--vp-c-brand-2));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.text {
  font-size: 320;
  line-height: 1.4;
  color: var(--vp-c-text-1);
}

.tagline {
  font-size: 20px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 24px;
  justify-content: flex-start;
}

.action-button {
  display: inline-block;
  border: 1px solid transparent;
  text-align: center;
  font-weight: 600;
  white-space: nowrap;
  transition: color 0.25s, border-color 0.25s, background-color 0.25s;
  padding: 0 20px;
  line-height: 38px;
  font-size: 14px;
  border-radius: 20px;
  text-decoration: none;
}

.action-button.brand {
  border-color: var(--vp-button-brand-border);
  color: var(--vp-button-brand-text);
  background-color: var(--vp-button-brand-bg);
}

.action-button.brand:hover {
  border-color: var(--vp-button-brand-hover-border);
  color: var(--vp-button-brand-hover-text);
  background-color: var(--vp-button-brand-hover-bg);
}

.action-button.alt {
  border-color: var(--vp-button-alt-border);
  color: var(--vp-button-alt-text);
  background-color: var(--vp-button-alt-bg);
}

.action-button.alt:hover {
  border-color: var(--vp-button-alt-hover-border);
  color: var(--vp-button-alt-hover-text);
  background-color: var(--vp-button-alt-hover-bg);
}

@media (min-width: 768px) {
  .hero-section {
    padding: 96px 48px;
  }

  .name {
    font-size: 64px;
  }

  .text {
    font-size: 40px;
  }

  .tagline {
    font-size: 24px;
  }
}
</style>


@media (max-width: 767px) {
  .container {
    grid-template-columns: 1fr;
  }

  .hero-demo {
    display: none;
  }
}