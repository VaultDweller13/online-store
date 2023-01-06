import { createElemDOM } from './../../../utils/utils';
import { Cart } from './../../cart/cart';
export class CartSum {
  public static drawPromos(cart: Cart): void {
    const fragment = document.createDocumentFragment();
    const container = document.querySelector('.cart__promos');
    if (!container)
      throw new Error("Can't find element with class 'cart__promos'");

    cart.appliedPromo.map((promo) => {
      const promoWrapper = createElemDOM('div', 'promo__wrapper');
      promoWrapper.append(
        createElemDOM('p', 'promo__text', `${promo.name}-${promo.discount}%`)
      );
      const btn = createElemDOM('p', 'button promo__btnDrop', 'Drop');
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

    form.append(createElemDOM('h3', '', 'total'));
    form.append(createElemDOM('p', '', 'Total count: '));
    form.append(createElemDOM('p', '', cart.getCountCart().toString()));
    form.append(createElemDOM('p', '', 'Total cost: '));
    form.append(createElemDOM('p', 'cart__sum', cart.getSumCart().toString()));
    const sumWithPromo = createElemDOM(
      'p',
      'cart__sumWithPromo',
      cart.getSumWithPromo().toString()
    );
    form.append(sumWithPromo);
    form.append(createElemDOM('div', 'cart__promos'));

    const input = createElemDOM('input', '');
    (<HTMLInputElement>input).placeholder = 'Enter promo code';
    form.append(input);
    const aplyPromoBtn = createElemDOM(
      'button',
      'button promo__btnApply',
      'Apply'
    );
    const helper = createElemDOM('p', 'promo__helper', '');
    form.append(helper);

    // aplyPromoBtn.addEventListener('click', (e) => {
    //   e.preventDefault();
    //   if (input instanceof HTMLInputElement) {
    //     const promoVal = input.value;

    //     if (cart.applyPromo(promoVal)) {
    //       sumWithPromo.textContent = cart.getSumWithPromo().toString();

    //       input.value = '';
    //       helper.textContent = '';
    //     } else {
    //       helper.textContent = 'No such promo';
    //     }
    //   }
    // });

    form.append(aplyPromoBtn);
    const applyBtn = createElemDOM('button', 'button button__buy', 'Buy now');
    form.append(applyBtn);

    container.textContent = '';
    container.append(fragment);
    CartSum.drawPromos(cart);
  }
}
