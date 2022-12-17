import { Loader } from './loader';
import productsData from '../../mock/products.json';
import { FilterPage } from '../../pages/filterPage';

export class Controller {
  private loader: Loader;
  private products: ProductData[];
  private filterPage: FilterPage;

  constructor() {
    this.loader = new Loader(productsData);
    this.products = this.loader.getProducts();
    this.filterPage = new FilterPage();
  }

  drawFilterPage() {
    this.filterPage.draw(this.products);
  }
}
