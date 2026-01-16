<script setup lang="ts">
import MotionRail from 'motionrail/vue';
import { Arrows } from 'motionrail/extensions/arrows';
import { Thumbnails } from 'motionrail/extensions/thumbnails';
import 'motionrail/style.css';
import 'motionrail/extensions/arrows/style.css';
import 'motionrail/extensions/thumbnails/style.css';

const options = {
  autoplay: true,
  extensions: [
    Arrows(),
    Thumbnails({ thumbnailHeight: 60 }),
  ],
};
</script>

<template>
  <div class="home-layout">
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
        </div>
        <div class="hero-demo">
          <MotionRail :options="options">
            <div class="demo-slide">
              <img src="https://picsum.photos/seed/motionrail1/600/400" alt="Demo 1">
            </div>
            <div class="demo-slide">
              <img src="https://picsum.photos/seed/motionrail2/600/400" alt="Demo 2">
            </div>
            <div class="demo-slide">
              <img src="https://picsum.photos/seed/motionrail3/600/400" alt="Demo 3">
            </div>
          </MotionRail>
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
  grid-template-columns: 1fr;
  gap: 48px;
  align-items: center;

  @media screen and (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
  }
}

.hero-content {
  text-align: left;
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
  /* max-width: 500px; */
  margin: 0 auto;
}

.demo-slide {
  width: 100%;
  height: 300px;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  overflow: hidden;
}

.demo-slide.centered {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.demo-slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@media screen and (min-width: 1024px) {
  .hero-content {
    order: 1;
  }

  .hero-demo {
    order: 2;
  }
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


