import { createElemDOM } from '../../../utils/utils';
import './../../../assets/styles/components/products.scss';

export class ProductsView {
  private static drawCard(data: ProductData): HTMLElement {
    const card = createElemDOM('div', 'card');
    card.appendChild(createElemDOM('h3', '', data.title));
    const img = createElemDOM('img', 'card__img') as HTMLImageElement;
    card.appendChild(img);
    img.alt = data.title;
    img.src = data.images[0];
    card.appendChild(createElemDOM('p', '', data.price.toString()));

    const button = createElemDOM('button', 'button', 'Add to cart');
    card.appendChild(button);
    // TODO add event listener Cart.addTocart()
    return card;
  }
  public static draw(data: ProductData[]): void {
    const fragment: DocumentFragment = document.createDocumentFragment();

    if (data.length === 0) {
      fragment.append(createElemDOM('p', '', 'No products to display'));
    } else {
      data.map((product) => fragment.append(this.drawCard(product)));
    }
    (<HTMLDivElement>document.querySelector('.products')).innerHTML = '';
    (<HTMLDivElement>document.querySelector('.products')).appendChild(fragment);
  }
}
