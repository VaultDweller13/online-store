import { Cart } from './../../cart/cart';
import { createElemDOM } from '../../../utils/utils';
import './../../../assets/styles/components/products.scss';

export class ProductsView {
  private static drawCard(data: ProductData, countInCart: number): HTMLElement {
    const card = createElemDOM('div', 'card');
    const title = createElemDOM('h3', 'card__title', data.title);
    const img = createElemDOM('img', 'card__img');

    const price = createElemDOM('p', 'card__price', `Price: ${data.price}`);
    const stock = createElemDOM('p', 'card__stock', `Stock: ${data.stock}`);

    const button = createElemDOM(
      'button',
      `button button_add ${countInCart ? 'hide' : ''}`,
      'Add to cart'
    );
    card.dataset.productId = data.id.toString();
    if (img instanceof HTMLImageElement) {
      img.alt = data.title;
      img.src = data.images[0];
    }

    const inCartWrapper = createElemDOM(
      'div',
      `card__cart ${!countInCart ? 'hide' : ''}`
    );

    const count = createElemDOM('p', 'card__count', countInCart.toString());
    const buttonInc = createElemDOM('button', 'button button_inc', '+');
    const buttonDec = createElemDOM('button', 'button button_dec', '-');
    const buttonView = createElemDOM(
      'button',
      'button button_details',
      'Details'
    );

    inCartWrapper.append(buttonDec, count, buttonInc);
    card.append(img, title, price, stock, button, inCartWrapper, buttonView);
    return card;
  }

  public static draw(data: ProductData[], cart: Cart): void {
    const fragment = document.createDocumentFragment();
    const container = document.querySelector('.products');
    if (!container) throw new Error("Can't find element with class 'products'");

    if (!data.length) {
      fragment.append(createElemDOM('p', '', 'No products to display'));
    } else {
      data.forEach((product) => {
        const countInCart = cart.getProductCount(product);
        fragment.append(ProductsView.drawCard(product, countInCart));
      });
    }

    container.textContent = '';
    container.append(fragment);
  }
}
