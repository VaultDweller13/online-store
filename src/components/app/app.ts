import { Controller } from '../controller/controller';
import { AppRouter } from '../controller/appRouter';

export default class App {
  private controller: Controller;
  router: AppRouter;

  constructor() {
    this.controller = new Controller();
    this.router = new AppRouter();
  }

  start() {
    this.handleLocation();
    const btnCart: HTMLDivElement = <HTMLDivElement>(
      document.querySelector('.to-cart')
    );
    btnCart.addEventListener('click', () => {
      this.router.routeToCart();
      this.controller.drawCartPage();
    });
    const main: HTMLDivElement = <HTMLDivElement>(
      document.querySelector('.main')
    );
    main.addEventListener('click', (e) => {
      if (!e.target || !e.currentTarget) throw new Error('target is null');
      const target = <HTMLElement>e.target;
      const card = target.closest('.card');

      if (!(card instanceof HTMLElement)) return;

      if (target.classList.contains('button_details')) {
        const productId = card.dataset.productId;
        if (!productId)
          throw new Error('There is no data-set attribute in card');
        this.router.routeToProduct(productId);
        this.controller.drawProductPage(productId);
      }
      if (target.classList.contains('button__buy')) {
        // if (!this.product) throw new Error('no product data');

        // const countInCart = this.cart.getProductCount(this.product);
        // if (!countInCart) this.cart.addProduct(this.product);
        this.router.routeToCart();
        this.controller.drawCartPage();

        // DialogView.draw(OrderView.draw(this.controller.cart));
      }
    });

    const logo = document.querySelector('.header_heading');
    logo?.addEventListener('click', () => {
      this.router.routeHome();
      this.controller.drawFilterPage();
    });

    window.addEventListener('popstate', () => this.handleLocation());
  }

  handleLocation() {
    const path = this.router.getPath();

    if (path === '/' || path.includes('/?')) {
      this.controller.drawFilterPage();
    } else if (path === '/cart') {
      this.controller.drawCartPage();
    } else if (path.includes('/product')) {
      const id = path.split('/').reverse()[0];
      this.controller.drawProductPage(id);
    } else {
      this.controller.drawPageNotFound();
    }
  }
}
