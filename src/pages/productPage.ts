import { OrderView } from './../components/view/order/orderView';
import { DialogView } from './../components/view/dialogView';
import { createElemDOM } from './../utils/utils';
import { Cart } from './../components/cart/cart';
import { ProductsView } from './../components/view/product/productsView';
import { CartController } from './../components/controller/cartController';
import { Breadcrumbs } from '../components/filter/breadcrumbs';
export class ProductPage {
  cartController: CartController;
  product?: ProductData;
  cart: Cart;
  page: HTMLElement;
  constructor(cartController: CartController, cart: Cart) {
    this.cartController = cartController;

    this.cart = cart;
    this.page = createElemDOM('div', 'product-page');
    this.setListeners();
  }
  draw(product: ProductData): void {
    this.product = product;
    const breadcrumbs = Breadcrumbs.get(product);

    const main = document.querySelector('.main');
    if (!main) throw new Error("Can't find element with class 'main'");
    this.clear();
    console.log('draw');
    main.append(this.page);
    ProductsView.drawProduct(this.product, this.cart);
    this.page.prepend(breadcrumbs);
    this.cartController.refreshTotalSum();
    this.cartController.refreshTotalCount();
  }
  private clear() {
    const main = document.querySelector('.main');
    if (!main) throw new Error("Can't find element with class 'main'");
    main.innerHTML = '';
  }

  private setListeners(): void {
    this.page.addEventListener('click', (e: Event) => {
      if (!e.target || !e.currentTarget) throw new Error('target is null');
      const target = <HTMLElement>e.target;

      if (
        target.classList.contains('button_add') ||
        target.classList.contains('button_inc') ||
        target.classList.contains('button_dec')
      ) {
        this.cartController.addToCart(e);
      }
      if (target.classList.contains('button__buy')) {
        if (!this.product) throw new Error('no product data');
        const countInCart = this.cart.getProductCount(this.product);
        if (!countInCart) this.cart.addProduct(this.product);

        DialogView.draw(OrderView.draw(this.cart));
      }
      if (target.classList.contains('images__img')) {
        const img = document.querySelector('.card__img');

        if (
          img instanceof HTMLImageElement &&
          target instanceof HTMLImageElement
        ) {
          img.src = target.src;
          img.alt = target.alt;
        }
      }
    });
  }
}
