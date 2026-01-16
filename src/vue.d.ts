import type { DefineComponent } from "vue";
import type { MotionRailOptions } from "./lib/types";

export interface VueProps {
  options?: MotionRailOptions;
}

export type VueEmits = {
  mounted: (instance: any, container: HTMLElement) => void;
};

declare const Vue: DefineComponent<VueProps, {}, {}, {}, {}, {}, {}, VueEmits>;
export default Vue;
