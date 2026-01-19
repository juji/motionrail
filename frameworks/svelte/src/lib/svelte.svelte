<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { MotionRail as MotionRailClass } from "motionrail";
  import type { MotionRailOptions } from "motionrail";

  export let options: MotionRailOptions = {};
  export let instance: MotionRailClass | null = null;
  export let container: HTMLDivElement | undefined = undefined;

  let containerRef: HTMLDivElement;
  let motionRailInstance: MotionRailClass | null = null;
  let slotObserver: MutationObserver | null = null;

  $: instance = motionRailInstance;
  $: container = containerRef;

  onMount(() => {
    if (!containerRef) return;

    motionRailInstance = new MotionRailClass(containerRef, options);

    const gridElement = containerRef.querySelector('[data-motionrail-grid]');
    if (gridElement) {
      slotObserver = new MutationObserver(() => {
        if (motionRailInstance) {
          motionRailInstance.update();
        }
      });
      slotObserver.observe(gridElement, {
        childList: true,
        subtree: true,
      });
    }
  });

  $: if (motionRailInstance && options) {
    if (containerRef) {
      motionRailInstance.destroy();
      motionRailInstance = new MotionRailClass(containerRef, options);
    }
  }

  onDestroy(() => {
    if (slotObserver) {
      slotObserver.disconnect();
      slotObserver = null;
    }
    if (motionRailInstance) {
      motionRailInstance.destroy();
      motionRailInstance = null;
    }
  });
</script>

<div bind:this={containerRef} data-motionrail {...$$restProps}>
  <div data-motionrail-scrollable style={options?.containerName ? `container-name: ${options.containerName};` : undefined}>
    <div data-motionrail-grid>
      <slot />
    </div>
  </div>
</div>
