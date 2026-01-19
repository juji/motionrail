import { component$, useVisibleTask$, useSignal, Slot } from "@builder.io/qwik";
import type { QwikIntrinsicElements } from "@builder.io/qwik";
import { MotionRail as MotionRailClass } from "motionrail";
import type { MotionRailOptions } from "motionrail";

export interface MotionRailProps {
  options?: MotionRailOptions;
}

export const MotionRail = component$<
  MotionRailProps & QwikIntrinsicElements["div"]
>((props) => {
  const { options, ...divProps } = props;

  // Separate onChange from options to avoid serialization issues
  const { onChange, ...restOptions } = options || {};

  const containerRef = useSignal<HTMLDivElement>();
  const motionRailRef = useSignal<MotionRailClass | null>(null);

  useVisibleTask$(({ cleanup }) => {
    if (!containerRef.value) return;
    motionRailRef.value = new MotionRailClass(containerRef.value, restOptions);
    // Assign onChange handler directly to the instance (not serialized)
    if (onChange && motionRailRef.value) {
      motionRailRef.value.setOnChange(onChange);
    }

    cleanup(() => {
      if (motionRailRef.value) {
        motionRailRef.value.destroy();
        motionRailRef.value = null;
      }
    });
  });

  // Compute style for scrollable div
  const scrollableStyle = options?.containerName
    ? { containerName: options.containerName }
    : undefined;
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
