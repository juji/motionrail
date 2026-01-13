import type { MotionRailBreakpoint } from "./types";

export function randomContainerName() : string {
  return `motion-rail-${Math.random().toString(36).substring(2, 11)}`;
}

export function setBreakPoints( par :{
  container: HTMLElement,
  breakpoints: MotionRailBreakpoint[],
  length: number,
}) {

  const { container, breakpoints, length } = par;
  const motionRailContainer = container.querySelector('.motion-rail-container') as HTMLElement;
  if(!motionRailContainer) return;

  // give random css-safe container-name  
  let randomName = "";
  if(!container.style.containerName){
    randomName = randomContainerName();
    container.style.containerName = randomName;
  }else{
    randomName = container.style.containerName;
  }

  // setup container query
  const styleElement = document.createElement("style");
  let containerQueries = "";

  // Find the smallest width for base case max-width
  const withWidth = breakpoints.filter(bp => bp.width);
  const smallestWidth = withWidth.length > 0 ? Math.min(...withWidth.map(bp => bp.width!)) : null;

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
        .motion-rail-container {
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

export function animateScroll(
  element: HTMLElement,
  targetScroll: number,
  duration: number = 300,
  onComplete?: () => void
): () => void {
  const startScroll = element.scrollLeft;
  const distance = targetScroll - startScroll;
  const startTime = performance.now();
  let animationId: number;
  let cancelled = false;

  // Easing function (ease-out-cubic)
  const easeOutCubic = (t: number): number => {
    return 1 - Math.pow(1 - t, 3);
  };

  const animate = (currentTime: number) => {
    if (cancelled) return;

    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeOutCubic(progress);

    element.scrollLeft = startScroll + distance * easedProgress;

    if (progress < 1) {
      animationId = requestAnimationFrame(animate);
    } else {
      // Animation completed naturally
      if (onComplete) onComplete();
    }
  };

  animationId = requestAnimationFrame(animate);

  // Return cancel function
  return () => {
    if (!cancelled) {
      cancelled = true;
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      // Call onComplete even when cancelled
      if (onComplete) onComplete();
    }
  };
}
