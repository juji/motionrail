import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import 'motionrail/lit';
import 'motionrail/style.css';
import '../components/nav-bar.ts';
import { getGradient } from '../utils/gradients.ts';

@customElement('home-page')
export class HomePage extends LitElement {
  @state()
  private items = [1, 2, 3];

  private addItem() {
    this.items = [...this.items, this.items.length + 1];
  }

  private removeItem() {
    this.items = this.items.slice(0, -1);
  }

  render() {
    return html`
      <div class="page">
        <div class="container">
          <nav-bar current="main"></nav-bar>
          <h1>MotionRail Test Page</h1>
          <p class="subtitle">Comprehensive test suite for MotionRail Lit wrapper</p>

          <section>
            <h2>Basic Carousel (3 columns on desktop, 2 on tablet, 1 on mobile)</h2>
            <motionrail-element
              .options=${{
                breakpoints: [
                  { columns: 1, gap: '16px' },
                  { width: 768, columns: 2, gap: '16px' },
                  { width: 1024, columns: 3, gap: '20px' },
                ],
                onChange: (state: any) => console.log('Carousel changed:', state),
              }}
            >
              ${[1, 2, 3, 4, 5, 6, 7, 8].map(
                (i) => html`
                  <div class="slide" style="background: linear-gradient(135deg, ${getGradient(i)})">
                    ${i}
                  </div>
                `,
              )}
            </motionrail-element>
          </section>

          <section>
            <h2>Carousel with Autoplay</h2>
            <motionrail-element
              .options=${{
                breakpoints: [
                  { columns: 1, gap: '16px' },
                  { width: 768, columns: 2, gap: '16px' },
                  { width: 1024, columns: 3, gap: '20px' },
                ],
                autoplay: true,
                delay: 2500,
              }}
            >
              ${[1, 2, 3, 4, 5, 6, 7, 8].map(
                (i) => html`
                  <div class="slide" style="background: linear-gradient(135deg, ${getGradient(i)})">
                    ${i}
                  </div>
                `,
              )}
            </motionrail-element>
          </section>

          <section>
            <h2>Dynamic Content (Add/Remove Items)</h2>
            <motionrail-element
              .options=${{
                breakpoints: [
                  { columns: 1, gap: '16px' },
                  { width: 768, columns: 2, gap: '16px' },
                ],
              }}
            >
              ${this.items.map(
                (i) => html`
                  <div class="slide" style="background: linear-gradient(135deg, ${getGradient(i)})">
                    ${i}
                  </div>
                `,
              )}
            </motionrail-element>
            <div class="button-group">
              <button @click=${this.addItem}>Add Item</button>
              <button @click=${this.removeItem}>Remove Item</button>
            </div>
          </section>

          <section>
            <h2>Edge Case: Single Item</h2>
            <motionrail-element
              .options=${{
                breakpoints: [
                  { columns: 1, gap: '16px' },
                  { width: 768, columns: 2, gap: '16px' },
                ],
              }}
            >
              <div class="slide" style="background: linear-gradient(135deg, ${getGradient(1)})">
                1
              </div>
            </motionrail-element>
          </section>
        </div>
      </div>
    `;
  }

  static styles = css`
    .page {
      padding: 40px;
      background: #000;
      color: #eaeaea;
      min-height: 100vh;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
    }

    h1 {
      margin-bottom: 10px;
    }

    .subtitle {
      margin-bottom: 30px;
      color: #999;
      font-size: 14px;
    }

    section {
      margin-bottom: 60px;
    }

    h2 {
      margin-bottom: 15px;
      font-size: 18px;
    }

    .slide {
      height: 300px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 48px;
      font-weight: bold;
      color: white;
    }

    .button-group {
      margin-top: 15px;
      display: flex;
      gap: 10px;
    }

    button {
      padding: 10px 20px;
      border: none;
      border-radius: 6px;
      background: #667eea;
      color: white;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
    }

    button:hover {
      background: #5568d3;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'home-page': HomePage;
  }
}
