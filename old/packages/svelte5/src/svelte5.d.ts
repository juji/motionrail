import type { Component } from "svelte";
import type {
  MotionRailOptions,
  MotionRail as MotionRailClass,
} from "motionrail";

export interface Svelte5Props {
  options?: MotionRailOptions;
  instance?: MotionRailClass | null;
  container?: HTMLDivElement | undefined;
  children?: any;
}

declare const Svelte5: Component<Svelte5Props>;
export default Svelte5;
