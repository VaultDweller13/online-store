import { createElemDOM } from './../../../utils/utils';

export class CartView {
  private static drawCard(data: CartProduct, index: number) {
    const card = createElemDOM('div', 'card');

    const number = createElemDOM('p', 'card__number', index.toString());

    const img = createElemDOM('img', 'card__img');
    const price = createElemDOM(
      'p',
      'card__priceText',
      `Price: <span class="card__price">$${(
        data.productData.price * data.count
      ).toString()}</span>`
    );
    const wrapp = createElemDOM('div', 'card__wrapper_desc');

    const title = createElemDOM('h3', 'card__title', data.productData.title);
    const categ = createElemDOM('p', 'card__categ', data.productData.category);
    const brand = createElemDOM('p', 'card__categ', data.productData.brand);
    const description = createElemDOM(
      'p',
      'card__description',
      data.productData.description
    );
    const buttonView = createElemDOM(
      'button',
      'button button_details',
      'Details'
    );
    const costWrapp = createElemDOM('div', 'card__wrapper');
    const cartWrapp = createElemDOM('div', 'card__cart');

    const count = createElemDOM('p', 'card__count', data.count.toString());
    const buttonInc = createElemDOM('button', 'button button_inc', '+');
    const buttonDec = createElemDOM('button', 'button button_dec', '-');

    card.setAttribute('data-product-id', data.productData.id.toString());
    cartWrapp.append(buttonDec, count, buttonInc);
    if (img instanceof HTMLImageElement) {
      img.alt = data.productData.title;
      img.src = data.productData.thumbnail;
    }
    const stock = createElemDOM(
      'p',
      '',
      `Stock: ${data.productData.stock.toString()}`
    );

    wrapp.append(title, categ, description, brand, buttonView);
    costWrapp.append(price, cartWrapp, stock);
    card.append(number, img, wrapp, costWrapp);

    return card;
  }
  public static draw(data: CartProduct[], prev?: number): void {
    const fragment = document.createDocumentFragment();
    const container = document.querySelector('.cart');
    if (!container) throw new Error("Can't find element with class 'products'");

    if (!data.length) {
      fragment.append(createElemDOM('p', '', 'Cart is empty'));
    } else {
      data.forEach((product, index) => {
        console.log(prev);
        fragment.append(
          CartView.drawCard(product, (prev ? prev : 0) + index + 1)
        );
      });
    }

    container.textContent = '';
    container.append(fragment);
  }
}
