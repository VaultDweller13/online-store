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
    window.history.pushState({}, '', this.path);
  }

  routeToCart() {
    const url = `${this.root}${this.path}cart`;
    window.history.pushState({}, '', url);
  }

  routeToProduct(id: string) {
    const url = `${this.root}${this.path}product/${id}`;
    window.history.pushState({}, '', url);
  }
}
