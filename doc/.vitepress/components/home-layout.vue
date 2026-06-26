<script setup lang="ts">
import HeroSection from "./hero-section.vue";
import HomeInfiniteSection from "./home-infinite-section.vue";
import HomeExtensionsSection from "./home-extensions-section.vue";
import HomeRtlSection from "./home-rtl-section.vue";
import HomeBreakpointsSection from "./home-breakpoints-section.vue";
</script>

<template>
  <div class="home-layout">
    <HeroSection />
    <HomeInfiniteSection />
    <HomeExtensionsSection />
    <HomeBreakpointsSection />
    <HomeRtlSection />
  </div>

  <div class="build-section">
    <div class="container">
      <div class="section-content">
        <h2 class="section-title">Bundle Size</h2>
        <p class="section-description">
          Lightweight across the board. The core is under 15 kB, and every
          extension stays under 2 kB.
        </p>
      </div>
      <div class="section-demo">
        <table>
          <thead>
            <tr>
              <th>Package</th>
              <th>Size</th>
              <th>Gzip</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>motionrail (ES)</td>
              <td>14.5 kB</td>
              <td>3.7 kB</td>
            </tr>
            <tr>
              <td>motionrail (UMD)</td>
              <td>12.5 kB</td>
              <td>3.4 kB</td>
            </tr>
            <tr>
              <td>motionrail (CSS)</td>
              <td>0.9 kB</td>
              <td>0.3 kB</td>
            </tr>
            <tr>
              <td>arrows</td>
              <td>1.8 kB</td>
              <td>0.8 kB</td>
            </tr>
            <tr>
              <td>dots</td>
              <td>1.3 kB</td>
              <td>0.7 kB</td>
            </tr>
            <tr>
              <td>thumbnails</td>
              <td>1.6 kB</td>
              <td>0.8 kB</td>
            </tr>
            <tr>
              <td>vistaview</td>
              <td>1.5 kB</td>
              <td>0.7 kB</td>
            </tr>
            <tr>
              <td>logger</td>
              <td>0.6 kB</td>
              <td>0.3 kB</td>
            </tr>
          </tbody>
        </table>
        <p class="build-date">Built June 27, 2026</p>
      </div>
    </div>
  </div>

  <footer>
    <div class="footer-inner">
      <span>© 2026 Juji</span>
      <span class="footer-sep">·</span>
      <a
        href="https://jujiyangasli.com"
        target="_blank"
        rel="noopener noreferrer"
        >jujiyangasli.com</a
      >
      <span class="footer-sep">·</span>
      <span
        >Built with
        <a
          href="https://vitepress.dev/"
          target="_blank"
          rel="noopener noreferrer"
          >VitePress</a
        ></span
      >
      <span class="footer-sep">·</span>
      <span
        >Images by
        <a
          href="https://picsum.photos/"
          target="_blank"
          rel="noopener noreferrer"
          >Picsum</a
        ></span
      >
    </div>
  </footer>
</template>

<style scoped>
.home-layout {
  padding: 0;
  margin: 0;
}
footer {
  padding: 32px 48px;
  border-top: 1px solid var(--vp-c-divider);
  text-align: center;
}
.footer-inner {
  max-width: 1152px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: var(--vp-c-text-2);
}
.footer-inner a {
  color: var(--vp-c-brand-1);
  text-decoration: none;
  font-weight: 500;
}
.footer-inner a:hover {
  color: var(--vp-c-brand-2);
  text-decoration: underline;
}
.footer-sep {
  color: var(--vp-c-divider);
}
.build-section {
  padding: 96px 24px;
}

@media (min-width: 768px) {
  .build-section {
    padding: 96px 48px;
  }
}

.build-section .container {
  max-width: 1152px;
  margin: 0 auto;
  padding-top: 48px;
  border-top: 1px solid var(--vp-c-divider);
}

.build-section .section-content {
  text-align: center;
  margin-bottom: 32px;
}

.build-section .section-title {
  font-size: 32px;
  font-weight: 700;
  line-height: 1.2;
  color: var(--vp-c-text-1);
  margin: 0 0 16px 0;
  border: none;
  padding-top: 0;
}

.build-section .section-description {
  font-size: 15px;
  line-height: 1.5;
  color: var(--vp-c-text-2);
  margin: 0 auto;
  max-width: 420px;
}

@media (min-width: 768px) {
  .build-section .section-description {
    font-size: 18px;
    max-width: 320px;
  }
}

.build-section .section-demo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.build-section table {
  border-collapse: collapse;
}

.build-section th,
.build-section td {
  padding: 6px 28px;
  font-size: 14px;
}

@media (min-width: 768px) {
  .build-section th,
  .build-section td {
    padding: 8px 36px;
    font-size: 15px;
  }
}

.build-section th:first-child,
.build-section td:first-child {
  text-align: left;
}

.build-section th {
  font-weight: 600;
  border-bottom: 1px solid var(--vp-c-divider);
}

.build-date {
  margin-top: 12px;
  font-size: 14px;
  color: var(--vp-c-text-3);
}

@media (min-width: 1024px) {
  .build-section .container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 48px;
  }

  .build-section .section-content {
    text-align: left;
    margin-bottom: 0;
  }

  .build-section .section-description {
    margin: 0;
    max-width: 320px;
  }

  .build-section .section-demo {
    align-items: flex-start;
    min-width: 436px;
  }
}
</style>
