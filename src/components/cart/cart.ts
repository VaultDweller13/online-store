export class Cart {
  cartProducts: CartProduct[];
  appliedPromo: Promo[];
  availablePromo: Promo[];
  constructor() {
    const cartLocal = localStorage.getItem('cart-online');
    if (cartLocal) this.cartProducts = JSON.parse(cartLocal) as [];
    else {
      this.cartProducts = [];
    }
    this.appliedPromo = [];
    this.availablePromo = [
      { name: 'RS', discount: 10 },
      { name: 'Disc', discount: 5 },
    ];
  }
  addProduct(product: ProductData): number {
    const searchProduct = this.cartProducts.find(
      (cartProduct) => cartProduct.productData.id === product.id
    );
    if (searchProduct && searchProduct.count === product.stock) {
      throw new Error('Unable to add this item to cart');
    }

    if (!searchProduct) {
      this.cartProducts.push({ count: 1, productData: product });
    } else {
      searchProduct.count += 1;
    }
    localStorage.setItem('cart-online', JSON.stringify(this.cartProducts));
    return searchProduct?.count || 1;
  }
  deleteProduct(product: ProductData): number {
    let count = 0;
    const searchProductIdx = this.cartProducts.findIndex(
      (cartProduct) => cartProduct.productData.id === product.id
    );
    this.cartProducts[searchProductIdx].count -= 1;
    count = this.cartProducts[searchProductIdx].count;
    if (count === 0) this.cartProducts.splice(searchProductIdx, 1);

    localStorage.setItem('cart-online', JSON.stringify(this.cartProducts));
    return count;
  }
  getProductCount(product: ProductData): number {
    const searchProduct = this.cartProducts.find(
      (cartProduct) => cartProduct.productData.id === product.id
    );
    return searchProduct?.count || 0;
  }
  getSumCart(): number {
    return this.cartProducts.reduce(
      (sum, curr) => sum + curr.productData.price * curr.count,
      0
    );
  }
  getCountCart(): number {
    return this.cartProducts.reduce((sum, curr) => sum + curr.count, 0);
  }
  applyPromo(promo: string): boolean {
    let canApply = false;
    const searchPromo = this.availablePromo.find(
      (currPromo) => currPromo.name === promo
    );
    if (searchPromo) {
      this.appliedPromo.push({ ...searchPromo });
      canApply = true;
    }
    return canApply;
  }
  deletePromo(promo: string) {
    const searchPromoIdx = this.appliedPromo.findIndex(
      (currPromo) => currPromo.name === promo
    );
    this.appliedPromo.splice(searchPromoIdx, 1);
  }
  getSumWithPromo(): number {
    return Math.floor(
      (this.getSumCart() *
        (100 -
          this.appliedPromo.reduce((sum, curr) => sum + curr.discount, 0))) /
        100
    );
  }
}
