import { createElemDOM } from './../../../utils/utils';

export class CartView {
  private static drawCard(data: CartProduct) {
    const card = createElemDOM('div', 'card');
    const title = createElemDOM('h3', '', data.productData.title);
    const img = createElemDOM('img', 'card__img');
    const price = createElemDOM('p', '', data.productData.price.toString());
    const button = createElemDOM('button', 'button', 'Add to cart');

    if (img instanceof HTMLImageElement) {
      img.alt = data.productData.title;
      img.src = data.productData.images[0];
    }

    card.append(title, img, price, button);
    // TODO add event listener Cart.addTocart()

    return card;
  }
  public static draw(data: CartProduct[]): void {
    const fragment = document.createDocumentFragment();
    const container = document.querySelector('.cart');
    if (!container) throw new Error("Can't find element with class 'products'");

    if (!data.length) {
      fragment.append(createElemDOM('p', '', 'Cart is empty'));
    } else {
      data.forEach((product) => fragment.append(CartView.drawCard(product)));
    }

    container.textContent = '';
    container.append(fragment);
  }
}
