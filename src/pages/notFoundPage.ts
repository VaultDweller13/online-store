import { createElemDOM } from './../utils/utils';
export class NotFoundPage {
  draw() {
    const main = document.querySelector('.main');
    if (!main) throw new Error("Can't find element with class 'main'");
    main.innerHTML = '';

    main.append(createElemDOM('p', '', '404 the information not found'));
  }
}
