import type { Component } from "svelte";
import type { MotionRailOptions } from "./lib/types";
import { MotionRail } from "./motionrail";

export interface Svelte5Props {
  options?: MotionRailOptions;
  instance?: MotionRail | null;
  container?: HTMLDivElement | undefined;
  children?: any;
}

declare const Svelte5: Component<Svelte5Props>;
export default Svelte5;
