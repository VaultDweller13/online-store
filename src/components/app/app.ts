// import { CartController } from './../controller/cartController';
import { Controller } from '../controller/controller';

export default class App {
  private controller: Controller;

  constructor() {
    this.controller = new Controller();
  }

  start() {
    this.controller.drawFilterPage();
    const btnCart: HTMLDivElement = <HTMLDivElement>(
      document.querySelector('.to-cart')
    );
    btnCart.addEventListener('click', () => this.controller.drawCartPage());
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
        this.controller.drawProductPage(productId);
      }
    });
  }
}
