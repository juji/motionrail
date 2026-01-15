import { MotionRail } from "../../motionrail";
import type { MotionRailExtension, MotionRailState } from "../../motionrail";

export function Arrows(
  leftIcon: string = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-left-icon lucide-chevron-left"><path d="m15 18-6-6 6-6"/></svg>',
  rightIcon: string = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right-icon lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>',
): MotionRailExtension {
  return {
    name: "ArrowExtension",
    onInit(motionRail: MotionRail, _state: MotionRailState) {
      const { rtl } = motionRail.getOptions();
      const leftArrow = document.createElement("button");
      leftArrow.innerHTML = leftIcon;
      leftArrow.className = "motionrail-arrow motionrail-arrow-left";
      leftArrow.addEventListener("click", () => {
        rtl ? motionRail.next() : motionRail.prev();
      });

      const rightArrow = document.createElement("button");
      rightArrow.innerHTML = rightIcon;
      rightArrow.className = "motionrail-arrow motionrail-arrow-right";
      rightArrow.addEventListener("click", () => {
        rtl ? motionRail.prev() : motionRail.next();
      });

      motionRail.element.appendChild(leftArrow);
      motionRail.element.appendChild(rightArrow);
    },
  };
}
