<script setup lang="ts">
import { Icon } from '@iconify/vue';
import HeroMotionRail from './hero-motionrail.vue';
</script>

<template>
  <div class="hero-section">
    <div class="container">
      <div class="hero-content">
        <h1 class="name">MotionRail</h1>
        <p class="text">Carousel Library</p>
        <p class="tagline">A lightweight carousel library for modern web applications</p>
        
        <div class="actions">
          <a class="action-button brand" href="/docs">Read The Docs</a>
          <a class="action-button alt" href="https://github.com/juji/motionrail">Github</a>
        </div>

        <div class="frameworks">
          <a href="/docs/frameworks/react" class="framework-icon" aria-label="React">
            <Icon icon="skill-icons:react-dark" />
          </a>
          <a href="/docs/frameworks/preact" class="framework-icon" aria-label="Preact">
            <Icon icon="logos:preact" />
          </a>
          <a href="/docs/frameworks/solid" class="framework-icon" aria-label="Solid">
            <Icon icon="logos:solidjs-icon" />
          </a>
          <a href="/docs/frameworks/vue" class="framework-icon" aria-label="Vue">
            <Icon icon="skill-icons:vuejs-dark" />
          </a>
          <a href="/docs/frameworks/svelte" class="framework-icon" aria-label="Svelte">
            <Icon icon="skill-icons:svelte" />
          </a>
          <a href="/docs/frameworks/qwik" class="framework-icon" aria-label="Qwik">
            <Icon icon="devicon:qwik" />
          </a>
        </div>
        
      </div>
      <div class="hero-demo">
        <HeroMotionRail />
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 1152px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 48px;
  align-items: center;
}

.hero-content {
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 8px;
  order: 2;

  p, h1 {
    margin: 0;
  }
}

.hero-demo {
  display: block;
  order: 1;
  width: 100%;
  margin: 0 auto;
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
  font-size: 32px;
  line-height: 1;
  padding-bottom: 21px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.tagline {
  font-size: 18px;
  font-weight: 500;
  line-height: 1.42;
  color: var(--vp-c-text-2);
  max-width: 300px;
  margin: 0 auto;
  align-self: center;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 24px;
  justify-content: center;
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

.frameworks {
  display: flex;
  gap: 16px;
  margin-top: 32px;
  justify-content: center;
  flex-wrap: wrap;
}

.framework-icon {
  width: 40px;
  height: 40px;
  transition: transform 0.25s, opacity 0.25s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.framework-icon:hover {
  transform: scale(1.15);
  opacity: 0.8;
}

.framework-icon svg {
  width: 100%;
  height: 100%;
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
    max-width: 400px;
  }
}

@media screen and (min-width: 1024px) {

  .container{
    grid-template-columns: 1fr 1fr;
  }

  .hero-content {
    order: 1;
  }

  .hero-demo {
    order: 2;
  }

  .name {
    text-align: left;
  }

  .text {
    text-align: left;
  }

  .tagline {
    max-width: 400px;
    align-self: flex-start;
    text-align: left;
  }

  .actions {
    justify-content: flex-start;
  }

  .frameworks {
    justify-content: flex-start;
  }
}
</style>
