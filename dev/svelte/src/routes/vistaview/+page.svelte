<script lang="ts">
  import { MotionRail } from 'motionrail/svelte';
  import { VistaViewLightbox } from 'motionrail/extensions/vistaview';
  import 'motionrail/style.css';
  import Nav from '$lib/Nav.svelte';

  const images = [
    { src: 'https://picsum.photos/seed/sl1/800/600', thumb: 'https://picsum.photos/seed/sl1/400/300', alt: 'Photo 1' },
    { src: 'https://picsum.photos/seed/sl2/800/600', thumb: 'https://picsum.photos/seed/sl2/400/300', alt: 'Photo 2' },
    { src: 'https://picsum.photos/seed/sl3/800/600', thumb: 'https://picsum.photos/seed/sl3/400/300', alt: 'Photo 3' },
    { src: 'https://picsum.photos/seed/sl4/800/600', thumb: 'https://picsum.photos/seed/sl4/400/300', alt: 'Photo 4' },
    { src: 'https://picsum.photos/seed/sl5/800/600', thumb: 'https://picsum.photos/seed/sl5/400/300', alt: 'Photo 5' },
    { src: 'https://picsum.photos/seed/sl6/800/600', thumb: 'https://picsum.photos/seed/sl6/400/300', alt: 'Photo 6' },
    { src: 'https://picsum.photos/seed/sl7/800/600', thumb: 'https://picsum.photos/seed/sl7/400/300', alt: 'Photo 7' },
    { src: 'https://picsum.photos/seed/sl8/800/600', thumb: 'https://picsum.photos/seed/sl8/400/300', alt: 'Photo 8' },
  ];
</script>

<svelte:head>
  <title>VistaView Lightbox Extension - SvelteKit</title>
</svelte:head>

<div style="padding: 40px; background: #000; color: #eaeaea; min-height: 100vh;">
  <div style="max-width: 1200px; margin: 0 auto;">
    <Nav current="vistaview" />
    <h1 style="margin-bottom: 10px;">VistaView Lightbox Extension</h1>
    <p style="margin-bottom: 30px; color: #999; font-size: 14px;">
      Click any carousel item to open in a VistaView lightbox.
    </p>

    <section style="margin-bottom: 60px;">
      <h2 style="margin-bottom: 15px; font-size: 18px;">Image Carousel</h2>
      <MotionRail
        options={{
          breakpoints: [
            { columns: 1, gap: '16px' },
            { width: 768, columns: 2, gap: '16px' },
            { width: 1024, columns: 3, gap: '20px' },
          ],
          extensions: [VistaViewLightbox()],
        }}
      >
        {#each images as img, i}
          <div style="height: 300px; overflow: hidden;">
            <a href={img.src}><img src={img.thumb} alt={img.alt} style="width: 100%; height: 100%; object-fit: cover;" /></a>
          </div>
        {/each}
      </MotionRail>
    </section>
  </div>
</div>
