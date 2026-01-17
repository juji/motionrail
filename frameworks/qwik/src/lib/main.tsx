import { component$, useVisibleTask$, useSignal, Slot, type QwikIntrinsicElements, noSerialize, useStore } from "@builder.io/qwik";
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
  const optionsStore = useStore<{ value: MotionRailOptions | undefined }>({ value: undefined });

  // Set options without tracking
  optionsStore.value = options;

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ cleanup }) => {
    if (!containerRef.value) return;

    motionRailRef.value = new MotionRailClass(
      containerRef.value,
      noSerialize(optionsStore.value) || {}
    );

    cleanup(() => {
      if (motionRailRef.value) {
        motionRailRef.value.destroy();
        motionRailRef.value = null;
      }
    });
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
