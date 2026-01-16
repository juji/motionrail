import type { Component } from "svelte";
import type { MotionRailOptions } from "./lib/types";

export interface Svelte5Props {
  options?: MotionRailOptions;
  getInstance?: () => any;
  getContainer?: () => HTMLElement | undefined;
  children?: any;
}

declare const Svelte5: Component<Svelte5Props>;
export default Svelte5;
