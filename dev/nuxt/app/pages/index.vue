<template>
  <div
    style="padding: 40px; background: #000; color: #eaeaea; min-height: 100vh"
  >
    <Head>
      <Title>MotionRail Test Page - Nuxt</Title>
    </Head>
    <div style="max-width: 1200px; margin: 0 auto">
      <Nav current="main" />
      <h1 style="margin-bottom: 10px">MotionRail Test Page</h1>
      <p style="margin-bottom: 30px; color: #999; font-size: 14px">
        Comprehensive test suite for MotionRail Vue wrapper
      </p>

      <!-- Basic Carousel (FOUC-safe) -->
      <section style="margin-bottom: 60px">
        <h2 style="margin-bottom: 15px; font-size: 18px">
          Basic Carousel (3 columns on desktop, 2 on tablet, 1 on mobile)
        </h2>
        <MotionRail
          :options="{
            breakpoints: [
              { columns: 1, gap: '16px' },
              { width: 768, columns: 2, gap: '16px' },
              { width: 1024, columns: 3, gap: '20px' },
            ],
            containerName,
            // onChange: (state) => console.log('Carousel changed:', state),
          }"
        >
          <div
            v-for="i in [1, 2, 3, 4, 5, 6, 7, 8]"
            :key="i"
            :style="{
              height: '300px',
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

      <!-- Autoplay Carousel -->
      <section style="margin-bottom: 60px">
        <h2 style="margin-bottom: 15px; font-size: 18px">
          Carousel with Autoplay
        </h2>
        <MotionRail
          :options="{
            breakpoints: [
              { columns: 1, gap: '16px' },
              { width: 768, columns: 2, gap: '16px' },
              { width: 1024, columns: 3, gap: '20px' },
            ],
            autoplay: true,
            delay: 2500,
          }"
        >
          <div
            v-for="i in [1, 2, 3, 4, 5, 6, 7, 8]"
            :key="i"
            :style="{
              height: '300px',
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

      <!-- Dynamic Content -->
      <section style="margin-bottom: 60px">
        <h2 style="margin-bottom: 15px; font-size: 18px">
          Dynamic Content (Add/Remove Items)
        </h2>
        <MotionRail
          :options="{
            breakpoints: [
              { columns: 1, gap: '16px' },
              { width: 768, columns: 2, gap: '16px' },
            ],
          }"
        >
          <div
            v-for="i in items"
            :key="i"
            :style="{
              height: '300px',
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
        <div style="margin-top: 15px; display: flex; gap: 10px">
          <button
            @click="items.push(items.length + 1)"
            style="
              padding: 10px 20px;
              border: none;
              border-radius: 6px;
              background: #667eea;
              color: white;
              font-size: 14px;
              font-weight: 500;
              cursor: pointer;
            "
          >
            Add Item
          </button>
          <button
            @click="items.pop()"
            style="
              padding: 10px 20px;
              border: none;
              border-radius: 6px;
              background: #667eea;
              color: white;
              font-size: 14px;
              font-weight: 500;
              cursor: pointer;
            "
          >
            Remove Item
          </button>
        </div>
      </section>

      <!-- Edge Case: Single Item -->
      <section style="margin-bottom: 60px">
        <h2 style="margin-bottom: 15px; font-size: 18px">
          Edge Case: Single Item
        </h2>
        <MotionRail
          :options="{
            breakpoints: [
              { columns: 1, gap: '16px' },
              { width: 768, columns: 2, gap: '16px' },
            ],
          }"
        >
          <div
            :style="{
              height: '300px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '48px',
              fontWeight: 'bold',
              color: 'white',
              background: `linear-gradient(135deg, ${getGradient(1)})`,
            }"
          >
            1
          </div>
        </MotionRail>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MotionRail } from "motionrail/vue";
import { MotionRail as MotionRailClass } from "motionrail";
import "motionrail/style.css";
import { useHead } from "#imports";

const items = ref([1, 2, 3]);

// FOUC-safe container query setup for the first carousel
const { containerName, containerQueries } = MotionRailClass.getBreakPoints(
  [
    { columns: 1, gap: "16px" },
    { width: 768, columns: 2, gap: "16px" },
    { width: 1024, columns: 3, gap: "20px" },
  ],
  8,
);

useHead({
  style: [
    containerName && containerQueries
      ? {
          key: containerName,
          innerHTML: containerQueries,
          "data-motionrail-style": containerName,
        }
      : undefined,
  ].filter(Boolean),
});

function getGradient(index: number): string {
  const gradients = [
    "#667eea 0%, #764ba2 100%",
    "#f093fb 0%, #f5576c 100%",
    "#4facfe 0%, #00f2fe 100%",
    "#43e97b 0%, #38f9d7 100%",
    "#fa709a 0%, #fee140 100%",
    "#30cfd0 0%, #330867 100%",
    "#a8edea 0%, #fed6e3 100%",
    "#ff9a9e 0%, #fecfef 100%",
  ];
  return gradients[(index - 1) % gradients.length] as string;
}
</script>
