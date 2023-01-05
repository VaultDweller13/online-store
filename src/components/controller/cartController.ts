import { Loader } from './loader';
import { Cart } from './../cart/cart';
export class CartController {
  cart: Cart;
  loader: Loader;
  constructor(cart: Cart, loader: Loader) {
    this.cart = cart;
    this.loader = loader;
  }

  // addToCart(e: Event): void {
  //   if (!e.target || !e.currentTarget) throw new Error('target is null');
  //   const target: HTMLElement = <HTMLElement>e.target;
  //   if (target.classList.contains('button')) {
  //     const productId: string = <string>target.getAttribute('data-product-id');
  //     // this.cart.addProduct(this.loader.getProduct(productId));
  //   }
  // }

  changeCart(e: Event, callback: () => void): void {
    if (!e.target || !e.currentTarget) throw new Error('target is null');
    const target: HTMLElement = <HTMLElement>e.target;
    if (
      !target.classList.contains('button_inc') &&
      !target.classList.contains('button_dec')
    )
      return;
    const card = target.closest('.card');
    if (!card) throw new Error("Can't find element with class 'card'");
    const productId: string = <string>card.getAttribute('data-product-id');
    const product = this.loader.getProduct(productId);

    let count = 0;
    if (target.classList.contains('button_inc')) {
      count = this.cart.addProduct(product);
    } else if (target.classList.contains('button_dec')) {
      count = this.cart.deleteProduct(product);
    }
    if (count === 0) {
      callback();
    } else {
      const countHTML = card.querySelector('.card__count');
      if (!countHTML)
        throw new Error("Can't find element with class 'card__count'");

      countHTML.textContent = count.toString();
    }
  }
}
