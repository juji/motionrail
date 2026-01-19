import { component$, useVisibleTask$, useSignal, Slot, noSerialize } from "@builder.io/qwik";
import type { QRL, QwikIntrinsicElements } from "@builder.io/qwik";
import {
  MotionRail as MotionRailClass,
  type MotionRailOptions,
} from "motionrail";

export interface MotionRailProps {
  options?: MotionRailOptions
}

export const MotionRail = component$<MotionRailProps & QwikIntrinsicElements['div']>((props) => {


  const { options, ...divProps } = props;
  if(options && options.onChange) options.onChange = noSerialize(options.onChange as QRL<(state: any) => void>);

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
