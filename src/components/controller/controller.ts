import { NotFoundPage } from './../../pages/notFoundPage';
import { ProductPage } from './../../pages/productPage';
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
  private productPage: ProductPage;
  private notFoundPage: NotFoundPage;

  constructor() {
    this.loader = new Loader(productsData);
    this.products = this.loader.getProducts();
    this.cart = new Cart();
    this.cartController = new CartController(this.cart, this.loader);
    this.filterPage = new FilterPage(this.products, this.cartController);
    this.productPage = new ProductPage(
      this.cartController,

      this.cart
    );
    this.cartPage = new CartPage(this.cartController);
    this.notFoundPage = new NotFoundPage();
  }

  drawFilterPage() {
    this.filterPage.data = this.products;
    this.filterPage.draw();
  }

  drawCartPage() {
    this.cartPage.draw();
  }
  drawProductPage(id: string) {
    const product = this.loader.getProduct(id);
    if (product) this.productPage.draw(product);
    else this.notFoundPage.draw();
  }
}
