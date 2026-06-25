import { MotionRail } from "motionrail";
import type { MotionRailExtension } from "motionrail";
import { vistaView } from "vistaview";
import type { VistaOpt, VistaInterface } from "vistaview";

export function VistaViewLightbox(par?: {
  vistaViewOptions?: Partial<VistaOpt>;
  selector?: string;
}): MotionRailExtension {
  const { vistaViewOptions = {}, selector = "[data-motionrail-grid] > *" } =
    par || {};

  let vistaInstance: VistaInterface | null = null;
  let pointerDownHandler: ((e: Event) => void) | null = null;
  let pointerUpHandler: ((e: Event) => void) | null = null;
  let startX = 0;
  let startY = 0;

  function getImageConfigs(motionRail: MotionRail) {
    const items = motionRail.element.querySelectorAll(selector);
    return Array.from(items).map((item) => {
      const anchor = item.querySelector("a");
      const img = item.querySelector("img");
      return {
        src: anchor?.getAttribute("href") || img?.getAttribute("src") || "",
        alt:
          img?.getAttribute("alt") ||
          anchor?.querySelector("img")?.getAttribute("alt") ||
          "",
      };
    });
  }

  function openVistaView(index: number, motionRail: MotionRail) {
    if (vistaInstance) {
      vistaInstance.open(index);
      return;
    }

    const instance = vistaView({
      elements: getImageConfigs(motionRail),
      ...vistaViewOptions,
    });

    vistaInstance = instance!;
    instance!.open(index);
  }

  return {
    name: "VistaViewExtension",
    onInit(motionRail: MotionRail) {
      pointerDownHandler = (e: Event) => {
        const pe = e as PointerEvent;
        startX = pe.clientX;
        startY = pe.clientY;
      };

      pointerUpHandler = (e: Event) => {
        const pe = e as PointerEvent;
        const dx = Math.abs(pe.clientX - startX);
        const dy = Math.abs(pe.clientY - startY);

        if (dx > 5 || dy > 5) return;

        const items = motionRail.element.querySelectorAll(selector);
        for (let i = 0; i < items.length; i++) {
          const rect = items[i].getBoundingClientRect();
          if (
            pe.clientX >= rect.left &&
            pe.clientX <= rect.right &&
            pe.clientY >= rect.top &&
            pe.clientY <= rect.bottom
          ) {
            openVistaView(i, motionRail);
            return;
          }
        }
      };

      motionRail.element.addEventListener(
        "pointerdown",
        pointerDownHandler,
        true,
      );
      document.addEventListener("pointerup", pointerUpHandler);
    },
    onDestroy(motionRail: MotionRail) {
      if (pointerDownHandler) {
        motionRail.element.removeEventListener(
          "pointerdown",
          pointerDownHandler,
          true,
        );
      }
      if (pointerUpHandler) {
        document.removeEventListener("pointerup", pointerUpHandler);
      }
      vistaInstance?.destroy();
      vistaInstance = null;
      pointerDownHandler = null;
      pointerUpHandler = null;
    },
  };
}
