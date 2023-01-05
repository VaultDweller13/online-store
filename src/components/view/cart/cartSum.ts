import { createElemDOM } from './../../../utils/utils';
import { Cart } from './../../cart/cart';
export class CartSum {
  public static draw(cart: Cart): void {
    const fragment = document.createDocumentFragment();
    const container = document.querySelector('.cart__total');
    if (!container) throw new Error("Can't find element with class 'products'");

    fragment.append(createElemDOM('h3', '', 'total'));
    fragment.append(createElemDOM('p', '', cart.getSumCart().toString()));
    fragment.append(createElemDOM('p', '', cart.getCountCart().toString()));

    container.textContent = '';
    container.append(fragment);
  }
}
