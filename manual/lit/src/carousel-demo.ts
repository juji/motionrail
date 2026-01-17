import { LitElement, css, html } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import { MotionRail } from 'motionrail';
import 'motionrail/style.css';

@customElement('carousel-demo')
export class CarouselDemo extends LitElement {
  private carousel?: MotionRail;

  @query('#carousel')
  carouselElement!: HTMLDivElement;

  firstUpdated() {
    this.carousel = new MotionRail(this.carouselElement, {
      breakpoints: [
        { columns: 1, gap: '16px' },
        { width: 768, columns: 2, gap: '16px' },
        { width: 1024, columns: 3, gap: '20px' },
      ],
      autoplay: false,
      delay: 3000,
      onChange(params) {
        console.log('Carousel changed:', params);
      },
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.carousel?.destroy();
  }

  render() {
    return html`
      <div class="container">
        <h2>Basic Carousel</h2>
        <div id="carousel" class="carousel">
          ${Array.from({ length: 10 }, (_, i) => i + 1).map(
            (num) => html`
              <div class="slide">
                <div class="slide-content">Slide ${num}</div>
              </div>
            `,
          )}
        </div>
      </div>
    `;
  }

  static styles = css`
    :host {
      display: block;
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }

    .container {
      margin-bottom: 3rem;
    }

    h2 {
      margin-bottom: 1rem;
      color: #333;
    }

    .carousel {
      position: relative;
      overflow: hidden;
    }

    .slide {
      height: 200px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .slide-content {
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 1.5rem;
      font-weight: bold;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'carousel-demo': CarouselDemo;
  }
}
