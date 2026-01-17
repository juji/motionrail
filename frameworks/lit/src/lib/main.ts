import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import {
  MotionRail as MotionRailClass,
  type MotionRailOptions,
} from 'motionrail';

@customElement('motionrail-element')
export class MotionRail extends LitElement {
  @property({ type: Object }) options: MotionRailOptions = {};
  
  private motionRailInstance: MotionRailClass | null = null;
  private containerRef: HTMLDivElement | null = null;

  firstUpdated() {
    this.containerRef = this.shadowRoot?.querySelector('[data-motionrail]') as HTMLDivElement;
    
    if (this.containerRef) {
      this.motionRailInstance = new MotionRailClass(
        this.containerRef,
        this.options
      );
    }
  }

  updated(changedProperties: Map<string, any>) {
    if (changedProperties.has('options') && this.motionRailInstance) {
      this.motionRailInstance.destroy();
      if (this.containerRef) {
        this.motionRailInstance = new MotionRailClass(
          this.containerRef,
          this.options
        );
      }
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.motionRailInstance) {
      this.motionRailInstance.destroy();
      this.motionRailInstance = null;
    }
  }

  render() {
    return html`
      <div data-motionrail>
        <div data-motionrail-scrollable>
          <div data-motionrail-grid>
            <slot></slot>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'motionrail-element': MotionRail;
  }
}
