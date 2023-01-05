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
    const searchProduct = this.cartProducts.filter(
      (cartProduct) => cartProduct.productData.id === product.id
    )[0];
    if (searchProduct && searchProduct.count === product.stock) {
      throw new Error('Unable to add this item to cart');
    }
    let count = 1;
    if (!searchProduct) {
      this.cartProducts.push({ count: 1, productData: product });
    } else {
      this.cartProducts.forEach((cartProduct) => {
        if (cartProduct.productData.id === product.id) {
          cartProduct.count += 1;
          count = cartProduct.count;
        }
      });
    }
    localStorage.setItem('cart-online', JSON.stringify(this.cartProducts));
    return count;
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
  // getProductCount(product: ProductData): number {

  // }
  getSumCart(): number {
    return this.cartProducts.reduce(
      (sum, curr) => sum + curr.productData.price,
      0
    );
  }
}
