<script setup lang="ts">
import HeroSection from './hero-section.vue';
import HomeExtensionsSection from './home-extensions-section.vue';
import HomeRtlSection from './home-rtl-section.vue';
import HomeBreakpointsSection from './home-breakpoints-section.vue';
</script>

<template>
  <div class="home-layout">
    <HeroSection />
    <HomeExtensionsSection />
    <HomeBreakpointsSection />
    <HomeRtlSection />
  </div>
</template>

<style scoped>
.home-layout {
  padding: 0;
  margin: 0;
}
</style>


