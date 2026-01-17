import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import './pages/home-page.ts';
import './pages/arrows-page.ts';
import './pages/dots-page.ts';
import './pages/logger-page.ts';
import './pages/thumbnails-page.ts';

@customElement('app-router')
export class AppRouter extends LitElement {
  @state()
  private currentPath = window.location.pathname;

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('popstate', this.handlePopState);
    window.addEventListener('click', this.handleLinkClick);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('popstate', this.handlePopState);
    window.removeEventListener('click', this.handleLinkClick);
  }

  private handlePopState = () => {
    this.currentPath = window.location.pathname;
  };

  private handleLinkClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const link = target.closest('a');
    
    if (link && link.href && link.origin === window.location.origin) {
      e.preventDefault();
      const path = new URL(link.href).pathname;
      window.history.pushState({}, '', path);
      this.currentPath = path;
    }
  };

  render() {
    switch (this.currentPath) {
      case '/arrows':
        return html`<arrows-page></arrows-page>`;
      case '/dots':
        return html`<dots-page></dots-page>`;
      case '/logger':
        return html`<logger-page></logger-page>`;
      case '/thumbnails':
        return html`<thumbnails-page></thumbnails-page>`;
      default:
        return html`<home-page></home-page>`;
    }
  }

  static styles = css`
    :host {
      display: block;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'app-router': AppRouter;
  }
}
