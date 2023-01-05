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
    const products: HTMLDivElement = <HTMLDivElement>(
      document.querySelector('.products')
    );

    products.addEventListener('click', (e: Event) =>
      this.controller.addToCart(e, 'button')
    );
  }
}
