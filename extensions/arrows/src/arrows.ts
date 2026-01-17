import { MotionRail } from "motionrail";
import type { MotionRailExtension, MotionRailState } from "motionrail";
import "./style.css";

export function Arrows(par?: {
  leftIcon?: string;
  rightIcon?: string;
  loop?: boolean;
  log?: boolean;
}): MotionRailExtension {
  const {
    leftIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-left-icon lucide-chevron-left"><path d="m15 18-6-6 6-6"/></svg>',
    rightIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right-icon lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>',
    loop = true,
    log = false,
  } = par || {};

  let leftArrow: HTMLButtonElement | null = null;
  let rightArrow: HTMLButtonElement | null = null;

  return {
    name: "ArrowExtension",
    onInit(motionRail: MotionRail, state: MotionRailState) {
      const { totalItems } = state;

      if (totalItems === 0) {
        return;
      }

      const { rtl } = motionRail.getOptions();
      leftArrow = document.createElement("button");
      leftArrow.innerHTML = leftIcon;
      leftArrow.className = "motionrail-arrow motionrail-arrow-left";
      leftArrow.addEventListener("click", () => {
        rtl ? motionRail.next() : motionRail.prev();
      });

      rightArrow = document.createElement("button");
      rightArrow.innerHTML = rightIcon;
      rightArrow.className = "motionrail-arrow motionrail-arrow-right";
      rightArrow.addEventListener("click", () => {
        rtl ? motionRail.prev() : motionRail.next();
      });

      motionRail.element.appendChild(leftArrow);
      motionRail.element.appendChild(rightArrow);
    },
    onUpdate(_motionRail: MotionRail, state: MotionRailState) {
      if (!leftArrow || !rightArrow) return;
      const {
        isFirstItemVisible,
        isLastItemVisible,
        totalItems,
        visibleItemIndexes,
      } = state;
      if (!loop) {
        leftArrow.disabled = isFirstItemVisible;
        rightArrow.disabled = isLastItemVisible;
      }

      if (visibleItemIndexes.length < totalItems) {
        leftArrow.style.removeProperty("display");
        rightArrow.style.removeProperty("display");
      } else {
        leftArrow.style.display = "none";
        rightArrow.style.display = "none";
      }

      if (!totalItems) {
        leftArrow.style.display = "none";
        rightArrow.style.display = "none";
      }

      if (log) {
        console.log("ArrowExtension updated", state);
      }
    },
    onDestroy(_motionRail: MotionRail, _state: MotionRailState) {
      leftArrow?.remove();
      rightArrow?.remove();
    },
  };
}
