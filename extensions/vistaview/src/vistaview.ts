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
  let clickHandler: ((e: Event) => void) | null = null;

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

  return {
    name: "VistaViewExtension",
    onInit(motionRail: MotionRail) {
      clickHandler = (e: Event) => {
        const target = e.currentTarget as HTMLElement;
        const items = motionRail.element.querySelectorAll(selector);
        const index = Array.from(items).indexOf(target);
        if (index === -1) return;

        if (vistaInstance) {
          vistaInstance.view(index);
          return;
        }

        const instance = vistaView({
          elements: getImageConfigs(motionRail),
          ...vistaViewOptions,
        });

        vistaInstance = instance!;
        instance!.open(index);
      };

      motionRail.element
        .querySelectorAll(selector)
        .forEach((item) => item.addEventListener("click", clickHandler!));
    },
    onDestroy(motionRail: MotionRail) {
      if (clickHandler) {
        motionRail.element
          .querySelectorAll(selector)
          .forEach((item) => item.removeEventListener("click", clickHandler!));
      }
      vistaInstance?.destroy();
      vistaInstance = null;
      clickHandler = null;
    },
  };
}
