import type {
  MotionRailBreakpoint,
  MotionRailOptions,
  MotionRailState,
} from "./types";
import { setBreakPoints } from "./utils";

export class MotionRail {
  private rtl: boolean = false;
  private autoplay: boolean = false;
  private breakpoints: MotionRailBreakpoint[] = [];
  private element: HTMLElement;
  private container: HTMLElement;
  private delay: number = 3000;
  private resumeDelay: number = 4000;
  private autoPlayIntervalId: number | null = null;
  private autoPlayTimeoutId: number | null = null;
  private isDragging: boolean = false;
  private startX: number = 0;
  private startLogicalScroll: number = 0;
  private cancelScroll: (() => void) | null = null;
  private lastPointerX: number = 0;
  private lastPointerTime: number = 0;
  private velocity: number = 0;
  private pointerId: number | null = null;
  private snapPoints: number[] = [];
  private resizeObserver: ResizeObserver | null = null;
  private intersectionObserver: IntersectionObserver | null = null;
  private state: MotionRailState = {
    totalItems: 0,
    visibleItemIndexes: [],
    isFirstItemVisible: false,
    isLastItemVisible: false,
  };
  private onChange?: (state: MotionRailState) => void;

  constructor(element: HTMLElement, options: MotionRailOptions) {
    this.autoplay = options.autoplay || false;
    this.rtl = options.rtl || false;
    this.breakpoints = options.breakpoints || [{ columns: 1, gap: "0px" }];
    this.element = element;

    const container = this.element.querySelector(
      ".motion-rail-scrollable",
    ) as HTMLElement;
    if (!container) {
      throw new Error("MotionRail: .motion-rail-scrollable element not found");
    }
    this.container = container;

    this.delay = options.delay || 3000;
    this.resumeDelay = options.resumeDelay || 4000;
    this.onChange = options.onChange;
    this.state.totalItems =
      this.element.querySelectorAll(".motion-rail-item").length;

    setBreakPoints({
      container: this.element,
      breakpoints: this.breakpoints,
      length: this.element.querySelectorAll(".motion-rail-item").length,
    });

    this.setLogicalScroll(0);
    this.container.style.cursor = "grab";
    this.attachPointerEvents();
    this.cacheSnapPoints();
    this.observeResize();
    this.observeEdgeItems();
    if (this.autoplay) this.play();
  }

  // ============================================================================
  // CORE LOGIC: All operations in logical space
  // ============================================================================

  private getLogicalScroll(): number {
    return this.container.scrollLeft;
  }

  private setLogicalScroll(logicalScroll: number): void {
    this.container.scrollLeft = logicalScroll;
  }

  private scrollToLogical(
    logicalScroll: number,
    behavior: ScrollBehavior = "auto",
  ): void {
    this.container.scrollTo({ left: logicalScroll, behavior });
  }

  private observeResize() {
    if (typeof ResizeObserver === "undefined") return;

    this.resizeObserver = new ResizeObserver(() => {
      this.cacheSnapPoints();
    });

    this.resizeObserver.observe(this.container);
  }

  private observeEdgeItems() {
    if (typeof IntersectionObserver === "undefined") return;

    const items = this.element.querySelectorAll(".motion-rail-item");
    if (items.length === 0) return;

    const firstItem = items[0];
    const lastItem = items[items.length - 1];

    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        let stateChanged = false;
        entries.forEach((entry) => {
          const index = Array.from(items).indexOf(entry.target as Element);
          if (index === -1) return;

          if (entry.isIntersecting) {
            if (!this.state.visibleItemIndexes.includes(index)) {
              this.state.visibleItemIndexes.push(index);
              this.state.visibleItemIndexes.sort((a, b) => a - b);
              stateChanged = true;
            }
          } else {
            const prevLength = this.state.visibleItemIndexes.length;
            this.state.visibleItemIndexes =
              this.state.visibleItemIndexes.filter((i) => i !== index);
            if (this.state.visibleItemIndexes.length !== prevLength) {
              stateChanged = true;
            }
          }

          // Update edge visibility flags
          if (entry.target === firstItem) {
            const newValue = entry.isIntersecting;
            if (this.state.isFirstItemVisible !== newValue) {
              this.state.isFirstItemVisible = newValue;
              stateChanged = true;
            }
          } else if (entry.target === lastItem) {
            const newValue = entry.isIntersecting;
            if (this.state.isLastItemVisible !== newValue) {
              this.state.isLastItemVisible = newValue;
              stateChanged = true;
            }
          }
        });

        if (stateChanged && this.onChange) {
          this.onChange({ ...this.state });
        }
      },
      {
        root: this.container,
        threshold: 0.5,
      },
    );

    items.forEach((item) => this.intersectionObserver!.observe(item));
  }

  private cacheSnapPoints() {
    const items = this.element.querySelectorAll(
      ".motion-rail-item",
    ) as NodeListOf<HTMLElement>;
    const maxScroll = this.container.scrollWidth - this.container.clientWidth;

    this.snapPoints = Array.from(items).map((item) => {
      // Snap points are stored in logical space (0-based, increasing forward)
      return Math.min(item.offsetLeft, maxScroll);
    });
  }

  private findNearestSnapPoint(logicalScroll: number): number {
    let nearestPoint = 0;
    let minDistance = Infinity;

    for (const point of this.snapPoints) {
      const distance = Math.abs(point - logicalScroll);
      if (distance < minDistance) {
        minDistance = distance;
        nearestPoint = point;
      }
    }

    return nearestPoint;
  }

  private attachPointerEvents() {
    this.container.addEventListener("pointerdown", this.handlePointerDown);
    this.container.addEventListener("pointermove", this.handlePointerMove);
    this.container.addEventListener("pointerup", this.handlePointerUp);
    this.container.addEventListener("pointerleave", this.handlePointerUp);
  }

  private handlePointerDown = (e: PointerEvent) => {
    if (this.pointerId !== null) return;

    this.pointerId = e.pointerId;
    this.container.setPointerCapture(e.pointerId);
    this.isDragging = true;
    this.startX = e.clientX;
    this.startLogicalScroll = this.getLogicalScroll();
    this.lastPointerX = e.clientX;
    this.lastPointerTime = e.timeStamp;
    this.velocity = 0;
    this.container.style.cursor = "grabbing";
    this.container.style.userSelect = "none";
    this.container.style.scrollSnapType = "none";
    this.pause();
    if (this.cancelScroll) {
      this.cancelScroll();
    }
    if (this.autoPlayTimeoutId) clearTimeout(this.autoPlayTimeoutId);
  };

  private handlePointerMove = (e: PointerEvent) => {
    if (!this.isDragging || e.pointerId !== this.pointerId) return;
    e.preventDefault();

    const deltaX = e.clientX - this.startX;
    const logicalScroll = this.startLogicalScroll - deltaX;
    this.setLogicalScroll(logicalScroll);

    const deltaTime = e.timeStamp - this.lastPointerTime;
    if (deltaTime > 0) {
      const pointerDelta = e.clientX - this.lastPointerX;
      this.velocity = pointerDelta / deltaTime;
      this.lastPointerX = e.clientX;
      this.lastPointerTime = e.timeStamp;
    }
  };

  private handlePointerUp = (e: PointerEvent) => {
    if (!this.isDragging || e.pointerId !== this.pointerId) return;

    this.container.releasePointerCapture(e.pointerId);
    this.pointerId = null;
    this.isDragging = false;
    this.container.style.cursor = "grab";
    this.container.style.userSelect = "";

    const velocityMagnitude = Math.abs(this.velocity);
    const baseTime = 100;
    const maxTime = 200;
    const momentumTime = Math.min(
      baseTime + Math.sqrt(velocityMagnitude) * 50,
      maxTime,
    );
    const momentum = -this.velocity * momentumTime;

    const currentLogicalScroll = this.getLogicalScroll();
    const targetLogicalScroll = currentLogicalScroll + momentum;

    if (this.cancelScroll) {
      this.cancelScroll();
    }

    const snapPoint = this.findNearestSnapPoint(targetLogicalScroll);

    const onScrollEnd = () => {
      this.container.style.scrollSnapType = "x mandatory";
      this.cancelScroll = null;
      if (this.autoplay) {
        this.autoPlayTimeoutId = window.setTimeout(() => {
          this.play();
          this.autoPlayTimeoutId = null;
        }, this.resumeDelay);
      }
    };

    // Create a wrapper that animates in logical space
    this.cancelScroll = this.animateLogicalScroll(
      snapPoint,
      momentumTime,
      onScrollEnd,
    );
    this.velocity = 0;
  };

  private animateLogicalScroll(
    targetLogical: number,
    duration: number,
    onComplete: () => void,
  ): () => void {
    const startLogical = this.getLogicalScroll();
    const startTime = performance.now();
    let cancelled = false;

    const animate = (currentTime: number) => {
      if (cancelled) return;

      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const currentLogical =
        startLogical + (targetLogical - startLogical) * eased;

      this.setLogicalScroll(currentLogical);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        onComplete();
      }
    };

    requestAnimationFrame(animate);
    return () => {
      cancelled = true;
    };
  }

  private scrollByPage(direction: 1 | -1) {
    if (this.state.visibleItemIndexes.length === 0) return;

    let targetIndex: number;
    const firstVisibleIndex = this.state.visibleItemIndexes[0];
    const lastVisibleIndex =
      this.state.visibleItemIndexes[this.state.visibleItemIndexes.length - 1];
    const visibleCount = this.state.visibleItemIndexes.length;

    if (direction === 1) {
      // Going forward: skip all visible items, go to the next one
      targetIndex = lastVisibleIndex + 1;
      if (this.rtl) {
        targetIndex = lastVisibleIndex + visibleCount;
      }

      if (
        targetIndex >= this.snapPoints.length - 1 &&
        this.state.isLastItemVisible
      ) {
        targetIndex = 0;
      } else if (
        targetIndex >= this.snapPoints.length - 1 &&
        !this.state.isLastItemVisible
      ) {
        targetIndex = this.snapPoints.length - 1;
      }
    } else {
      // Going backward: skip all visible items, go to the previous one
      targetIndex = firstVisibleIndex - visibleCount;
      if (this.rtl) {
        targetIndex = lastVisibleIndex - visibleCount;
      }

      if (targetIndex <= 0 && this.state.isFirstItemVisible) {
        targetIndex = this.snapPoints.length - 1;
      } else if (targetIndex <= 0 && !this.state.isFirstItemVisible) {
        targetIndex = 0;
      }
    }

    this.scrollToLogical(this.snapPoints[targetIndex], "smooth");
  }

  play() {
    this.autoPlayIntervalId = window.setInterval(() => {
      this.scrollByPage(1);
    }, this.delay);
  }

  next() {
    this.pause();
    this.scrollByPage(1);
  }

  prev() {
    this.pause();
    this.scrollByPage(-1);
  }

  pause() {
    if (!this.autoplay) return;

    if (this.autoPlayIntervalId) {
      clearInterval(this.autoPlayIntervalId);
      this.autoPlayIntervalId = null;
    }

    if (this.autoPlayTimeoutId) {
      clearTimeout(this.autoPlayTimeoutId);
      this.autoPlayTimeoutId = null;
    }

    if (this.isDragging) return;
    this.autoPlayTimeoutId = window.setTimeout(() => {
      this.play();
      this.autoPlayTimeoutId = null;
    }, this.resumeDelay);
  }

  scrollToIndex(index: number) {
    this.pause();
    if (index >= 0 && index < this.snapPoints.length) {
      this.scrollToLogical(this.snapPoints[index], "smooth");
    }
  }

  getState() {
    return { ...this.state };
  }

  destroy() {
    if (this.autoPlayIntervalId) {
      clearInterval(this.autoPlayIntervalId);
      this.autoPlayIntervalId = null;
    }

    if (this.cancelScroll) {
      this.cancelScroll();
      this.cancelScroll = null;
    }

    if (this.autoPlayTimeoutId) {
      clearTimeout(this.autoPlayTimeoutId);
      this.autoPlayTimeoutId = null;
    }

    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }

    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
      this.intersectionObserver = null;
    }

    this.container.removeEventListener("pointerdown", this.handlePointerDown);
    this.container.removeEventListener("pointermove", this.handlePointerMove);
    this.container.removeEventListener("pointerup", this.handlePointerUp);
    this.container.removeEventListener("pointerleave", this.handlePointerUp);
  }
}
