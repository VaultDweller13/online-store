import { createElemDOM } from '../utils/utils';
import { ProductsView } from './../components/view/product/productsView';
import '../assets/styles/pages/filterPage.scss';

export class FilterPage {
  draw(data: ProductData[]): void {
    const main = document.querySelector('.main');
    if (!main) throw new Error("Can't find element with class 'main'");

    const fragment = document.createDocumentFragment();
    fragment.append(createElemDOM('section', 'products'));
    main.innerHTML = '';
    main.appendChild(fragment);
    ProductsView.draw(data);
  }
}
