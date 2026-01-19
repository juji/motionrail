import { useEffect, useRef } from "preact/hooks";
import type { JSX } from "preact";
import {
  MotionRail as MotionRailClass,
  type MotionRailOptions,
} from "motionrail";

export interface MotionRailProps extends Omit<JSX.HTMLAttributes<HTMLDivElement>, 'ref'> {
  options?: MotionRailOptions;
}

function MotionRailPreact({ options, ...divProps }: MotionRailProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const motionRailRef = useRef<MotionRailClass | null>(null);
  const { children, ...restDivProps } = divProps || {};

  useEffect(() => {
    if (!containerRef.current) return;

    motionRailRef.current = new MotionRailClass(
      containerRef.current,
      options || {},
    );

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

  // Compute style for scrollable div
  const scrollableStyle = options?.containerName ? { containerName: options.containerName } : undefined;
  return (
    <div ref={containerRef} data-motionrail {...restDivProps}>
      <div data-motionrail-scrollable style={scrollableStyle}>
        <div data-motionrail-grid>{children}</div>
      </div>
    </div>
  );
}

export { MotionRailPreact as MotionRail };
