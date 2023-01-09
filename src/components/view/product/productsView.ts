import { OrderView } from './../order/orderView';
import { DialogView } from './../dialogView';
import { CartView } from './../cart/cartView';
import { Cart } from './../../cart/cart';
import { createElemDOM } from '../../../utils/utils';
import './../../../assets/styles/components/products.scss';

export class ProductsView {
  private static drawCard(data: ProductData, countInCart: number): HTMLElement {
    const card = createElemDOM('div', 'card card-small');
    const title = createElemDOM('h3', 'card__title', data.title);
    const img = createElemDOM('img', 'card__img');

    const price = createElemDOM('p', 'card__price', `Price: ${data.price}`);
    const stock = createElemDOM('p', 'card__stock', `Stock: ${data.stock}`);

    const button = createElemDOM(
      'button',
      `button button_add ${countInCart ? 'hide' : ''}`,
      'Add to cart'
    );
    card.dataset.productId = data.id.toString();
    if (img instanceof HTMLImageElement) {
      img.alt = data.title;
      img.src = data.images[0];
    }

    const inCartWrapper = createElemDOM(
      'div',
      `card__cart ${!countInCart ? 'hide' : ''}`
    );

    const count = createElemDOM('p', 'card__count', countInCart.toString());
    const buttonInc = createElemDOM('button', 'button button_inc', '+');
    const buttonDec = createElemDOM('button', 'button button_dec', '-');
    const buttonView = createElemDOM(
      'button',
      'button button_details',
      'Details'
    );

    inCartWrapper.append(buttonDec, count, buttonInc);
    card.append(img, title, price, stock, button, inCartWrapper, buttonView);
    return card;
  }

  public static draw(data: ProductData[], cart: Cart): void {
    const fragment = document.createDocumentFragment();
    const container = document.querySelector('.products');
    if (!container) throw new Error("Can't find element with class 'products'");

    if (!data.length) {
      fragment.append(createElemDOM('p', '', 'No products to display'));
    } else {
      data.forEach((product) => {
        const countInCart = cart.getProductCount(product);
        fragment.append(ProductsView.drawCard(product, countInCart));
      });
    }

    container.textContent = '';
    container.append(fragment);
  }

  public static drawProduct(product: ProductData, cart: Cart): void {
    const fragment = document.createDocumentFragment();
    const container = document.querySelector('.main');
    if (!container) throw new Error("Can't find element with class 'main'");
    const card = createElemDOM('div', 'card_single');
    const title = createElemDOM('h3', 'card__title', product.title);
    // const img = createElemDOM('img', 'card__img');
    // if (img instanceof HTMLImageElement) {
    //   img.alt = product.title;
    //   img.src = product.images[0];
    // }
    const price = createElemDOM('p', 'card__price', `Price: ${product.price}`);
    const stock = createElemDOM('p', 'card__stock', `Stock: ${product.stock}`);
    const images = createElemDOM('div', 'card__images');
    let i = 0;
    const countInCart = cart.getProductCount(product);
    product.images.forEach((currImg) => {
      const currImgHTML = createElemDOM('img', 'images__img');
      if (currImgHTML instanceof HTMLImageElement) {
        console.log(currImg);
        currImgHTML.src = currImg;
        currImgHTML.alt = `img${i++}`;
        images.append(currImgHTML);
      }
    });
    const button = createElemDOM(
      'button',
      `button button_add ${countInCart ? 'hide' : ''}`,
      'Add to cart'
    );
    const inCartWrapper = createElemDOM(
      'div',
      `card__cart ${!countInCart ? 'hide' : ''}`
    );

    const count = createElemDOM('p', 'card__count', countInCart.toString());
    const buttonInc = createElemDOM('button', 'button button_inc', '+');
    const buttonDec = createElemDOM('button', 'button button_dec', '-');
    const buttonBuy = createElemDOM('button', 'button button__buy', 'Buy now');

    inCartWrapper.append(buttonDec, count, buttonInc);
    card.append(
      title,

      price,
      stock,
      images,
      button,
      inCartWrapper,
      buttonBuy
    );
    fragment.append(card);
    buttonBuy.addEventListener('click', () => {
      if (!countInCart) cart.addProduct(product);
      CartView.draw(cart.cartProducts);
      DialogView.draw(OrderView.draw(cart));
    });

    container.textContent = '';
    container.append(fragment);
  }

  public static setView() {
    const viewButton = document.querySelector('.view-active');
    const className = viewButton?.classList.contains('switch-view_list')
      ? 'card-big'
      : 'card-small';

    const productCards = document.querySelectorAll('.card');
    productCards.forEach((card) => {
      card.classList.remove('card-big', 'card-small');
      card.classList.add(className);
    });
  }
}
