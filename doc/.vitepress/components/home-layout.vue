<script setup lang="ts">
import HeroSection from "./hero-section.vue";
import HomeExtensionsSection from "./home-extensions-section.vue";
import HomeRtlSection from "./home-rtl-section.vue";
import HomeBreakpointsSection from "./home-breakpoints-section.vue";
</script>

<template>
  <div class="home-layout">
    <HeroSection />
    <HomeExtensionsSection />
    <HomeBreakpointsSection />
    <HomeRtlSection />
  </div>
  <footer>
    <div>
      © 2024 Juji
      <a
        href="https://jujiyangasli.com"
        target="_blank"
        rel="noopener noreferrer"
        >jujiyangasli.com</a
      >
    </div>
    <div>
      Built with
      <a href="https://vitepress.dev/" target="_blank" rel="noopener noreferrer"
        >VitePress</a
      >
    </div>
    <div>
      Images by
      <a href="https://picsum.photos/" target="_blank" rel="noopener noreferrer"
        >Picsum</a
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
  text-align: center;
}
</style>
