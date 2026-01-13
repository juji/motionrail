import type { MotionRailBreakpoint, MotioRailOptions } from "./types";
import { setBreakPoints, animateScroll } from "./utils";

export class MotionRail {
  private rtl: boolean = false
  private autoplay: boolean = false
  private breakpoints: MotionRailBreakpoint[] = [];
  private element: HTMLElement;
  private delay: number = 3000;
  private resume: number = 4000;
  private autoPlayIntervalId: number | null = null;
  private autoPlayTimeoutId: number | null = null;
  private currentIndex: number = 0;
  private isDragging: boolean = false;
  private startX: number = 0;
  private scrollLeft: number = 0;
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
    this.resume = options.resume || 4000;

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

  private observeResize() {
    if (typeof ResizeObserver === 'undefined') return;
    
    this.resizeObserver = new ResizeObserver(() => {
      this.cacheSnapPoints();
    });
    
    this.resizeObserver.observe(this.element);
  }

  private cacheSnapPoints() {
    const items = this.element.querySelectorAll('.motion-rail-item') as NodeListOf<HTMLElement>;
    this.snapPoints = Array.from(items).map(item => item.offsetLeft);
  }

  private findNearestSnapPoint(scrollPosition: number): number {
    let nearestPoint = 0;
    let minDistance = Infinity;
    
    for (const point of this.snapPoints) {
      const distance = Math.abs(point - scrollPosition);
      if (distance < minDistance) {
        minDistance = distance;
        nearestPoint = point;
      }
    }
    
    return nearestPoint;
  }

  private init() {
    // In RTL, scrollLeft = 0 is the visual start (right side)
    const targetScroll = this.rtl ? 0 : 0;
    this.currentIndex = 0;
    this.element.scrollTo({ left: targetScroll, behavior: 'instant' });
    this.element.style.cursor = 'grab';
  }

  private attachPointerEvents() {
    this.element.addEventListener('pointerdown', this.handlePointerDown);
    this.element.addEventListener('pointermove', this.handlePointerMove);
    this.element.addEventListener('pointerup', this.handlePointerUp);
    this.element.addEventListener('pointerleave', this.handlePointerUp);
  }

  private handlePointerDown = (e: PointerEvent) => {
    if (this.pointerId !== null) return; // Already dragging
    
    this.pointerId = e.pointerId;
    this.element.setPointerCapture(e.pointerId);
    this.isDragging = true;
    this.startX = e.clientX;
    this.scrollLeft = this.element.scrollLeft;
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
    if(this.autoPlayTimeoutId) clearTimeout(this.autoPlayTimeoutId);
  }

  private handlePointerMove = (e: PointerEvent) => {
    if (!this.isDragging || e.pointerId !== this.pointerId) return;
    e.preventDefault();
    const x = e.clientX;
    const walk = x - this.startX;
    this.element.scrollLeft = this.scrollLeft - (this.rtl ? -walk : walk);
    
    // Calculate velocity (pixels per millisecond)
    const deltaTime = e.timeStamp - this.lastPointerTime;
    if (deltaTime > 0) {
      const deltaX = e.clientX - this.lastPointerX;
      this.velocity = (this.rtl ? -deltaX : deltaX) / deltaTime;
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
    
    // Calculate momentum using velocity (pixels/ms * time = distance)
    // Non-linear time scaling - diminishing returns at high velocities
    const velocityMagnitude = Math.abs(this.velocity);
    const baseTime = 100;
    const maxTime = 200;
    const momentumTime = Math.min(baseTime + Math.sqrt(velocityMagnitude) * 50, maxTime);
    const momentum = -this.velocity * momentumTime;
    let targetScroll = this.element.scrollLeft + momentum;
    
    // Clamp targetScroll to valid scroll bounds
    const firstSnapPoint = this.snapPoints[0] || 0;
    const lastSnapPoint = this.snapPoints[this.snapPoints.length - 1] || 0;
    targetScroll = Math.max(firstSnapPoint, Math.min(targetScroll, lastSnapPoint));
    
    // Cancel any ongoing scroll animation
    if (this.cancelScroll) {
      this.cancelScroll();
    }

    // Animate momentum then snap to nearest point in one flow
    const snapPoint = this.findNearestSnapPoint(targetScroll);
    this.currentIndex = this.snapPoints.indexOf(snapPoint);
    
    const onScrollEnd = () => {
      this.element.style.scrollSnapType = 'x mandatory';
      this.cancelScroll = null;
      if(this.autoplay) {
        this.autoPlayTimeoutId = window.setTimeout(() => {
          this.play();
          this.autoPlayTimeoutId = null;
        }, this.resume);
      }
    };

    this.cancelScroll = animateScroll(this.element, snapPoint, momentumTime, onScrollEnd);
    this.velocity = 0;
  }

  private isAtStart() {
    if (this.rtl) {
      return Math.abs(this.element.scrollLeft) < 1;
    }
    return this.element.scrollLeft <= 1;
  }

  private isAtEnd() {
    if (this.rtl) {
      const maxScroll = -(this.element.scrollWidth - this.element.clientWidth);
      return this.element.scrollLeft <= maxScroll + 1;
    }
    return this.element.scrollLeft + this.element.clientWidth >= this.element.scrollWidth - 1;
  }

  private scrollByPage(direction: 1 | -1) {
    const atBoundary = direction > 0 ? this.isAtEnd() : this.isAtStart();
    
    if (atBoundary) {
      // Wrap around
      if (this.rtl) {
        const targetScroll = direction > 0 ? 0 : -(this.element.scrollWidth - this.element.clientWidth);
        this.currentIndex = direction > 0 ? 0 : this.snapPoints.length - 1;
        this.element.scrollTo({ left: targetScroll, behavior: 'smooth' });
      } else {
        const targetScroll = direction > 0 ? 0 : this.element.scrollWidth;
        this.currentIndex = direction > 0 ? 0 : this.snapPoints.length - 1;
        this.element.scrollTo({ left: targetScroll, behavior: 'smooth' });
      }
    } else {
      this.currentIndex += direction;
      // In RTL with dir="rtl", scrollBy positive goes right (backwards)
      // So invert the direction for RTL to scroll left (forward)
      const scrollAmount = this.rtl ? -direction : direction;
      this.element.scrollBy({ left: scrollAmount * this.element.clientWidth, behavior: 'smooth' });
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
    
    if(this.isDragging) return;
    this.autoPlayTimeoutId = window.setTimeout(() => {
      this.play();
      this.autoPlayTimeoutId = null;
    }, this.resume);
  }

  scrollToIndex(index: number) {
    this.pause();
    const item = this.element.querySelectorAll('.motion-rail-item')[index] as HTMLElement;
    if (item) {
      this.element.scrollTo({ left: item.offsetLeft, behavior: 'smooth' });
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