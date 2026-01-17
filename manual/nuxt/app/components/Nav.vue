<template>
  <nav
    style="position: sticky; top: 0; z-index: 1000; background: #1a1a1a; padding: 15px 0; margin-bottom: 30px; border-bottom: 1px solid #333;"
  >
    <div style="display: flex; gap: 20px; justify-content: center;">
      <NuxtLink
        v-for="link in links"
        :key="link.key"
        :to="link.href"
        :style="{
          color: current === link.key ? 'white' : '#999',
          textDecoration: current === link.key ? 'underline' : 'none',
          fontWeight: '500',
          fontSize: '14px',
          transition: 'color 0.2s',
        }"
      >
        {{ link.label }}
      </NuxtLink>
    </div>
  </nav>
</template>

<script setup lang="ts">
defineProps<{
  current: 'main' | 'arrows' | 'dots' | 'logger' | 'thumbnails';
}>();

const links = [
  { href: '/', label: 'Main Tests', key: 'main' },
  { href: '/arrows', label: 'Arrows', key: 'arrows' },
  { href: '/dots', label: 'Dots', key: 'dots' },
  { href: '/logger', label: 'Logger', key: 'logger' },
  { href: '/thumbnails', label: 'Thumbnails', key: 'thumbnails' },
];
</script>
