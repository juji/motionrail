import type { MotionRail } from "./main";

export type MotionRailBreakpoint = {
  width?: number;
  columns?: number;
  gap?: string;
};

export type MotionRailState = {
  totalItems: number;
  visibleItemIndexes: number[];
  isFirstItemVisible: boolean;
  isLastItemVisible: boolean;
};

export type MotionRailOptions = {
  autoplay?: boolean;
  resumeDelay?: number;
  delay?: number;
  rtl?: boolean;
  onChange?: (state: MotionRailState) => void;
  breakpoints?: MotionRailBreakpoint[];
  extensions?: MotionRailExtension[];
  containerName?: string;
};

export type MotionRailExtension = {
  name: string;
  onInit?: (motionRail: MotionRail, state: MotionRailState) => void;
  onUpdate?: (motionRail: MotionRail, state: MotionRailState) => void;
  onDestroy?: (motionRail: MotionRail, state: MotionRailState) => void;
};
