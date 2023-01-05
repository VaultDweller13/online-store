import { Cart } from './../cart/cart';
import { CartPage } from './../../pages/cartPage';
import { Loader } from './loader';
import productsData from '../../mock/products.json';
import { FilterPage } from '../../pages/filterPage';

export class Controller {
  private loader: Loader;
  private products: ProductData[];
  private cart: Cart;
  private filterPage: FilterPage;
  private cartPage: CartPage;

  constructor() {
    this.loader = new Loader(productsData);
    this.products = this.loader.getProducts();
    this.cart = new Cart();
    this.filterPage = new FilterPage(this.products);

    this.cartPage = new CartPage(this.cart, this.loader);
  }

  drawFilterPage() {
    this.filterPage.draw();
  }
  drawCartPage() {
    this.cartPage.draw();
  }
  addToCart(e: Event, className: string): void {
    if (!e.target || !e.currentTarget) throw new Error('target is null');
    const target: HTMLElement = <HTMLElement>e.target;
    if (target.classList.contains(className)) {
      const productId: string = <string>target.getAttribute('data-product-id');
      this.cart.addProduct(this.loader.getProduct(productId));
    }
  }
}
