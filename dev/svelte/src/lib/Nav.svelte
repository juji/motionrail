<script lang="ts">
  interface Props {
    current: 'main' | 'arrows' | 'dots' | 'logger' | 'thumbnails';
  }

  let { current }: Props = $props();

  const links = [
    { href: '/', label: 'Main Tests', key: 'main' },
    { href: '/arrows', label: 'Arrows', key: 'arrows' },
    { href: '/dots', label: 'Dots', key: 'dots' },
    { href: '/logger', label: 'Logger', key: 'logger' },
    { href: '/thumbnails', label: 'Thumbnails', key: 'thumbnails' },
  ];
</script>

<nav
  style="position: sticky; top: 0; z-index: 1000; background: #1a1a1a; padding: 15px 0; margin-bottom: 30px; border-bottom: 1px solid #333;"
>
  <div style="display: flex; gap: 20px; justify-content: center; align-items: center;">
    <span style="color: white; font-weight: 600; font-size: 16px;">SvelteKit</span>
    {#each links as link}
      <a
        href={link.href}
        style="color: {current === link.key ? 'white' : '#999'}; text-decoration: {current === link.key ? 'underline' : 'none'}; font-weight: 500; font-size: 14px; transition: color 0.2s;"
      >
        {link.label}
      </a>
    {/each}
  </div>
</nav>
