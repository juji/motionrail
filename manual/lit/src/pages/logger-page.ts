import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import 'motionrail/lit';
import { Logger } from 'motionrail/extensions/logger';
import 'motionrail/style.css';
import '../components/nav-bar.ts';
import { getGradient } from '../utils/gradients.ts';

@customElement('logger-page')
export class LoggerPage extends LitElement {
  render() {
    return html`
      <div class="page">
        <div class="container">
          <nav-bar current="logger"></nav-bar>
          <h1>Logger Extension Test Page</h1>
          <p class="subtitle">Test suite for the Logger extension (console logging)</p>
          <p class="note">Open the browser console to see logs</p>

          <section>
            <h2>Logger Extension (Check Console)</h2>
            <motionrail-element
              .options=${{
                breakpoints: [
                  { columns: 1, gap: '16px' },
                  { width: 768, columns: 2, gap: '16px' },
                  { width: 1024, columns: 3, gap: '20px' },
                ],
                extensions: [Logger()],
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
      margin-bottom: 10px;
      color: #999;
      font-size: 14px;
    }

    .note {
      margin-bottom: 30px;
      color: #667eea;
      font-size: 14px;
      font-style: italic;
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
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'logger-page': LoggerPage;
  }
}
