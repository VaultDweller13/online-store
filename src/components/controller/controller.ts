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
    this.cartPage = new CartPage(this.cart.cartProducts);
  }

  drawFilterPage() {
    this.filterPage.draw();
  }
  drawCartPage() {
    this.cartPage.draw();
  }
}
