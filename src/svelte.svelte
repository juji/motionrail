<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { MotionRail as MotionRailClass } from "./motionrail";
  import type { MotionRailOptions } from "./lib/types";

  export let options: MotionRailOptions = {};
  export let instance: MotionRailClass | null = null;
  export let container: HTMLDivElement | undefined = undefined;

  let containerRef: HTMLDivElement;
  let motionRailInstance: MotionRailClass | null = null;
  let slotObserver: MutationObserver | null = null;

  // Sync exported props
  $: instance = motionRailInstance;
  $: container = containerRef;

  export function getInstance(): MotionRailClass | null {
    return motionRailInstance;
  }

  export function getContainer(): HTMLDivElement | undefined {
    return containerRef;
  }

  onMount(() => {
    if (!containerRef) return;

    motionRailInstance = new MotionRailClass(containerRef, options);

    // Watch for slot content changes
    const gridElement = containerRef.querySelector('[data-motion-rail-grid]');
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
    // Recreate instance when options change
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

<div bind:this={containerRef} data-motion-rail {...$$restProps}>
  <div data-motion-rail-scrollable>
    <div data-motion-rail-grid>
      <slot />
    </div>
  </div>
</div>
