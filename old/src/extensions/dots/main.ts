import { MotionRail } from "../../motionrail";
import type { MotionRailExtension, MotionRailState } from "../../motionrail";

export function Dots(par?: {
  showIndex?: boolean;
  dotSize?: number;
  fontSize?: number;
  log?: boolean;
}): MotionRailExtension {
  let dotsContainer: HTMLDivElement | null = null;
  const dots: HTMLButtonElement[] = [];
  const {
    showIndex = false,
    dotSize = 34,
    fontSize = 12,
    log = false,
  } = par || {};

  return {
    name: "DotsExtension",
    onInit(motionRail: MotionRail, state: MotionRailState) {
      const { totalItems } = state;

      if (totalItems === 0) {
        return;
      }

      dotsContainer = document.createElement("div");

      dotsContainer.className = "motionrail-dots";
      dotsContainer.style.setProperty("--dot-size", `${dotSize}px`);
      dotsContainer.style.setProperty("--dot-font-size", `${fontSize}px`);

      // Create a dot for each item
      for (let i = 0; i < totalItems; i++) {
        const dot = document.createElement("button");
        dot.className = "motionrail-dot";
        dot.setAttribute("aria-label", `Go to item ${i + 1}`);

        if (showIndex) {
          dot.textContent = (i + 1).toString();
        }

        dot.addEventListener("click", () => {
          motionRail.scrollToIndex(i);
        });

        dots.push(dot);
        dotsContainer.appendChild(dot);
      }

      motionRail.element.appendChild(dotsContainer);
    },
    onUpdate(_motionRail: MotionRail, state: MotionRailState) {
      const { visibleItemIndexes, totalItems } = state;
      if (!dotsContainer) return;

      if (!totalItems) {
        dotsContainer.style.display = "none";
        return;
      }

      dotsContainer.style.removeProperty("display");

      // Update active state for each dot
      dots.forEach((dot, index) => {
        if (visibleItemIndexes.includes(index)) {
          dot.classList.add("motionrail-dot-active");
        } else {
          dot.classList.remove("motionrail-dot-active");
        }
      });

      // Scroll to center the first active dot
      if (visibleItemIndexes.length > 0) {
        const firstActiveDot = dots[visibleItemIndexes[0]];
        if (firstActiveDot) {
          const containerWidth = dotsContainer.offsetWidth;
          const dotLeft = firstActiveDot.offsetLeft;
          const dotWidth = firstActiveDot.offsetWidth;
          const scrollPosition = dotLeft - containerWidth / 2 + dotWidth / 2;

          dotsContainer.scrollTo({
            left: scrollPosition,
            behavior: "smooth",
          });
        }
      }

      if (log) {
        console.log("DotsExtension updated", state);
      }
    },
    onDestroy(_motionRail: MotionRail, _state: MotionRailState) {
      dotsContainer?.remove();
      dots.length = 0;
    },
  };
}
