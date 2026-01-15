/** @jsxImportSource solid-js */
import { onMount, onCleanup, type JSX, splitProps } from "solid-js";
import { MotionRail as MotionRailClass } from "./motionrail";
import type { MotionRailOptions } from "./lib/types";

export interface MotionRailProps extends Omit<JSX.HTMLAttributes<HTMLDivElement>, 'ref'> {
  ref?: (instance: MotionRailClass) => void;
  divRef?: (element: HTMLDivElement) => void;
  options?: MotionRailOptions;
}

function MotionRailSolid(props: MotionRailProps) {
  const [local, others] = splitProps(props, ['options', 'ref', 'divRef', 'children']);
  let containerRef: HTMLDivElement | undefined;
  let motionRailInstance: MotionRailClass | null = null;

  onMount(() => {
    if (!containerRef) return;

    motionRailInstance = new MotionRailClass(containerRef, local.options || {});
    
    if (local.ref) {
      local.ref(motionRailInstance);
    }

    if (local.divRef) {
      local.divRef(containerRef);
    }
  });

  onCleanup(() => {
    if (motionRailInstance) {
      motionRailInstance.destroy();
      motionRailInstance = null;
    }
  });

  return (
    <div
      ref={containerRef}
      data-motion-rail
      {...others}
    >
      <div data-motion-rail-scrollable>
        <div data-motion-rail-grid>{local.children}</div>
      </div>
    </div>
  );
}

export function createMotionRail(
  ref: () => HTMLElement | undefined,
  options: MotionRailOptions = {},
): MotionRailClass | null {
  let motionRailInstance: MotionRailClass | null = null;

  onMount(() => {
    const element = ref();
    if (!element) return;

    motionRailInstance = new MotionRailClass(element, options);
  });

  onCleanup(() => {
    if (motionRailInstance) {
      motionRailInstance.destroy();
      motionRailInstance = null;
    }
  });

  return motionRailInstance;
}

export { MotionRailSolid as MotionRail };
