// import { CartController } from './../controller/cartController';
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
    this.controller.drawFilterPage();
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
    });

    const logo = document.querySelector('.header_heading');
    logo?.addEventListener('click', () => {
      this.router.routeHome();
      this.controller.drawFilterPage();
    });
  }
}
