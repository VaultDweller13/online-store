import { DialogView } from './../dialogView';
import { Validate } from './../../cart/validation';
import { Cart } from './../../cart/cart';
import { createElemDOM } from './../../../utils/utils';
import '../../../assets/styles/pages/order.scss';

export class OrderView {
  private static fiedset(
    placeholder: string,
    id: string,
    maxL?: number
  ): HTMLElement {
    const field = createElemDOM('div', 'form__field');
    const input = createElemDOM('input', 'input form__input');
    input.id = id;
    if (!(input instanceof HTMLInputElement))
      throw new Error(`Can't create input`);
    if (maxL) input.maxLength = maxL;
    input.placeholder = placeholder;
    const err = createElemDOM('p', 'input__error', '');
    field.append(input, err);
    return field;
  }

  static draw(cart: Cart): HTMLElement {
    const form = createElemDOM('form', 'order__form');
    const inpName = OrderView.fiedset('Name Surname', 'name');
    const tel = OrderView.fiedset('+X XXX XXX XX XX', 'tel', 10);
    const address = OrderView.fiedset('Delivery address', 'address');
    const mail = OrderView.fiedset('email', 'email');
    const cardNumber = OrderView.fiedset('number of card', 'card', 16);
    const cardMonth = OrderView.fiedset('MM/YY', 'mmyy', 5);
    const cardCVV = OrderView.fiedset('CVV', 'cvv', 3);
    const submit = createElemDOM('button', 'button button__buy', 'Buy');

    const payVisa = createElemDOM('div', 'order__pay_visa order_hide');
    const payMk = createElemDOM('div', 'order__pay_mk order_hide');
    const payMir = createElemDOM('div', 'order__pay_mir order_hide');

    form.append(
      inpName,
      tel,
      address,
      mail,
      payVisa,
      payMk,
      payMir,
      cardNumber,
      cardMonth,
      cardCVV,
      submit
    );
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      if (Validate.validateAll(form)) {
        DialogView.close();
        DialogView.draw(
          createElemDOM('p', '', 'The order has been successfully placed')
        );
        setTimeout(() => {
          cart.clear();
          document.location.href = '/';
        }, 3000);
      }
    });
    form.addEventListener('keyup', (e) => {
      const input = e.target;
      if (!(input instanceof HTMLInputElement)) return;
      Validate.checkInput(input);
    });
    cardNumber.addEventListener('keyup', (e: Event) => {
      if (!(e.target instanceof HTMLInputElement)) return;
      const firstLetter = e.target.value;
      if (!firstLetter) return;
      switch (firstLetter) {
        case '4':
          if (payVisa.classList.contains('order_hide'))
            payVisa.classList.remove('order_hide');
          if (!payMk.classList.contains('order_hide'))
            payVisa.classList.add('order_hide');
          if (!payMir.classList.contains('order_hide'))
            payVisa.classList.add('order_hide');
          break;
        case '5':
          if (payMk.classList.contains('order_hide'))
            payMk.classList.remove('order_hide');
          if (!payVisa.classList.contains('order_hide'))
            payVisa.classList.add('order_hide');
          if (!payVisa.classList.contains('order_hide'))
            payVisa.classList.add('order_hide');
          break;
        case '2':
          if (payMir.classList.contains('order_hide'))
            payMir.classList.remove('order_hide');
          if (!payMk.classList.contains('order_hide'))
            payMk.classList.add('order_hide');
          if (!payVisa.classList.contains('order_hide'))
            payVisa.classList.add('order_hide');
          break;
      }
    });
    return form;
  }
}
