import type { MotionRailBreakpoint } from "./types";

export function randomContainerName(): string {
  return `motion-rail-${Math.random().toString(36).substring(2, 11)}`;
}

export function setBreakPoints(par: {
  container: HTMLElement;
  breakpoints: MotionRailBreakpoint[];
  length: number;
}) {
  const { container, breakpoints, length } = par;
  const motionRailContainer = container.querySelector(
    "[data-motion-rail-scrollable]",
  ) as HTMLElement;
  if (!motionRailContainer) return;

  // give random css-safe container-name
  let randomName = "";
  if (!motionRailContainer.style.containerName) {
    randomName = randomContainerName();
    motionRailContainer.style.containerName = randomName;
  } else {
    randomName = motionRailContainer.style.containerName;
  }

  // setup container query
  const styleElement = document.createElement("style");
  let containerQueries = "";

  // Find the smallest width for base case max-width
  const withWidth = breakpoints.filter((bp) => bp.width);
  const smallestWidth =
    withWidth.length > 0 ? Math.min(...withWidth.map((bp) => bp.width!)) : null;

  breakpoints.forEach((bp) => {
    const columns = bp.columns || 1;
    const gapValue = bp.gap || "0px";
    const itemWidth = `calc((100cqw - (${columns - 1} * ${gapValue})) / ${columns})`;

    let condition = "";
    if (bp.width) {
      condition = `(min-width: ${bp.width}px)`;
    } else if (smallestWidth) {
      condition = `(max-width: ${smallestWidth - 1}px)`;
    } else {
      // Single breakpoint with no width
      condition = `(min-width: 0px)`;
    }

    containerQueries += `
      @container ${randomName} ${condition} {
        [data-motion-rail-grid] {
          grid-template-columns: repeat(${length}, ${itemWidth});
          gap: ${gapValue};
        }
      }
    `;
  });
  styleElement.textContent = containerQueries;
  document.head.appendChild(styleElement);

  return styleElement;
}
