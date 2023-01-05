export class Cart {
  cartProducts: CartProduct[];
  constructor() {
    const cartLocal = localStorage.getItem('cart-online');
    if (cartLocal) this.cartProducts = JSON.parse(cartLocal) as [];
    else {
      this.cartProducts = [];
    }
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
    this.cartProducts.forEach((cartProduct, index, arr) => {
      if (cartProduct.productData.id === product.id) {
        cartProduct.count -= 1;
        count = cartProduct.count;
        if (cartProduct.count === 0) {
          arr.splice(index, 1);
        }
      }
    });
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
}
