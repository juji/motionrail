import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('nav-bar')
export class NavBar extends LitElement {
  @property({ type: String })
  current: 'main' | 'arrows' | 'dots' | 'logger' | 'thumbnails' = 'main';

  private links = [
    { href: '/', label: 'Main Tests', key: 'main' },
    { href: '/arrows', label: 'Arrows', key: 'arrows' },
    { href: '/dots', label: 'Dots', key: 'dots' },
    { href: '/logger', label: 'Logger', key: 'logger' },
    { href: '/thumbnails', label: 'Thumbnails', key: 'thumbnails' },
  ];

  render() {
    return html`
      <nav>
        <div class="nav-container">
          ${this.links.map(
            (link) => html`
              <a
                href=${link.href}
                class=${this.current === link.key ? 'active' : ''}
              >
                ${link.label}
              </a>
            `,
          )}
        </div>
      </nav>
    `;
  }

  static styles = css`
    nav {
      position: sticky;
      top: 0;
      z-index: 1000;
      background: #1a1a1a;
      padding: 15px 0;
      margin-bottom: 30px;
      border-bottom: 1px solid #333;
    }

    .nav-container {
      display: flex;
      gap: 20px;
      justify-content: center;
    }

    a {
      color: #999;
      text-decoration: none;
      font-weight: 500;
      font-size: 14px;
      transition: color 0.2s;
    }

    a.active {
      color: white;
      text-decoration: underline;
    }

    a:hover {
      color: white;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'nav-bar': NavBar;
  }
}
