import { createElemDOM } from './../utils/utils';
export class NotFoundPage {
  draw() {
    const main = document.querySelector('.main');
    if (!main) throw new Error("Can't find element with class 'main'");
    main.innerHTML = '';

    const container = createElemDOM('div', 'not-found');
    container.append(createElemDOM('p', 'not-found_code', '404'), createElemDOM('p', 'not-found_status', 'information not found'));

    main.append(container);
  }
}
