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
};

export type MotionRailExtension = {
  name: string;
  onInit?: (motionRail: MotionRail) => void;
  onUpdate?: (motionRail: MotionRail) => void;
  onDestroy?: (motionRail: MotionRail) => void;
};
