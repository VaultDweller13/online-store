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
    const submit = createElemDOM('button', 'button', 'Buy');
    form.append(
      inpName,

      tel,
      address,
      mail,
      cardNumber,
      cardMonth,

      cardCVV,
      submit
    );
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      setTimeout(() => {
        console.log('clear');
        cart.clear();
        document.location.href = '/';
      }, 3000);
    });
    form.addEventListener('keyup', (e) => Validate.checkInput(e));
    return form;
  }
}
