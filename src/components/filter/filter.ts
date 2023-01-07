import { getMaxValue, getMinValue } from '../../utils/utils';
import { SearchBar } from './searchBar';

export default class Filter {
  data: ProductData[];
  maxPrice: number;
  minPrice: number;
  minStock: number;
  maxStock: number;
  searchBar: SearchBar;
  currentFilterOptions: filterOptions;

  constructor(data: ProductData[]) {
    this.data = data;
    [this.minPrice, this.maxPrice] = this.getRange(data, 'price');
    [this.minStock, this.maxStock] = this.getRange(data, 'stock');
    this.searchBar = new SearchBar(data);
    this.currentFilterOptions = this.initFilterOptions();
  }

  public setPriceRange() {
    const { minPrice, maxPrice } = this.getFilterOptions();
    [this.currentFilterOptions.minPrice, this.currentFilterOptions.maxPrice] = [
      minPrice,
      maxPrice,
    ];
  }

  public setStockRange() {
    const { minStock, maxStock } = this.getFilterOptions();
    [this.currentFilterOptions.minStock, this.currentFilterOptions.maxStock] = [
      minStock,
      maxStock,
    ];
  }

  public filter() {
    const { category, brand } = this.getFilterOptions();
    const { minPrice, maxPrice, minStock, maxStock } =
      this.currentFilterOptions;

    return this.searchBar
      .search()
      .filter((item) => category.includes(item.category))
      .filter((item) => brand.includes(item.brand))
      .filter((item) => item.price >= minPrice && item.price <= maxPrice)
      .filter((item) => item.stock >= minStock && item.stock <= maxStock);
  }

  private getRange(data: ProductData[], prop: 'price' | 'stock') {
    const arr = data.map((item) => item[prop]).sort((a, b) => a - b);
    return [arr[0], arr[arr.length - 1]];
  }

  private getFilterOptions(): filterOptions {
    const options = this.initFilterOptions();
    const parsedCategories: string[] = [];
    const parsedBrands: string[] = [];

    const categories = [...document.querySelectorAll('.categories-item_input')];
    const brands = [...document.querySelectorAll('.brands-item_input')];
    const inputs = [...document.querySelectorAll('.controls_input')];

    categories.forEach((item) => {
      if (item instanceof HTMLInputElement && item.checked) {
        parsedCategories.push(item.value);
      }
    });

    brands.forEach((item) => {
      if (item instanceof HTMLInputElement && item.checked) {
        parsedBrands.push(item.value);
      }
    });

    if (parsedCategories.length) options.category = parsedCategories;
    if (parsedBrands.length) options.brand = parsedBrands;

    if (inputs[0] instanceof HTMLInputElement) {
      options.minPrice = +inputs[0].value;
    }

    if (inputs[1] instanceof HTMLInputElement) {
      options.maxPrice = +inputs[1].value;
    }

    if (inputs[2] instanceof HTMLInputElement) {
      options.minStock = +inputs[2].value;
    }

    if (inputs[3] instanceof HTMLInputElement) {
      options.maxStock = +inputs[3].value;
    }

    return options;
  }

  private initFilterOptions(): filterOptions {
    const category = this.data.map((item) => item.category);
    const brand = this.data.map((item) => item.brand);
    const minPrice = getMinValue(this.data, 'price');
    const maxPrice = getMaxValue(this.data, 'price');
    const minStock = getMinValue(this.data, 'stock');
    const maxStock = getMaxValue(this.data, 'stock');

    return { category, brand, minPrice, maxPrice, minStock, maxStock };
  }
}
