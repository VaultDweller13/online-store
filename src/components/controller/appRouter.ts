import Router from './router';

export class AppRouter extends Router {
  root: string;
  path: string;

  constructor() {
    super();
    this.root = this.url.origin;
    this.path = this.url.pathname;
  }

  routeHome() {
    window.history.pushState({}, '', this.root);
  }

  routeToCart() {
    const url = `${this.root}/cart`;
    window.history.pushState({}, '', url);
  }

  routeToProduct(id: string) {
    const url = `${this.root}/product/${id}`;
    window.history.pushState({}, '', url);
  }

  getPath(): string {
    return window.location.pathname;
  }
}
