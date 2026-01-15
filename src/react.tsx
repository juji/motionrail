import { useEffect, useRef, type RefObject } from "react";
import { MotionRail as MotionRailClass } from "./motionrail";
import type { MotionRailOptions } from "./lib/types";

export interface MotionRailProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: RefObject<MotionRailClass>;
  divRef?: RefObject<HTMLDivElement>;
  options?: MotionRailOptions;
}

function MotionRailReact({
  options,
  ref,
  divRef,
  ...divProps
}: MotionRailProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const motionRailRef = useRef<MotionRailClass | null>(null);
  const { children, ...restDivProps } = divProps || {};

  useEffect(() => {
    if (!containerRef.current) return;

    motionRailRef.current = new MotionRailClass(containerRef.current, options || {});
    if (ref) {
      ref.current = motionRailRef.current;
    }

    if(divRef) {
      divRef.current = containerRef.current;
    }

    return () => {
      if (motionRailRef.current) {
        motionRailRef.current.destroy();
        motionRailRef.current = null;
      }
    };
  }, [options]);

  useEffect(() => {
    if (motionRailRef.current) {
      motionRailRef.current.update();
    }
  }, [children]);

  return (
    <div
      ref={containerRef}
      data-motion-rail
      {...restDivProps}
    >
      <div data-motion-rail-scrollable>
        <div data-motion-rail-grid>{children}</div>
      </div>
    </div>
  );
}

export { MotionRailReact as MotionRail };
