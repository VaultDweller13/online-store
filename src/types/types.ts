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
  minPrice: number;
  maxPrice: number;
  minStock: number;
  maxStock: number;
};
type CartProduct = {
  productData: ProductData;
  count: number;
};

type Promo = {
  name: string;
  discount: number;
};

type sortOptions = [
  prop: 'price' | 'rating',
  order: 'ascending' | 'descending'
];

type inputOrder = {
  target: HTMLInputElement;
  errors: string[];
  errorTarget: HTMLElement;
};

type route = {
  route: string;
  data: string;
};
