import { MotionRail } from "motionrail";
import type { MotionRailExtension, MotionRailState } from "motionrail";

export function Logger({
  onInit,
  onUpdate,
  onDestroy,
  outputToConsole = true,
}: {
  onInit?: (motionRail: MotionRail, state: MotionRailState) => void;
  onUpdate?: (motionRail: MotionRail, state: MotionRailState) => void;
  onDestroy?: (motionRail: MotionRail, state: MotionRailState) => void;
  outputToConsole?: boolean;
}): MotionRailExtension {
  return {
    name: "LoggerExtension",
    onInit(motionRail: MotionRail, state: MotionRailState) {
      if (outputToConsole) {
        console.debug(`[LoggerExtension] MotionRail initialized`, state);
        console.debug(motionRail);
      }
      onInit && onInit(motionRail, state);
    },
    onUpdate(motionRail: MotionRail, state: MotionRailState) {
      if (outputToConsole) {
        console.debug(`[LoggerExtension] MotionRail updated`, state);
        console.debug(motionRail);
      }
      onUpdate && onUpdate(motionRail, state);
    },
    onDestroy(motionRail: MotionRail, state: MotionRailState) {
      if (outputToConsole) {
        console.debug(`[LoggerExtension] MotionRail destroyed`, state);
        console.debug(motionRail);
      }
      onDestroy && onDestroy(motionRail, state);
    },
  };
}
