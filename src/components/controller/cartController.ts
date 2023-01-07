import { Loader } from './loader';
import { Cart } from './../cart/cart';
export class CartController {
  cart: Cart;
  loader: Loader;
  constructor(cart: Cart, loader: Loader) {
    this.cart = cart;
    this.loader = loader;
  }

  addToCart(e: Event): void {
    if (!e.target || !e.currentTarget) throw new Error('target is null');
    const target = <HTMLElement>e.target;
    const card = target.closest('.card');

    if (!(card instanceof HTMLElement)) return;

    if (target.classList.contains('button_add')) {
      const productId = card.dataset.productId;
      if (!productId) throw new Error('There is no data-set attribute in card');
      const product = this.loader.getProduct(productId);
      const count = this.cart.addProduct(product);
      this.refreshCardCount(card, count);
      card?.querySelector('.button_add')?.classList.toggle('hide');
      card?.querySelector('.card__cart')?.classList.toggle('hide');
      this.refreshTotalCount();
      this.refreshTotalSum();
    } else {
      this.changeCart(e, () => {
        card?.querySelector('.button_add')?.classList.toggle('hide');
        card?.querySelector('.card__cart')?.classList.toggle('hide');
      });
    }
  }

  changeCart(
    e: Event,
    callbackIfNull: () => void,
    callBack?: () => void
  ): void {
    if (!e.target || !e.currentTarget) throw new Error('target is null');
    const target = <HTMLElement>e.target;
    if (
      !target.classList.contains('button_inc') &&
      !target.classList.contains('button_dec')
    )
      return;
    const card = target.closest('.card');
    if (!(card instanceof HTMLElement))
      throw new Error("Can't find element with class 'card'");

    const productId = card.dataset.productId;
    if (!productId) throw new Error('There is no data-set attribute in card');
    const product = this.loader.getProduct(productId);

    let count = 0;
    if (target.classList.contains('button_inc')) {
      count = this.cart.addProduct(product);
    } else if (target.classList.contains('button_dec')) {
      count = this.cart.deleteProduct(product);
    }
    const price = product.price;
    this.refreshCardCount(card, count, price);
    if (count === 0) {
      callbackIfNull();
    }
    callBack ? callBack() : undefined;
    this.refreshTotalCount();
    this.refreshTotalSum();
  }

  refreshTotalCount(): void {
    const totalCountHTML = document.querySelector('.cart__totalcount');
    if (!totalCountHTML)
      throw new Error("Can't find element with class 'cart__totalcount'");
    const totalSum = this.cart.getCountCart();
    totalCountHTML.textContent = totalSum ? totalSum.toString() : '';
  }
  refreshTotalSum(): void {
    const totalCountHTML = document.querySelector('.cart__totalsum');
    if (!totalCountHTML)
      throw new Error("Can't find element with class 'cart__totalsum'");
    const totalSum = this.cart.getSumCart();
    totalCountHTML.textContent = totalSum ? totalSum.toString() : '';
  }
  refreshCardCount(card: HTMLElement, count: number, price?: number): void {
    const countHTML = card.querySelector('.card__count');
    if (!countHTML)
      throw new Error("Can't find element with class 'card__count'");

    countHTML.textContent = count.toString();
    const sumCountHTML = card.querySelector('.card__price');
    if (sumCountHTML && price && document.querySelector('.cart'))
      sumCountHTML.textContent = '$' + (count * price).toString();
  }
  cartFormHandler(e: Event, callBack: () => void): void {
    e.preventDefault();
    if (!e.target || !e.currentTarget) throw new Error('target is null');
    const target = <HTMLElement>e.target;
    if (target.classList.contains('promo__btnDrop')) {
      const promo = target.dataset.promo;
      if (!promo) throw new Error('No datset value promo');
      this.cart.deletePromo(promo);
      callBack();
    }
    if (target.classList.contains('button__buy')) {
      alert('buy');
    }
    if (target.classList.contains('promo__btnApply')) {
      const form = target.closest('.cart__form');
      const input = form?.querySelector('input');
      if (input instanceof HTMLInputElement) {
        const promoVal = input.value;
        const helper = form?.querySelector('.promo__helper');

        if (this.cart.applyPromo(promoVal)) {
          callBack();
          const sumWithPromo = form?.querySelector('.cart__sumWithPromo');

          // if (sumWithPromo instanceof HTMLElement) {
          (<HTMLElement>sumWithPromo).textContent = this.cart
            .getSumWithPromo()
            .toString();
          // }
          input.value = '';
          (<HTMLElement>helper).textContent = '';
        } else {
          (<HTMLElement>helper).textContent = 'No such promo';
        }
      }
    }
  }
}
