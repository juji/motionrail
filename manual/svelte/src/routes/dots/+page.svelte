<script lang="ts">
  import { MotionRail } from 'motionrail/svelte';
  import { Dots } from 'motionrail/extensions/dots';
  import 'motionrail/style.css';
  import 'motionrail/extensions/dots/style.css';
  import Nav from '$lib/Nav.svelte';
sdgsdfgsdf
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

<svelte:head>
  <title>Dots Extension - SvelteKit</title>
</svelte:head>

<div style="padding: 40px; background: #000; color: #eaeaea; min-height: 100vh;">
  <div style="max-width: 1200px; margin: 0 auto;">
    <Nav current="dots" />
    <h1 style="margin-bottom: 10px;">Dots Extension Test Page</h1>
    <p style="margin-bottom: 30px; color: #999; font-size: 14px;">
      Test suite for the Dots extension (pagination dots)
    </p>

    <!-- Basic Dots -->
    <section style="margin-bottom: 60px;">
      <h2 style="margin-bottom: 15px; font-size: 18px;">Basic Dots</h2>
      <MotionRail
        options={{
          breakpoints: [
            { columns: 1, gap: '16px' },
            { width: 768, columns: 2, gap: '16px' },
            { width: 1024, columns: 3, gap: '20px' },
          ],
          extensions: [Dots()],
        }}
      >
        {#each [1, 2, 3, 4, 5, 6, 7, 8] as i}
          <div
            style="height: 300px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); display: flex; align-items: center; justify-content: center; font-size: 48px; font-weight: bold; color: white; background: linear-gradient(135deg, {getGradient(i)});"
          >
            {i}
          </div>
        {/each}
      </MotionRail>
    </section>

    <!-- Many Pages -->
    <section style="margin-bottom: 60px;">
      <h2 style="margin-bottom: 15px; font-size: 18px;">Many Pages (20 items)</h2>
      <MotionRail
        options={{
          breakpoints: [
            { columns: 1, gap: '16px' },
            { width: 768, columns: 2, gap: '16px' },
          ],
          extensions: [Dots()],
        }}
      >
        {#each Array.from({ length: 20 }, (_, i) => i + 1) as i}
          <div
            style="height: 300px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); display: flex; align-items: center; justify-content: center; font-size: 48px; font-weight: bold; color: white; background: linear-gradient(135deg, {getGradient(i)});"
          >
            {i}
          </div>
        {/each}
      </MotionRail>
    </section>
  </div>
</div>
