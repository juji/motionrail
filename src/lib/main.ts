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
    if (this.autoplay) this.play();
  }

  private init() {
    const targetScroll = this.rtl ? this.element.scrollWidth : 0;
    this.currentIndex = this.rtl ? -1 : 0;
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
    this.isDragging = true;
    this.startX = e.clientX;
    this.scrollLeft = this.element.scrollLeft;
    this.element.style.cursor = 'grabbing';
    this.element.style.scrollSnapType = 'none';
    this.pause();
    if(this.autoPlayTimeoutId) clearTimeout(this.autoPlayTimeoutId);
  }

  private handlePointerMove = (e: PointerEvent) => {
    if (!this.isDragging) return;
    e.preventDefault();
    const x = e.clientX;
    const walk = x - this.startX;
    this.element.scrollLeft = this.scrollLeft - walk;
  }

  private handlePointerUp = () => {
    if (!this.isDragging) return;
    this.isDragging = false;
    this.element.style.cursor = 'grab';
    
    // Get the first item to calculate actual item dimensions including gap
    const items = this.element.querySelectorAll('.motion-rail-item');
    if (items.length < 2) return;
    
    const firstItem = items[0] as HTMLElement;
    const secondItem = items[1] as HTMLElement;
    
    // Calculate the distance between items (includes width + gap)
    const itemDistance = secondItem.offsetLeft - firstItem.offsetLeft;
    
    // Find nearest snap point
    const currentScroll = this.element.scrollLeft;
    const nearestIndex = Math.round(currentScroll / itemDistance);
    const targetScroll = nearestIndex * itemDistance;
    
    // Cancel any ongoing scroll animation
    if (this.cancelScroll) {
      this.cancelScroll();
    }

    // Re-enable snap and resume autoplay callback
    const enableSnap = () => {
      this.element.style.scrollSnapType = 'x mandatory';
      this.cancelScroll = null;
      if(this.autoplay) {
        this.autoPlayTimeoutId = window.setTimeout(() => {
          this.play();
          this.autoPlayTimeoutId = null;
        }, this.resume);
      }
    };

    // Animate scroll to snap point
    this.cancelScroll = animateScroll(this.element, targetScroll, 300, enableSnap);
  }

  private isAtStart() {
    return this.element.scrollLeft <= 0;
  }

  private isAtEnd() {
    return this.element.scrollLeft + this.element.clientWidth >= this.element.scrollWidth;
  }

  private scrollByPage(direction: 1 | -1) {
    const atBoundary = direction > 0 ? this.isAtEnd() : this.isAtStart();
    
    if (atBoundary) {
      const targetScroll = direction > 0 ? 0 : this.element.scrollWidth;
      this.currentIndex = direction > 0 ? 0 : -1;
      this.element.scrollTo({ left: targetScroll, behavior: 'smooth' });
    } else {
      this.currentIndex += direction;
      this.element.scrollBy({ left: direction * this.element.clientWidth, behavior: 'smooth' });
    }
  }

  play() {
    this.autoPlayIntervalId = window.setInterval(() => {
      this.scrollByPage(this.rtl ? -1 : 1);
    }, this.delay);
  }

  next() {
    this.pause();
    this.scrollByPage(this.rtl ? -1 : 1);
  }

  prev() {
    this.pause();
    this.scrollByPage(this.rtl ? 1 : -1);
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

    this.element.removeEventListener('pointerdown', this.handlePointerDown);
    this.element.removeEventListener('pointermove', this.handlePointerMove);
    this.element.removeEventListener('pointerup', this.handlePointerUp);
    this.element.removeEventListener('pointerleave', this.handlePointerUp);
  }
}