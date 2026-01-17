import { MotionRail } from "motionrail";
import type { MotionRailExtension, MotionRailState } from "motionrail";
import "./style.css";

export function Thumbnails(par?: {
  thumbnailWidth?: number;
  thumbnailHeight?: number;
  log?: boolean;
}): MotionRailExtension {
  let thumbnailsContainer: HTMLDivElement | null = null;
  const thumbnails: HTMLButtonElement[] = [];
  const { thumbnailWidth = 80, thumbnailHeight = 80, log = false } = par || {};

  return {
    name: "ThumbnailsExtension",
    onInit(motionRail: MotionRail, state: MotionRailState) {
      const { totalItems } = state;

      if (totalItems === 0) {
        return;
      }

      thumbnailsContainer = document.createElement("div");

      thumbnailsContainer.className = "motionrail-thumbnails";
      thumbnailsContainer.style.setProperty(
        "--thumbnail-width",
        `${thumbnailWidth}px`,
      );
      thumbnailsContainer.style.setProperty(
        "--thumbnail-height",
        `${thumbnailHeight}px`,
      );

      const items = motionRail.element.querySelectorAll(
        "[data-motionrail-grid] > *",
      );

      items.forEach((item, index) => {
        const thumbnail = document.createElement("button");
        thumbnail.className = "motionrail-thumbnail";
        thumbnail.setAttribute("aria-label", `Go to item ${index + 1}`);

        const clone = item.cloneNode(true) as HTMLElement;
        clone.removeAttribute("data-motionrail-item");
        thumbnail.appendChild(clone);

        thumbnail.addEventListener("click", () => {
          motionRail.scrollToIndex(index);
        });

        thumbnails.push(thumbnail);
        thumbnailsContainer!.appendChild(thumbnail);
      });

      motionRail.element.appendChild(thumbnailsContainer);
    },
    onUpdate(_motionRail: MotionRail, state: MotionRailState) {
      const { visibleItemIndexes, totalItems } = state;
      if (!thumbnailsContainer) return;

      if (!totalItems) {
        thumbnailsContainer.style.display = "none";
        return;
      }

      thumbnailsContainer.style.removeProperty("display");
      thumbnails.forEach((thumbnail, index) => {
        if (visibleItemIndexes.includes(index)) {
          thumbnail.classList.add("motionrail-thumbnail-active");
        } else {
          thumbnail.classList.remove("motionrail-thumbnail-active");
        }
      });

      if (visibleItemIndexes.length > 0) {
        const firstActiveThumbnail = thumbnails[visibleItemIndexes[0]];
        if (firstActiveThumbnail) {
          const containerWidth = thumbnailsContainer.offsetWidth;
          const thumbnailLeft = firstActiveThumbnail.offsetLeft;
          const thumbnailWidth = firstActiveThumbnail.offsetWidth;
          const scrollPosition =
            thumbnailLeft - containerWidth / 2 + thumbnailWidth / 2;

          thumbnailsContainer.scrollTo({
            left: scrollPosition,
            behavior: "smooth",
          });
        }
      }

      if (log) {
        console.log("ThumbnailsExtension updated", state);
      }
    },
    onDestroy(_motionRail: MotionRail, _state: MotionRailState) {
      thumbnailsContainer?.remove();
      thumbnails.length = 0;
    },
  };
}
