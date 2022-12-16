export class Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];

  constructor(data: ProductData) {
    ({
      id: this.id,
      title: this.title,
      description: this.description,
      price: this.price,
      discountPercentage: this.discountPercentage,
      rating: this.rating,
      stock: this.stock,
      brand: this.brand,
      category: this.category,
      thumbnail: this.thumbnail,
      images: this.images,
    } = data);
  }
}
