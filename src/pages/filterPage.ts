import { createElemDOM } from '../utils/utils';
import { Loader } from './../components/controller/loader';
import { ProductsView } from './../components/view/product/productsView';
import productsData from '../mock/products.json';
import '../assets/styles/pages/filterPage.scss';

export class FilterPage {
  private drawProducts(data: ProductData[]): void {
    const values: ProductData[] = data ? data : [];
    ProductsView.draw(values);
  }
  draw(): void {
    const loader = new Loader(productsData);
    const products = loader.getProducts();
    const body: HTMLElement = document.querySelector('body') as HTMLElement;
    const fragment: DocumentFragment = document.createDocumentFragment();
    fragment.append(createElemDOM('section', 'products'));
    (<HTMLDivElement>body).innerHTML = '';
    body.appendChild(fragment);
    this.drawProducts(products);
  }
}
