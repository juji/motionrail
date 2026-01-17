import type { Component } from "svelte";
import type {
  MotionRailOptions,
  MotionRail as MotionRailClass,
} from "motionrail";

export interface SvelteProps {
  options?: MotionRailOptions;
  instance?: MotionRailClass | null;
  container?: HTMLDivElement | undefined;
  children?: any;
}

declare const Svelte: Component<SvelteProps>;
export default Svelte;
