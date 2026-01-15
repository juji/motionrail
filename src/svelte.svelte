<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { MotionRail as MotionRailClass } from "./motionrail";
  import type { MotionRailOptions } from "./lib/types";

  export let options: MotionRailOptions = {};

  let containerRef: HTMLDivElement;
  let motionRailInstance: MotionRailClass | null = null;

  export function getInstance(): MotionRailClass | null {
    return motionRailInstance;
  }

  export function getContainer(): HTMLDivElement | undefined {
    return containerRef;
  }

  onMount(() => {
    if (!containerRef) return;

    motionRailInstance = new MotionRailClass(containerRef, options);
  });

  onDestroy(() => {
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
