import type { DefineComponent } from "vue";
import type { MotionRailOptions } from "motionrail";
import type { MotionRail as MotionRailClass } from "motionrail";

export interface VueProps {
  options?: MotionRailOptions;
}

export type VueEmits = {
  mounted: [instance: MotionRailClass, container: HTMLDivElement];
};

declare const component: DefineComponent<
  VueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  VueEmits
>;
export default component;
