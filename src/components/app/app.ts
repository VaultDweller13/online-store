import { Controller } from '../controller/controller';

export default class App {
  private controller: Controller;

  constructor() {
    this.controller = new Controller();
  }

  start() {
    this.controller.drawFilterPage();
  }
}
