export class Cart {
  cartProducts: CartProduct[];
  constructor() {
    this.cartProducts = [];
  }
  addProduct(product: ProductData) {
    const searchProduct = this.cartProducts.filter(
      (cartProduct) => cartProduct.productData.id === product.id
    )[0];
    if (searchProduct && searchProduct.count === product.stock) {
      throw new Error('Unable to add this item to cart');
    }
    if (!searchProduct) {
      this.cartProducts.push({ count: 1, productData: product });
    } else {
      this.cartProducts.forEach((cartProduct) => {
        if (cartProduct.productData.id === product.id) {
          cartProduct.count += 1;
        }
      });
    }
  }
  deleteProduct(product: ProductData) {
    this.cartProducts.forEach((cartProduct, index, arr) => {
      if (cartProduct.productData.id === product.id) {
        cartProduct.count -= 1;
        if (cartProduct.count === 0) {
          arr.splice(index, 1);
        }
      }
    });
  }
  getSumCart(): number {
    return this.cartProducts.reduce(
      (sum, curr) => sum + curr.productData.price,
      0
    );
  }
}
