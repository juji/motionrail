<template>
  <div style="padding: 40px; background: #000; color: #eaeaea; min-height: 100vh;">
    <Head>
      <Title>Arrows Extension - Nuxt</Title>
    </Head>
    <div style="max-width: 1200px; margin: 0 auto;">
      <Nav current="arrows" />
      <h1 style="margin-bottom: 10px;">Arrows Extension Test Page</h1>
      <p style="margin-bottom: 30px; color: #999; font-size: 14px;">
        Test suite for the Arrows extension (navigation arrows)
      </p>

      <!-- Basic Arrows -->
      <section style="margin-bottom: 60px;">
        <h2 style="margin-bottom: 15px; font-size: 18px;">Basic Arrows</h2>
        <MotionRail
          :breakpoints="[
            { columns: 1, gap: '16px' },
            { width: 768, columns: 2, gap: '16px' },
            { width: 1024, columns: 3, gap: '20px' },
          ]"
          style="height: 300px;"
          :extensions="[Arrows()]"
        >
          <div
            v-for="i in [1, 2, 3, 4, 5, 6, 7, 8]"
            :key="i"
            :style="{
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '48px',
              fontWeight: 'bold',
              color: 'white',
              background: `linear-gradient(135deg, ${getGradient(i)})`,
            }"
          >
            {{ i }}
          </div>
        </MotionRail>
      </section>

      <!-- Auto-hide Arrows -->
      <section style="margin-bottom: 60px;">
        <h2 style="margin-bottom: 15px; font-size: 18px;">
          Auto-hide Arrows (when at start/end)
        </h2>
        <MotionRail
          :breakpoints="[
            { columns: 1, gap: '16px' },
            { width: 768, columns: 2, gap: '16px' },
          ]"
          style="height: 300px;"
          :extensions="[Arrows({ autoHide: true })]"
        >
          <div
            v-for="i in [1, 2, 3, 4, 5, 6]"
            :key="i"
            :style="{
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '48px',
              fontWeight: 'bold',
              color: 'white',
              background: `linear-gradient(135deg, ${getGradient(i)})`,
            }"
          >
            {{ i }}
          </div>
        </MotionRail>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MotionRail } from 'motionrail/vue';
import { Arrows } from 'motionrail/extensions/arrows';
import 'motionrail/style.css';
import 'motionrail/extensions/arrows/style.css';

function getGradient(index: number): string {
  const gradients = [
    '#667eea 0%, #764ba2 100%',
    '#f093fb 0%, #f5576c 100%',
    '#4facfe 0%, #00f2fe 100%',
    '#43e97b 0%, #38f9d7 100%',
    '#fa709a 0%, #fee140 100%',
    '#30cfd0 0%, #330867 100%',
    '#a8edea 0%, #fed6e3 100%',
    '#ff9a9e 0%, #fecfef 100%',
  ];
  return gradients[(index - 1) % gradients.length];
}
</script>
