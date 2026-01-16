import { type Snippet } from "svelte";
import { MotionRail as MotionRailClass } from "../motionrail";
import type { MotionRailOptions } from "../lib/types";
interface Props {
  options?: MotionRailOptions;
  children?: Snippet;
  instance?: MotionRailClass | null;
  container?: HTMLDivElement;
  [key: string]: any;
}
declare const Svelte5: import("svelte").Component<
  Props,
  {},
  "instance" | "container"
>;
type Svelte5 = ReturnType<typeof Svelte5>;
export default Svelte5;
