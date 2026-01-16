<script lang="ts">
  import { onMount, type Snippet } from "svelte";
  import { MotionRail as MotionRailClass } from "../motionrail";
  import type { MotionRailOptions } from "../lib/types";

  interface Props {
    options?: MotionRailOptions;
    children?: Snippet;
    instance?: MotionRailClass | null;
    container?: HTMLDivElement;
    [key: string]: any;
  }

  let {
    options = {},
    children,
    instance = $bindable(),
    container = $bindable(),
    ...restProps
  }: Props = $props();

  let containerRef = $state<HTMLDivElement>();
  let motionRailInstance = $state<MotionRailClass | null>(null);
  let slotObserver = $state<MutationObserver | null>(null);

  // Sync bindable props
  $effect(() => {
    instance = motionRailInstance;
  });

  $effect(() => {
    container = containerRef;
  });

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

    return () => {
      if (slotObserver) {
        slotObserver.disconnect();
        slotObserver = null;
      }
      if (motionRailInstance) {
        motionRailInstance.destroy();
        motionRailInstance = null;
      }
    };
  });

  $effect(() => {
    // Track options changes and recreate instance
    if (motionRailInstance && containerRef) {
      motionRailInstance.destroy();
      motionRailInstance = new MotionRailClass(containerRef, options);
    }
  });
</script>

<div bind:this={containerRef} data-motionrail {...restProps}>
  <div data-motionrail-scrollable>
    <div data-motionrail-grid>
      {@render children?.()}
    </div>
  </div>
</div>
