import { Cart } from './../../cart/cart';
import { createElemDOM } from '../../../utils/utils';
import './../../../assets/styles/components/products.scss';

export class ProductsView {
  private static drawCard(data: ProductData, countInCart: number): HTMLElement {
    const card = createElemDOM('div', 'card card-small');
    const title = createElemDOM('h3', 'card__title', data.title);
    const img = createElemDOM('img', 'card__img');

    const price = createElemDOM('p', 'card__price', `Price: $${data.price}`);
    const stock = createElemDOM('p', 'card__stock', `Stock: ${data.stock}`);

    const button = createElemDOM(
      'button',
      `button button_add ${countInCart ? 'hide' : ''}`,
      'Add to cart'
    );
    card.dataset.productId = data.id.toString();
    if (img instanceof HTMLImageElement) {
      img.alt = data.title;
      img.src = data.thumbnail;
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
    const buttWrap = createElemDOM('div', 'wrapper_butt');
    buttWrap.append(inCartWrapper, buttonView, button);
    card.append(img, title, price, stock, buttWrap);
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
    const container = document.querySelector('.product-page');
    if (!container)
      throw new Error("Can't find element with class 'product-page'");
    const card = createElemDOM('div', 'card card_single');
    card.dataset.productId = product.id.toString();
    const title = createElemDOM('h3', 'card__title', product.title);
    const img = createElemDOM('img', 'card__img');
    if (img instanceof HTMLImageElement) {
      img.alt = product.title;
      img.src = product.thumbnail;
    }
    const category = createElemDOM(
      'p',
      'card__category',
      `<strong>Category: </strong>${product.category}`
    );
    const description = createElemDOM(
      'p',
      'card__description',
      `<strong>Description: </strong>${product.description}`
    );
    const brand = createElemDOM(
      'p',
      'card__brand',
      `<strong>Brand: </strong>${product.brand}`
    );

    const price = createElemDOM(
      'p',
      'card__price',
      `<strong>Price: </strong>$${product.price}`
    );
    const stock = createElemDOM(
      'p',
      'card__stock',
      `<strong>Stock: </strong>${product.stock}`
    );
    const images = createElemDOM('div', 'card__images');

    let i = 0;
    const countInCart = cart.getProductCount(product);
    product.images.forEach((currImg) => {
      const currImgHTML = createElemDOM('img', 'images__img');
      if (currImgHTML instanceof HTMLImageElement) {
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
    const wrapPrice = createElemDOM('div', 'card__wrapper_price');
    wrapPrice.append(price, stock, button, inCartWrapper, buttonBuy);
    card.append(
      title,
      images,
      img,
      brand,
      category,
      description,

      wrapPrice
    );
    fragment.append(card);

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
