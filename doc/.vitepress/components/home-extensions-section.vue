<script setup lang="ts">
import HomeExtensions from "./home-extensions.vue";
import HomeVistaview from "./home-vistaview.vue";
</script>

<template>
  <div class="extensions-section">
    <div class="container">
      <div class="section-content">
        <h2 class="section-title">Powerful Extensions</h2>
        <p class="section-description">
          Extend functionality with built-in extensions:
          <a href="/docs/extensions/arrows">Arrows</a> for navigation controls,
          <a href="/docs/extensions/dots">Dots</a> for pagination indicators,
          <a href="/docs/extensions/thumbnails">Thumbnails</a> for preview
          navigation, <a href="/docs/extensions/logger">Logger</a> for
          debugging, and <a href="/docs/extensions/vistaview">VistaView</a> for
          full-screen image lightbox.
        </p>
      </div>
      <div class="section-demo">
        <HomeExtensions />
      </div>
    </div>

    <div class="vistaview-subsection">
      <div class="container">
        <div class="section-content">
          <h3 class="subsection-title">VistaView Lightbox</h3>
          <p class="section-description">
            Open any carousel image in a full-screen lightbox with zoom, swipe,
            and keyboard navigation. Powered by the
            <a href="https://vistaview.jujiplay.com" target="_blank">VistaView</a>
            library.
          </p>
        </div>
        <div class="section-demo">
          <HomeVistaview />
          <div class="cta">
            <a href="/docs/extensions/vistaview" class="demo-link"
              >Learn more about VistaView →</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.extensions-section {
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
  margin: 0;
}

.section-description a {
  color: var(--vp-c-brand-1);
  text-decoration: none;
  font-weight: 600;
}

.section-description a:hover {
  color: var(--vp-c-brand-2);
  text-decoration: underline;
}

.section-demo {
  max-width: 600px;
  margin: 0 auto;
}

.vistaview-subsection {
  max-width: 1152px;
  margin: 0 auto;
  padding: 64px 48px 0;
}

.subsection-title {
  font-size: 24px;
  font-weight: 700;
  line-height: 1.3;
  color: var(--vp-c-text-1);
  margin: 0 0 12px 0;
  border: none;
  padding-top: 0;
}

.cta {
  text-align: center;
  margin-top: 20px;
}

.demo-link {
  display: inline-block;
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
