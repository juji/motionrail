<script lang="ts">
  import MotionRail from 'motionrail/svelte';
  import type { MotionRail as MotionRailClass } from 'motionrail';
  import { Arrows } from 'motionrail/extensions/arrows';
  import { Dots } from 'motionrail/extensions/dots';
  import { Thumbnails } from 'motionrail/extensions/thumbnails';
  import 'motionrail/style.css';
  import 'motionrail/extensions/arrows/style.css';
  import 'motionrail/extensions/dots/style.css';
  import 'motionrail/extensions/thumbnails/style.css';

  let carousel1: MotionRailClass | null = null;
  let carousel2: MotionRailClass | null = null;
  let carousel3: MotionRailClass | null = null;
</script>

<div class="container">
  <h1>MotionRail - Svelte 4 Test</h1>

  <nav class="nav">
    <h3>Extension Examples:</h3>
    <ul>
      <li><a href="/extensions/arrows">Arrows Extension</a></li>
      <li><a href="/extensions/dots">Dots Extension</a></li>
      <li><a href="/extensions/thumbnails">Thumbnails Extension</a></li>
      <li><a href="/extensions/logger">Logger Extension</a></li>
    </ul>
  </nav>

  <section class="section">
    <h2>Basic Carousel</h2>
    <MotionRail
      bind:instance={carousel1}
      options={{
        breakpoints: [
          { columns: 1, gap: '16px' },
          { width: 768, columns: 2, gap: '16px' },
          { width: 1024, columns: 3, gap: '20px' }
        ]
      }}
    >
      {#each [1, 2, 3, 4, 5, 6, 7, 8] as num}
        <div class="item item{num}">{num}</div>
      {/each}
    </MotionRail>
    <div class="controls">
      <button on:click={() => carousel1?.prev()}>Previous</button>
      <button on:click={() => carousel1?.next()}>Next</button>
    </div>
  </section>

  <section class="section">
    <h2>Carousel with Autoplay</h2>
    <MotionRail
      bind:instance={carousel2}
      options={{
        autoplay: true,
        delay: 2500,
        breakpoints: [
          { columns: 1, gap: '16px' },
          { width: 768, columns: 2, gap: '16px' },
          { width: 1024, columns: 3, gap: '20px' }
        ]
      }}
    >
      {#each [1, 2, 3, 4, 5, 6, 7, 8] as num}
        <div class="item item{num}">{num}</div>
      {/each}
    </MotionRail>
    <div class="controls">
      <button on:click={() => carousel2?.play()}>Play</button>
      <button on:click={() => carousel2?.pause()}>Pause</button>
    </div>
  </section>

  <section class="section">
    <h2>Carousel with Arrows, Dots & Thumbnails Extensions</h2>
    <MotionRail
      bind:instance={carousel3}
      options={{
        breakpoints: [{ columns: 1, gap: '16px' }],
        extensions: [Arrows({ loop: true }), Dots({ showIndex: true }), Thumbnails()]
      }}
    >
      {#each [1, 2, 3, 4, 5, 6] as num}
        <div class="item item{num}">{num}</div>
      {/each}
    </MotionRail>
  </section>

  <section class="section" dir="rtl">
    <h2>RTL Carousel</h2>
    <MotionRail
      options={{
        rtl: true,
        breakpoints: [
          { columns: 1, gap: '16px' },
          { width: 768, columns: 2, gap: '16px' },
          { width: 1024, columns: 3, gap: '20px' }
        ]
      }}
    >
      {#each [1, 2, 3, 4, 5, 6, 7, 8] as num}
        <div class="item item{num}">{num}</div>
      {/each}
    </MotionRail>
  </section>

  <section class="section">
    <h2>Variable Columns (4 → 3 → 2 → 1)</h2>
    <MotionRail
      options={{
        breakpoints: [
          { columns: 1, gap: '12px' },
          { width: 480, columns: 2, gap: '16px' },
          { width: 768, columns: 3, gap: '20px' },
          { width: 1024, columns: 4, gap: '24px' }
        ]
      }}
    >
      {#each [1, 2, 3, 4, 5, 6, 7, 8] as num}
        <div class="item item{num}">{num}</div>
      {/each}
    </MotionRail>
  </section>
</div>

<style>
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 40px 20px;
    font-family: system-ui, -apple-system, sans-serif;
  }

  .container h1 {
    margin-bottom: 40px;
    font-size: 32px;
  }

  .nav {
    margin-bottom: 40px;
    padding: 20px;
    background: rgba(102, 126, 234, 0.1);
    border-radius: 8px;
  }

  .nav h3 {
    margin-bottom: 15px;
    font-size: 18px;
  }

  .nav ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
  }

  .nav li a {
    color: #667eea;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s;
  }

  .nav li a:hover {
    color: #5568d3;
    text-decoration: underline;
  }

  .section {
    margin-bottom: 60px;
  }

  .section h2 {
    margin-bottom: 20px;
    font-size: 20px;
    font-weight: 500;
  }

  .item {
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 48px;
    font-weight: bold;
    color: white;
    border-radius: 8px;
  }

  .item1 {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }
  .item2 {
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  }
  .item3 {
    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  }
  .item4 {
    background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
  }
  .item5 {
    background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
  }
  .item6 {
    background: linear-gradient(135deg, #30cfd0 0%, #330867 100%);
  }
  .item7 {
    background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
  }
  .item8 {
    background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%);
  }

  .controls {
    margin-top: 20px;
    display: flex;
    gap: 10px;
  }

  .controls button {
    padding: 10px 20px;
    border: none;
    border-radius: 6px;
    background: #667eea;
    color: white;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.2s;
  }

  .controls button:hover {
    background: #5568d3;
  }

  .controls button:active {
    transform: scale(0.98);
  }
</style>
