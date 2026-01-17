import type { DefineComponent } from "vue";
import type { MotionRailOptions } from "../lib/types";
import type { MotionRail as MotionRailClass } from "../motionrail";

export interface VueProps {
  options?: MotionRailOptions;
}

export type VueEmits = {
  mounted: (instance: MotionRailClass, container: HTMLDivElement) => void;
};

declare const MotionRail: DefineComponent<
  VueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  VueEmits
>;
export { MotionRail };
