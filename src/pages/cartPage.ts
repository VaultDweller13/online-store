import { CartView } from './../components/view/cart/cartView';
import { createElemDOM } from './../utils/utils';
export class CartPage {
  data: CartProduct[];
  constructor(data: CartProduct[]) {
    this.data = data;
  }
  draw(): void {
    const main = document.querySelector('.main');
    if (!main) throw new Error("Can't find element with class 'main'");
    this.clear();
    const page = createElemDOM('div', 'cart-container');

    main.append(page);
    CartView.draw(this.data);
  }
  private clear() {
    const main = document.querySelector('.main');
    if (!main) throw new Error("Can't find element with class 'main'");
    main.innerHTML = '';
  }
}
