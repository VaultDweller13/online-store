import { Controller } from '../controller/controller';

export default class App {
  private controller: Controller;

  constructor() {
    this.controller = new Controller();
  }

  start() {
    this.controller.drawFilterPage();
    const viewCart: HTMLDivElement = <HTMLDivElement>(
      document.querySelector('.to-cart')
    );
    viewCart.addEventListener('click', () => this.controller.drawCartPage());
  }
}
