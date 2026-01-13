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

  constructor(
    element: HTMLElement,
    options: MotioRailOptions
  ) {
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

    if(this.autoplay) this.play()
  }

  private init() {
    // Initialization logic here
    if(this.rtl){
      this.currentIndex = -1;
      this.element.scrollTo({ left: this.element.scrollWidth, behavior: 'instant' });
    }else{
      this.currentIndex = 0;
      this.element.scrollTo({ left: 0, behavior: 'instant' });
    }
  }

  play(){
    this.autoPlayIntervalId = window.setInterval(() => {
      if(this.rtl){
        if(this.element.scrollLeft <= 0){
          this.currentIndex = -1;
          this.element.scrollTo({ left: this.element.scrollWidth, behavior: 'smooth' });
        }else{
          this.currentIndex--;
          this.element.scrollBy({ left: -this.element.clientWidth, behavior: 'smooth' });
        }
      }else{
        if(this.element.scrollLeft + this.element.clientWidth >= this.element.scrollWidth){
          this.currentIndex = 0;
          this.element.scrollTo({ left: 0, behavior: 'smooth' });
        }else{
          this.currentIndex++;
          this.element.scrollBy({ left: this.element.clientWidth,  behavior: 'smooth' });
        }
      }
    }, this.delay);
  }

  next(){
    this.pause();
    if(this.rtl){
      if(this.element.scrollLeft <= 0){
        this.currentIndex = -1;
        this.element.scrollTo({ left: this.element.scrollWidth, behavior: 'smooth' });
      }else{
        this.currentIndex--;
        this.element.scrollBy({ left: -this.element.clientWidth, behavior: 'smooth' });
      }
    }else{
      if(this.element.scrollLeft + this.element.clientWidth >= this.element.scrollWidth){
        this.currentIndex = 0;
        this.element.scrollTo({ left: 0, behavior: 'smooth' });
      }else{
        this.currentIndex++;
        this.element.scrollBy({ left: this.element.clientWidth,  behavior: 'smooth' });
      }
    }
  }

  prev(){
    this.pause();
    if(this.rtl){
      if(this.element.scrollLeft + this.element.clientWidth >= this.element.scrollWidth){
        this.currentIndex = 0;
        this.element.scrollTo({ left: 0, behavior: 'smooth' });
      }else{
        this.currentIndex++;
        this.element.scrollBy({ left: this.element.clientWidth, behavior: 'smooth' });
      }
    }else{
      if(this.element.scrollLeft <= 0){
        this.currentIndex = -1;
        this.element.scrollTo({ left: this.element.scrollWidth, behavior: 'smooth' });
      }else{
        this.currentIndex--;
        this.element.scrollBy({ left: -this.element.clientWidth, behavior: 'smooth' });
      }
    }
  }

  pause(){

    if(!this.autoplay) return;

    if(this.autoPlayIntervalId){
      clearInterval(this.autoPlayIntervalId);
      this.autoPlayIntervalId = null;
    }

    if(this.autoPlayTimeoutId){
      clearTimeout(this.autoPlayTimeoutId);
      this.autoPlayTimeoutId = null;
    }
    
    this.autoPlayTimeoutId = window.setTimeout(() => {
      this.play();
      this.autoPlayTimeoutId = null;
    }, this.resume);

  }

  scrollToIndex(index: number){
    this.pause();
    const item = this.element.querySelectorAll('.motion-rail-item')[index] as HTMLElement;
    if(item){
      const offsetLeft = item.offsetLeft;
      this.element.scrollTo({ left: offsetLeft, behavior: 'smooth' });
      this.currentIndex = index;
    }
  }

  destroy() {
    if(this.autoPlayIntervalId){
      clearInterval(this.autoPlayIntervalId);
      this.autoPlayIntervalId = null;
    }

    if(this.autoPlayTimeoutId){
      clearTimeout(this.autoPlayTimeoutId);
      this.autoPlayTimeoutId = null;
    }
  }

}