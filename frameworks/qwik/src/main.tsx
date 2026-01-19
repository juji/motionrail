import { component$, useVisibleTask$, useSignal, Slot, noSerialize, useStore } from "@builder.io/qwik";
import type { QwikIntrinsicElements } from "@builder.io/qwik";
import {
  MotionRail as MotionRailClass,
  type MotionRailOptions,
} from "motionrail";

export interface MotionRailProps {
  options?: MotionRailOptions;
}
// asdf
export const MotionRail = component$<MotionRailProps & QwikIntrinsicElements['div']>(({ options, ...divProps }) => {
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

  // Compute style for scrollable div
  const scrollableStyle = options?.containerName ? { containerName: options.containerName } : undefined;
  return (
    <div ref={containerRef} data-motionrail {...divProps}>
      <div data-motionrail-scrollable style={scrollableStyle}>
        <div data-motionrail-grid>
          <Slot />
        </div>
      </div>
    </div>
  );
});
