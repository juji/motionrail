import { useEffect, useRef, type RefObject } from "react";
import { MotionRail } from "./motionrail";
import type { MotionRailOptions } from "./lib/types";

export interface MotionRailReactProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: RefObject<MotionRail>;
  divRef?: RefObject<HTMLDivElement>;
  options?: MotionRailOptions;
}

export function MotionRailReact({
  options,
  ref,
  divRef,
  ...divProps
}: MotionRailReactProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const motionRailRef = useRef<MotionRail | null>(null);
  const { children, ...restDivProps } = divProps || {};

  useEffect(() => {
    if (!containerRef.current) return;

    motionRailRef.current = new MotionRail(containerRef.current, options || {});
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
  }, [options, children]);

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

export function useMotionRail(
  ref: RefObject<HTMLElement>,
  options: MotionRailOptions = {},
) {
  const motionRailRef = useRef<MotionRail | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    motionRailRef.current = new MotionRail(ref.current, options);

    return () => {
      if (motionRailRef.current) {
        motionRailRef.current.destroy();
        motionRailRef.current = null;
      }
    };
  }, [ref, options]);

  return motionRailRef.current;
}
