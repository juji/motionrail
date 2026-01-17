<script lang="ts">
  import MotionRail from 'motionrail/svelte';
  import type { MotionRail as MotionRailClass } from 'motionrail';
  import { Arrows } from 'motionrail/extensions/arrows';
  import 'motionrail/style.css';
  import 'motionrail/extensions/arrows/style.css';

  let carousel1: MotionRailClass | null = null;
  let carousel2: MotionRailClass | null = null;
  let carousel3: MotionRailClass | null = null;
</script>

<div class="container">
  <h1>Arrows Extension</h1>

  <nav class="nav">
    <a href="/">← Back to Home</a>
  </nav>

  <section class="section">
    <h2>Basic Arrows</h2>
    <MotionRail
      bind:instance={carousel1}
      options={{
        breakpoints: [{ columns: 1, gap: '16px' }],
        extensions: [Arrows()]
      }}
    >
      {#each [1, 2, 3, 4, 5, 6] as num}
        <div class="item item{num}">{num}</div>
      {/each}
    </MotionRail>
  </section>

  <section class="section">
    <h2>Arrows with Loop</h2>
    <MotionRail
      bind:instance={carousel2}
      options={{
        breakpoints: [{ columns: 1, gap: '16px' }],
        extensions: [Arrows({ loop: true })]
      }}
    >
      {#each [1, 2, 3, 4, 5, 6] as num}
        <div class="item item{num}">{num}</div>
      {/each}
    </MotionRail>
  </section>

  <section class="section">
    <h2>Custom Arrow Icons</h2>
    <MotionRail
      bind:instance={carousel3}
      options={{
        breakpoints: [{ columns: 1, gap: '16px' }],
        extensions: [
          Arrows({
            loop: true,
            leftIcon: '←',
            rightIcon: '→'
          })
        ]
      }}
    >
      {#each [1, 2, 3, 4, 5, 6] as num}
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
  }

  .nav a {
    color: #667eea;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s;
  }

  .nav a:hover {
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
</style>
