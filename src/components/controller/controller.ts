import { CartController } from './cartController';
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
  private cartController: CartController;

  constructor() {
    this.loader = new Loader(productsData);
    this.products = this.loader.getProducts();
    this.cart = new Cart();
    this.cartController = new CartController(this.cart, this.loader);
    this.filterPage = new FilterPage(this.products, this.cartController);

    this.cartPage = new CartPage(this.cartController);
  }

  drawFilterPage() {
    this.filterPage.draw();
  }
  drawCartPage() {
    this.cartPage.draw();
  }
}
