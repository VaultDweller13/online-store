import { createElemDOM } from '../../../utils/utils';
import './../../../assets/styles/components/products.scss';

export class ProductsView {
  private static drawCard(data: ProductData): HTMLElement {
    const card = createElemDOM('div', 'card');
    const title = createElemDOM('h3', '', data.title);
    const img = createElemDOM('img', 'card__img');
    const price = createElemDOM('p', '', `Price: ${data.price}`);
    const stock = createElemDOM('p', '', `Stock: ${data.stock}`);
    const button = createElemDOM('button', 'button', 'Add to cart');

    if (img instanceof HTMLImageElement) {
      img.alt = data.title;
      img.src = data.images[0];
    }

    card.append(title, img, price, stock, button);
    // TODO add event listener Cart.addTocart()

    return card;
  }

  public static draw(data: ProductData[]): void {
    const fragment = document.createDocumentFragment();
    const container = document.querySelector('.products');
    if (!container) throw new Error("Can't find element with class 'products'");

    if (!data.length) {
      fragment.append(createElemDOM('p', '', 'No products to display'));
    } else {
      data.forEach((product) =>
        fragment.append(ProductsView.drawCard(product))
      );
    }

    container.textContent = '';
    container.append(fragment);
  }
}
