import { createElemDOM } from './../../../utils/utils';
import { Cart } from './../../cart/cart';
export class CartSum {
  public static drawPromos(cart: Cart): void {
    const fragment = document.createDocumentFragment();
    const container = document.querySelector('.cart__promos');
    if (!container)
      throw new Error("Can't find element with class 'cart__promos'");
    if (cart.appliedPromo.length)
      fragment.append(createElemDOM('p', '', 'Applied promos:'));
    cart.appliedPromo.map((promo) => {
      const promoWrapper = createElemDOM('div', 'promos__wrapp_input');
      promoWrapper.append(
        createElemDOM('p', 'promo__text', `${promo.name}-${promo.discount}%`)
      );
      const btn = createElemDOM('button', 'button promo__btnDrop', 'Drop');
      btn.dataset.promo = promo.name;
      promoWrapper.append(btn);
      fragment.append(promoWrapper);
    });

    container.textContent = '';
    container.append(fragment);
  }

  public static draw(cart: Cart): void {
    const fragment = document.createDocumentFragment();
    const container = document.querySelector('.cart__total');
    if (!container) throw new Error("Can't find element with class 'products'");
    const form = createElemDOM('form', 'cart__form');
    fragment.append(form);

    form.append(createElemDOM('h2', 'h2', 'Total'));
    form.append(createElemDOM('p', '', 'Total count: '));
    form.append(
      createElemDOM('p', 'cart__count', cart.getCountCart().toString())
    );
    form.append(createElemDOM('p', '', 'Total cost: '));
    const sumCart = cart.getSumCart();
    const sumCartPromo = cart.getSumWithPromo();

    form.append(
      createElemDOM(
        'p',
        `cart__sum ${sumCart == sumCartPromo ? '' : 'cart__sum_old'}`,
        `$${sumCart.toString()}`
      )
    );
    const sumWithPromo = createElemDOM(
      'p',
      `cart__sumWithPromo ${sumCart == sumCartPromo ? 'hide' : ''}`,
      `$${sumCartPromo.toString()}`
    );
    form.append(sumWithPromo, createElemDOM('div', 'cart__promos'));

    const promosWrapp = createElemDOM('div', 'promos__wrapp_input');

    const input = createElemDOM('input', 'input');
    (<HTMLInputElement>input).placeholder = 'Enter promo code';

    const aplyPromoBtn = createElemDOM(
      'button',
      'button promo__btnApply',
      'Apply'
    );

    const helper = createElemDOM('p', 'promo__helper', '');
    const hint = createElemDOM(
      'p',
      'promo__helper',
      'Promo for test: RS, Disc'
    );

    const applyBtn = createElemDOM('button', 'button button__buy', 'Buy now');
    promosWrapp.append(input, aplyPromoBtn);
    form.append(promosWrapp, helper, hint, applyBtn);

    container.textContent = '';
    container.append(fragment);
    CartSum.drawPromos(cart);
  }
}
