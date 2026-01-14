
export type MotionRailBreakpoint = {
  width?: number;
  columns?: number;
  gap?: string;
};

export type MotioRailOptions = {
  autoplay?: boolean;
  resumeDelay?: number;
  delay?: number;
  rtl?: boolean;
  breakpoints: MotionRailBreakpoint[];
};