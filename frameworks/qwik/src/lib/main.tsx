import { component$, useVisibleTask$, useSignal, Slot, type QwikIntrinsicElements } from "@builder.io/qwik";
import {
  MotionRail as MotionRailClass,
  type MotionRailOptions,
} from "motionrail";

export interface MotionRailProps {
  options?: MotionRailOptions;
  class?: string;
  [key: string]: any;
}

export const MotionRail = component$<MotionRailProps>(({ options, ...divProps }) => {
  const containerRef = useSignal<HTMLDivElement>();
  const motionRailRef = useSignal<MotionRailClass | null>(null);

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ cleanup }) => {
    if (!containerRef.value) return;

    motionRailRef.value = new MotionRailClass(
      containerRef.value,
      options || {}
    );

    cleanup(() => {
      if (motionRailRef.value) {
        motionRailRef.value.destroy();
        motionRailRef.value = null;
      }
    });
  });

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ track }) => {
    track(() => options);
    if (motionRailRef.value && containerRef.value) {
      motionRailRef.value.destroy();
      motionRailRef.value = new MotionRailClass(
        containerRef.value,
        options || {}
      );
    }
  });

  return (
    <div ref={containerRef} data-motionrail {...divProps}>
      <div data-motionrail-scrollable>
        <div data-motionrail-grid>
          <Slot />
        </div>
      </div>
    </div>
  );
});
