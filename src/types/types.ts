type ProductData = {
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
};

type ProductsJSON = {
  products: ProductData[];
  total: number;
  skip: number;
  limit: number;
};

interface JSONLoader {
  getProducts(): ProductData[];
}

type filterOptions = {
  category: string[];
  brand: string[];
};
