import { PaginationView } from './../components/view/cart/paginationView';
import { Pagination } from '../components/cart/pagination';
import { CartSum } from './../components/view/cart/cartSum';
import { CartController } from './../components/controller/cartController';
import { CartView } from './../components/view/cart/cartView';
import { createElemDOM } from './../utils/utils';
import '../assets/styles/pages/cartPage.scss';

export class CartPage {
  cartController: CartController;
  pagination: Pagination<CartProduct>;
  cart: HTMLElement;
  cartForm: HTMLElement;
  paginationView: PaginationView;

  constructor(cartController: CartController) {
    this.cartController = cartController;
    this.pagination = new Pagination(this.cartController.cart.cartProducts);
    this.paginationView = new PaginationView(this.pagination);
    this.cart = createElemDOM('div', 'cart');
    this.cartForm = createElemDOM('div', 'cart__total');
  }
  draw(): void {
    const main = document.querySelector('.main');
    if (!main) throw new Error("Can't find element with class 'main'");
    this.clear();
    const page = createElemDOM('div', 'cart-page');
    const paginWrapp = createElemDOM('div', 'pagin__wrapp');

    paginWrapp.append(this.paginationView.draw(), this.cart);

    page.append(paginWrapp, this.cartForm);
    this.setListeners();
    main.append(page);
    CartView.draw(this.pagination.getCurrPageColl());
    CartSum.draw(this.cartController.cart);
  }

  private clear() {
    const main = document.querySelector('.main');
    if (!main) throw new Error("Can't find element with class 'main'");
    main.innerHTML = '';
  }
  private setListeners(): void {
    this.cart.addEventListener('click', (e: Event) => {
      this.cartController.changeCart(
        e,
        () => {
          CartView.draw(this.pagination.getCurrPageColl());
          const currPage = document.querySelector('.pagin__page');
          if (currPage instanceof HTMLElement) {
            currPage.textContent = this.pagination.getCurrPage().toString();
          }
        },
        () => {
          CartSum.draw(this.cartController.cart);
        }
      );
    });
    this.cartForm.addEventListener('click', (e: Event) => {
      this.cartController.cartFormHandler(e, () =>
        CartSum.draw(this.cartController.cart)
      );
    });
  }
}
