export type MotionRailBreakpoint = {
  width?: number;
  columns?: number;
  gap?: string;
};

export type MotionRailOptions = {
  autoplay?: boolean;
  resumeDelay?: number;
  delay?: number;
  rtl?: boolean;
  breakpoints: MotionRailBreakpoint[];
};
