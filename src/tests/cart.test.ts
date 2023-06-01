import { Cart } from './../components/cart/cart';
import { describe, expect, test } from '@jest/globals';

const newCart = new Cart();
const product: ProductData = {
  id: 1,
  title: 'iPhone 9',
  description: 'An apple mobile which is nothing like apple',
  price: 549,
  discountPercentage: 12.96,
  rating: 4.69,
  stock: 94,
  brand: 'Apple',
  category: 'smartphones',
  thumbnail: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
  images: [
    'https://i.dummyjson.com/data/products/1/1.jpg',
    'https://i.dummyjson.com/data/products/1/2.jpg',
    'https://i.dummyjson.com/data/products/1/3.jpg',
    'https://i.dummyjson.com/data/products/1/4.jpg',
    'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
  ],
};

describe('Cart', () => {
  test('clear cart function', () => {
    newCart.clear();
    expect(newCart.cartProducts).toHaveLength(0);
  });

  test('after adding product length of cart is 1', () => {
    newCart.addProduct(product);
    expect(newCart.cartProducts).toHaveLength(1);
  });
  test('return correct number of product', () => {
    expect(newCart.cartProducts).toEqual([{ productData: product, count: 1 }]);
  });

  test('after deleting product length of cart is 0', () => {
    newCart.deleteProduct(product);
    expect(newCart.cartProducts).toHaveLength(0);
  });
});
