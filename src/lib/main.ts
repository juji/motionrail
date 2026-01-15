import type {
  MotionRailBreakpoint,
  MotionRailExtension,
  MotionRailOptions,
  MotionRailState,
} from "./types";

export class MotionRail {
  element: HTMLElement;
  scrollable: HTMLElement;

  private rtl: boolean = false;
  private autoplay: boolean = false;
  private delay: number = 3000;
  private resumeDelay: number = 4000;
  private onChange?: (state: MotionRailState) => void;

  private handleStateChange = () => {
    const state = this.getState();
    this.extensions.forEach((ext) => {
      if (ext.onUpdate) {
        ext.onUpdate(this, state);
      }
    });

    if (this.onChange) {
      this.onChange(state);
    }
  };

  private extensions: MotionRailExtension[] = [];

  private breakpoints: MotionRailBreakpoint[] = [];
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

  constructor(element: HTMLElement, options: MotionRailOptions) {
    this.autoplay = options.autoplay || false;
    this.rtl = options.rtl || false;
    this.breakpoints = options.breakpoints || [{ columns: 1, gap: "0px" }];
    this.element = element;
    this.extensions = options.extensions || [];

    const container = this.element.querySelector(
      "[data-motion-rail-scrollable]",
    ) as HTMLElement;
    if (!container) {
      throw new Error(
        "MotionRail: [data-motion-rail-scrollable] element not found",
      );
    }
    this.scrollable = container;

    this.delay = options.delay || 3000;
    this.resumeDelay = options.resumeDelay || 4000;
    this.onChange = options.onChange;
    this.state.totalItems = this.element.querySelectorAll(
      "[data-motion-rail-grid] > *",
    ).length;

    this.setBreakPoints();

    this.setLogicalScroll(0);

    this.attachPointerEvents();
    this.cacheSnapPoints();
    this.observeResize();
    this.observeEdgeItems();
    if (this.autoplay) this.play();

    const state = this.getState();
    this.extensions.forEach((ext) => {
      if (ext.onInit) {
        ext.onInit(this, state);
      }
    });
  }

  // ============================================================================
  // UTILITY METHODS
  // ============================================================================

  private randomContainerName(): string {
    return `motion-rail-${Math.random().toString(36).substring(2, 11)}`;
  }

  private setBreakPoints() {
    const motionRailContainer = this.element.querySelector(
      "[data-motion-rail-scrollable]",
    ) as HTMLElement;
    if (!motionRailContainer) return;

    // give random css-safe container-name
    let randomName = "";
    if (!motionRailContainer.style.containerName) {
      randomName = this.randomContainerName();
      motionRailContainer.style.containerName = randomName;
    } else {
      randomName = motionRailContainer.style.containerName;
    }

    // setup container query
    const styleElement = document.createElement("style");
    let containerQueries = "";

    // Find the smallest width for base case max-width
    const withWidth = this.breakpoints.filter((bp) => bp.width);
    const smallestWidth =
      withWidth.length > 0
        ? Math.min(...withWidth.map((bp) => bp.width!))
        : null;

    this.breakpoints.forEach((bp) => {
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
          grid-template-columns: repeat(${this.state.totalItems}, ${itemWidth});
          gap: ${gapValue};
        }
      }
    `;
    });
    styleElement.textContent = containerQueries;
    document.head.appendChild(styleElement);

    return styleElement;
  }

  // ============================================================================
  // CORE LOGIC: All operations in logical space
  // ============================================================================

  private getLogicalScroll(): number {
    return this.scrollable.scrollLeft;
  }

  private setLogicalScroll(logicalScroll: number): void {
    this.scrollable.scrollLeft = logicalScroll;
  }

  private scrollToLogical(
    logicalScroll: number,
    behavior: ScrollBehavior = "auto",
  ): void {
    this.scrollable.scrollTo({ left: logicalScroll, behavior });
  }

  private observeResize() {
    if (typeof ResizeObserver === "undefined") return;

    this.resizeObserver = new ResizeObserver(() => {
      this.cacheSnapPoints();
    });

    this.resizeObserver.observe(this.scrollable);
  }

  private observeEdgeItems() {
    if (typeof IntersectionObserver === "undefined") return;

    const items = this.element.querySelectorAll("[data-motion-rail-grid] > *");
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

        if (stateChanged) {
          this.handleStateChange();
        }
      },
      {
        root: this.scrollable,
        threshold: 0.5,
      },
    );

    items.forEach((item) => this.intersectionObserver!.observe(item));
  }

  private cacheSnapPoints() {
    const items = this.element.querySelectorAll(
      "[data-motion-rail-grid] > *",
    ) as NodeListOf<HTMLElement>;
    const maxScroll = this.scrollable.scrollWidth - this.scrollable.clientWidth;

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
    this.scrollable.addEventListener("pointerdown", this.handlePointerDown);
    this.scrollable.addEventListener("pointermove", this.handlePointerMove);
    this.scrollable.addEventListener("pointerup", this.handlePointerUp);
    this.scrollable.addEventListener("pointerleave", this.handlePointerUp);
  }

  private handlePointerDown = (e: PointerEvent) => {
    if (this.pointerId !== null) return;

    this.pointerId = e.pointerId;
    this.scrollable.setPointerCapture(e.pointerId);
    this.isDragging = true;
    this.startX = e.clientX;
    this.startLogicalScroll = this.getLogicalScroll();
    this.lastPointerX = e.clientX;
    this.lastPointerTime = e.timeStamp;
    this.velocity = 0;

    this.scrollable.style.userSelect = "none";
    this.scrollable.style.scrollSnapType = "none";
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

    this.scrollable.releasePointerCapture(e.pointerId);
    this.pointerId = null;
    this.isDragging = false;

    this.scrollable.style.userSelect = "";

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
      this.scrollable.style.scrollSnapType = "x mandatory";
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
    if (this.autoPlayIntervalId) {
      clearInterval(this.autoPlayIntervalId);
      this.autoPlayIntervalId = null;
    }

    if (this.autoPlayTimeoutId) {
      clearTimeout(this.autoPlayTimeoutId);
      this.autoPlayTimeoutId = null;
    }

    if (this.isDragging) return;
    if (!this.autoplay) return;
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
    return {
      ...this.state,
      visibleItemIndexes: [...this.state.visibleItemIndexes],
    };
  }

  getOptions() {
    return {
      autoplay: this.autoplay,
      rtl: this.rtl,
      delay: this.delay,
      resumeDelay: this.resumeDelay,
      breakpoints: this.breakpoints.map((bp) => ({ ...bp })),
    };
  }

  update() {
    // Disconnect existing intersection observer
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
      this.intersectionObserver = null;
    }

    // Update total items count
    this.state.totalItems = this.element.querySelectorAll(
      "[data-motion-rail-grid] > *",
    ).length;

    // Reset visible items state
    this.state.visibleItemIndexes = [];
    this.state.isFirstItemVisible = false;
    this.state.isLastItemVisible = false;

    // Re-apply breakpoints with new item count
    this.setBreakPoints();

    // Recache snap points with new items
    this.cacheSnapPoints();

    // Re-observe edge items
    this.observeEdgeItems();

    // Notify state change
    this.handleStateChange();
  }

  destroy() {
    const state = this.getState();
    this.extensions.forEach((ext) => {
      if (ext.onDestroy) {
        ext.onDestroy(this, state);
      }
    });

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

    this.scrollable.removeEventListener("pointerdown", this.handlePointerDown);
    this.scrollable.removeEventListener("pointermove", this.handlePointerMove);
    this.scrollable.removeEventListener("pointerup", this.handlePointerUp);
    this.scrollable.removeEventListener("pointerleave", this.handlePointerUp);
  }
}
