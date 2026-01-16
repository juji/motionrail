<script lang="ts">
  import { MotionRail } from 'motionrail/svelte';
  import { Logger } from 'motionrail/extensions/logger';
  import 'motionrail/style.css';
</script>

<div class="container">
  <h1>Logger Extension</h1>

  <nav class="nav">
    <a href="/">← Back to Home</a>
  </nav>

  <section class="section">
    <h2>Logger Extension (Check Console)</h2>
    <p>Open the browser console to see the logger output.</p>
    <MotionRail
      options={{
        breakpoints: [
          { columns: 1, gap: '16px' },
          { width: 768, columns: 2, gap: '16px' },
          { width: 1024, columns: 3, gap: '20px' }
        ],
        extensions: [Logger()]
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

  .section p {
    margin-bottom: 20px;
    color: #666;
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
