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
  <footer>
    <div class="footer-inner">
      <span>© 2024 Juji</span>
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
</style>
