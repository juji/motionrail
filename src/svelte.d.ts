import type { Component } from "svelte";
import type { MotionRailOptions } from "./lib/types";

export interface SvelteProps {
  options?: MotionRailOptions;
  getInstance?: () => any;
  getContainer?: () => HTMLElement | undefined;
  children?: any;
}

declare const Svelte: Component<SvelteProps>;
export default Svelte;
