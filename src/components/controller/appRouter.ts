import Router from './router';

export class AppRouter extends Router {
  // routes: route[];
  root: string;
  path: string;

  constructor() {
    super();
    this.root = this.url.origin;
    this.path = this.url.pathname;

    // this.routes = {
    //   // '/online-store': '/online-store',
    //   cart: '/cart',
    //   product: '/product',
    //   404: '/404',
    // };
    // // this.setHomeAnchor();

    // this.routes = [
    //   {
    //     route: '/',
    //     data: '',
    //   },
    //   {
    //     route: '/cart',
    //     data: '',
    //   },
    //   {
    //     route: '/product',
    //     data: '',
    //   },
    // ];
  }

  routeHome() {
    // console.log(this.path);
    window.history.pushState({}, '', this.path);
    // this.route();
  }

  routeToCart() {
    const url = `${this.root}${this.path}cart`;
    console.log(this.path);
    // console.log(url);
    window.history.pushState({}, '', url);
    // this.route();
  }

  // route() {
  //   // const path = this.path;
  //   // const url = `${this.root}${path}`;
  //   // const main = document.querySelector('.main');
  //   // console.log(path);
  //   // const page = this.routes.find((page) => page.route === path);
  //   // console.log(page);
  //   // console.log(this.routes);
  //   // window.history.pushState({}, '', url);
  // }

  // private setHomeAnchor() {
  //   this.routes[this.path] = this.path;
  //   const logo = document.querySelector('.homepage-link') as HTMLAnchorElement;
  //   logo.href = this.routes[this.path];
  // }

  // route(event: Event) {
  //   event.preventDefault();
  //   if (!(event.target instanceof HTMLAnchorElement)) return;
  //   if (window.location.href === event.target.href) return;

  //   window.history.pushState({}, '', event.target.href);
  // }

  // handleLocation() {
  //   const path = window.location.pathname;
  //   const route = this.routes[path] || this.routes['404'];

  // }
}
