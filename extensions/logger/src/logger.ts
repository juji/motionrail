import { MotionRail } from "motionrail";
import type { MotionRailExtension, MotionRailState } from "motionrail";

export function Logger(): MotionRailExtension {
  return {
    name: "LoggerExtension",
    onInit(motionRail: MotionRail, state: MotionRailState) {
      console.debug(`[LoggerExtension] MotionRail initialized`, state);
      console.debug(motionRail);
    },
    onUpdate(motionRail: MotionRail, state: MotionRailState) {
      console.debug(`[LoggerExtension] MotionRail updated`, state);
      console.debug(motionRail);
    },
    onDestroy(motionRail: MotionRail, state: MotionRailState) {
      console.debug(`[LoggerExtension] MotionRail destroyed`, state);
      console.debug(motionRail);
    },
  };
}
