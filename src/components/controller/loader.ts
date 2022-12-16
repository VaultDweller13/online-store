import { Product } from '../product/product';

export class Loader implements JSONLoader {
  private products: ProductData[];

  constructor(data: ProductsJSON) {
    if (!this.isProductsJSON(data)) {
      throw Error('Invalid products data');
    }

    this.products = data.products.map(
      (product: Product) => new Product(product)
    );
  }

  getProducts() {
    return this.products;
  }

  private isProductsJSON(data: ProductsJSON | unknown): data is ProductsJSON {
    return (data as ProductsJSON).products !== undefined;
  }
}
