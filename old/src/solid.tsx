/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect, type JSX, splitProps } from "solid-js";
import { isServer } from "solid-js/web"
import { MotionRail as MotionRailClass } from "./motionrail";
import type { MotionRailOptions } from "./lib/types";

export interface MotionRailProps extends Omit<JSX.HTMLAttributes<HTMLDivElement>, 'ref'> {
  ref?: (instance: MotionRailClass) => void;
  divRef?: (element: HTMLDivElement) => void;
  options?: MotionRailOptions;
}

function MotionRailSolid(props: MotionRailProps) {
  const [local, others] = splitProps(props, ['options', 'ref', 'divRef', 'children']);
  
  if (isServer) {
    return <div {...others}>{local.children}</div>;
  }
  
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

  createEffect(() => {
    // Track children changes
    // @ts-ignore - intentionally unused to track reactivity
    const _ = local.children;
    
    if (motionRailInstance) {
      motionRailInstance.update();
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
      data-motionrail
      {...others}
    >
      <div data-motionrail-scrollable>
        <div data-motionrail-grid>{local.children}</div>
      </div>
    </div>
  );
}

export { MotionRailSolid as MotionRail };
