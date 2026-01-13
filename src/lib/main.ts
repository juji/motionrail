import type { MotionRailBreakpoint, MotioRailOptions } from "./types";
import { setBreakPoints } from "./utils";

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
    if (this.autoplay) this.play();
  }

  private init() {
    const targetScroll = this.rtl ? this.element.scrollWidth : 0;
    this.currentIndex = this.rtl ? -1 : 0;
    this.element.scrollTo({ left: targetScroll, behavior: 'instant' });
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

    if (this.autoPlayTimeoutId) {
      clearTimeout(this.autoPlayTimeoutId);
      this.autoPlayTimeoutId = null;
    }
  }
}