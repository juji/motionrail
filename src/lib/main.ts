import type { MotionRailBreakpoint, MotioRailOptions } from "./types";
import { setBreakPoints, 
  // animateScroll 
} from "./utils";

type RTLScrollType = 'default' | 'negative' | 'reverse';

export class MotionRail {
  private rtl: boolean = false;
  private rtlScrollType: RTLScrollType = 'default';
  private autoplay: boolean = false;
  private breakpoints: MotionRailBreakpoint[] = [];
  private element: HTMLElement;
  private delay: number = 3000;
  private resumeDelay: number = 4000;
  private autoPlayIntervalId: number | null = null;
  private autoPlayTimeoutId: number | null = null;
  private currentIndex: number = 0;
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

  constructor(element: HTMLElement, options: MotioRailOptions) {
    this.autoplay = options.autoplay || false;
    this.rtl = options.rtl || false;
    this.breakpoints = options.breakpoints;
    this.element = element;
    this.delay = options.delay || 3000;
    this.resumeDelay = options.resumeDelay || 4000;

    if (this.rtl) {
      this.rtlScrollType = this.detectRTLScrollType();
    }

    setBreakPoints({
      container: this.element,
      breakpoints: this.breakpoints,
      length: this.element.querySelectorAll('.motion-rail-item').length
    });

    this.init();
    this.attachPointerEvents();
    this.cacheSnapPoints();
    this.observeResize();
    if (this.autoplay) this.play();
  }

  // ============================================================================
  // NORMALIZATION LAYER: Convert between physical scrollLeft and logical space
  // ============================================================================

  private detectRTLScrollType(): RTLScrollType {
    const test = document.createElement('div');
    test.dir = 'rtl';
    test.style.width = '1px';
    test.style.height = '1px';
    test.style.position = 'absolute';
    test.style.top = '-1000px';
    test.style.overflow = 'scroll';
    
    const content = document.createElement('div');
    content.style.width = '2px';
    content.style.height = '1px';
    test.appendChild(content);
    
    document.body.appendChild(test);
    
    let type: RTLScrollType = 'default';
    const initialScroll = test.scrollLeft;
    
    if (initialScroll > 0) {
      type = 'reverse'; // Firefox: starts at max, decreases to 0
    } else {
      test.scrollLeft = 1;
      if (test.scrollLeft < 0) {
        type = 'negative'; // Chrome: starts at 0, goes negative
      }
      // else: Safari uses default (0 to positive)
    }
    
    document.body.removeChild(test);
    return type;
  }

  private getLogicalScroll(): number {
    if (!this.rtl) {
      return this.element.scrollLeft;
    }

    const scrollLeft = this.element.scrollLeft;
    const maxScroll = this.element.scrollWidth - this.element.clientWidth;

    switch (this.rtlScrollType) {
      case 'negative':
        // Chrome: 0 → -maxScroll, convert to 0 → maxScroll
        return -scrollLeft;
      case 'reverse':
        // Firefox: maxScroll → 0, convert to 0 → maxScroll
        return maxScroll - scrollLeft;
      default:
        // Safari: 0 → maxScroll (already logical)
        return scrollLeft;
    }
  }

  private setLogicalScroll(logicalScroll: number): void {
    if (!this.rtl) {
      this.element.scrollLeft = logicalScroll;
      return;
    }

    const maxScroll = this.element.scrollWidth - this.element.clientWidth;

    switch (this.rtlScrollType) {
      case 'negative':
        // Convert logical 0 → maxScroll to physical 0 → -maxScroll
        this.element.scrollLeft = -logicalScroll;
        break;
      case 'reverse':
        // Convert logical 0 → maxScroll to physical maxScroll → 0
        this.element.scrollLeft = maxScroll - logicalScroll;
        break;
      default:
        // Safari: logical === physical
        this.element.scrollLeft = logicalScroll;
        break;
    }
  }

  private scrollToLogical(logicalScroll: number, behavior: ScrollBehavior = 'auto'): void {
    if (!this.rtl) {
      this.element.scrollTo({ left: logicalScroll, behavior });
      return;
    }

    const maxScroll = this.element.scrollWidth - this.element.clientWidth;
    let physicalScroll: number;

    switch (this.rtlScrollType) {
      case 'negative':
        physicalScroll = -logicalScroll;
        break;
      case 'reverse':
        physicalScroll = maxScroll - logicalScroll;
        break;
      default:
        physicalScroll = logicalScroll;
        break;
    }

    this.element.scrollTo({ left: physicalScroll, behavior });
  }

  // ============================================================================
  // CORE LOGIC: All operations in logical space
  // ============================================================================

  private observeResize() {
    if (typeof ResizeObserver === 'undefined') return;
    
    this.resizeObserver = new ResizeObserver(() => {
      this.cacheSnapPoints();
    });
    
    this.resizeObserver.observe(this.element);
  }

  private cacheSnapPoints() {
    const items = this.element.querySelectorAll('.motion-rail-item') as NodeListOf<HTMLElement>;
    const maxScroll = this.element.scrollWidth - this.element.clientWidth;
    
    this.snapPoints = Array.from(items).map(item => {
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

  private init() {
    this.setLogicalScroll(0);
    this.currentIndex = 0;
    this.element.style.cursor = 'grab';
  }

  private attachPointerEvents() {
    this.element.addEventListener('pointerdown', this.handlePointerDown);
    this.element.addEventListener('pointermove', this.handlePointerMove);
    this.element.addEventListener('pointerup', this.handlePointerUp);
    this.element.addEventListener('pointerleave', this.handlePointerUp);
  }

  private handlePointerDown = (e: PointerEvent) => {
    if (this.pointerId !== null) return;
    
    this.pointerId = e.pointerId;
    this.element.setPointerCapture(e.pointerId);
    this.isDragging = true;
    this.startX = e.clientX;
    this.startLogicalScroll = this.getLogicalScroll();
    this.lastPointerX = e.clientX;
    this.lastPointerTime = e.timeStamp;
    this.velocity = 0;
    this.element.style.cursor = 'grabbing';
    this.element.style.userSelect = 'none';
    this.element.style.scrollSnapType = 'none';
    this.pause();
    if (this.cancelScroll) {
      this.cancelScroll();
    }
    if (this.autoPlayTimeoutId) clearTimeout(this.autoPlayTimeoutId);
  }

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
  }

  private handlePointerUp = (e: PointerEvent) => {
    if (!this.isDragging || e.pointerId !== this.pointerId) return;
    
    this.element.releasePointerCapture(e.pointerId);
    this.pointerId = null;
    this.isDragging = false;
    this.element.style.cursor = 'grab';
    this.element.style.userSelect = '';
    
    const velocityMagnitude = Math.abs(this.velocity);
    const baseTime = 100;
    const maxTime = 200;
    const momentumTime = Math.min(baseTime + Math.sqrt(velocityMagnitude) * 50, maxTime);
    const momentum = -this.velocity * momentumTime;
    
    const currentLogicalScroll = this.getLogicalScroll();
    const targetLogicalScroll = currentLogicalScroll + momentum;
    
    if (this.cancelScroll) {
      this.cancelScroll();
    }

    const snapPoint = this.findNearestSnapPoint(targetLogicalScroll);
    this.currentIndex = this.snapPoints.indexOf(snapPoint);
    
    const onScrollEnd = () => {
      this.element.style.scrollSnapType = 'x mandatory';
      this.cancelScroll = null;
      if (this.autoplay) {
        this.autoPlayTimeoutId = window.setTimeout(() => {
          this.play();
          this.autoPlayTimeoutId = null;
        }, this.resumeDelay);
      }
    };

    // Create a wrapper that animates in logical space
    this.cancelScroll = this.animateLogicalScroll(snapPoint, momentumTime, onScrollEnd);
    this.velocity = 0;
  }

  private animateLogicalScroll(targetLogical: number, duration: number, onComplete: () => void): () => void {
    const startLogical = this.getLogicalScroll();
    const startTime = performance.now();
    let cancelled = false;

    const animate = (currentTime: number) => {
      if (cancelled) return;

      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const currentLogical = startLogical + (targetLogical - startLogical) * eased;

      this.setLogicalScroll(currentLogical);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        onComplete();
      }
    };

    requestAnimationFrame(animate);
    return () => { cancelled = true; };
  }

  // private isAtStart(): boolean {
  //   return this.getLogicalScroll() <= 1;
  // }

  // private isAtEnd(): boolean {
  //   const logicalScroll = this.getLogicalScroll();
  //   const maxScroll = this.element.scrollWidth - this.element.clientWidth;
  //   return logicalScroll >= maxScroll - 1;
  // }

  private scrollByPage(direction: 1 | -1) {
    const nextIndex = this.currentIndex + direction;
    
    // Check if we need to wrap around
    if (nextIndex >= this.snapPoints.length) {
      this.currentIndex = 0;
      this.scrollToLogical(this.snapPoints[0], 'smooth');
    } else if (nextIndex < 0) {
      this.currentIndex = this.snapPoints.length - 1;
      this.scrollToLogical(this.snapPoints[this.currentIndex], 'smooth');
    } else {
      this.currentIndex = nextIndex;
      this.scrollToLogical(this.snapPoints[nextIndex], 'smooth');
    }
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
      this.scrollToLogical(this.snapPoints[index], 'smooth');
      this.currentIndex = index;
    }
  }

  getCurrentIndex() {
    return this.currentIndex;
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

    this.element.removeEventListener('pointerdown', this.handlePointerDown);
    this.element.removeEventListener('pointermove', this.handlePointerMove);
    this.element.removeEventListener('pointerup', this.handlePointerUp);
    this.element.removeEventListener('pointerleave', this.handlePointerUp);
  }
}