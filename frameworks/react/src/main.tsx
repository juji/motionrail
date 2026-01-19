"use client";

import { useEffect, useRef, type MutableRefObject } from "react";
import {
  MotionRail as MotionRailClass,
  type MotionRailOptions,
} from "motionrail";

export interface MotionRailProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: MutableRefObject<MotionRailClass | null>;
  divRef?: MutableRefObject<HTMLDivElement | null>;
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

    motionRailRef.current = new MotionRailClass(
      containerRef.current,
      options || {},
    );
    if (ref) {
      ref.current = motionRailRef.current;
    }

    if (divRef) {
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
    <>
      <div ref={containerRef} data-motionrail {...restDivProps}>
        <div
          data-motionrail-scrollable
          style={{ containerName: options?.containerName }}
        >
          <div data-motionrail-grid>{children}</div>
        </div>
      </div>
    </>
  );
}

export { MotionRailReact as MotionRail };
