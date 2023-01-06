import { getMaxValue, getMinValue } from '../../utils/utils';
// import { SearchBar } from './searchBar';

export default class Filter {
  data: ProductData[];
  maxPrice: number;
  minPrice: number;
  minStock: number;
  maxStock: number;
  // searchBar: SearchBar;
  currentFilterOptions: filterOptions;

  constructor(data: ProductData[]) {
    this.data = data;
    [this.minPrice, this.maxPrice] = this.getRange(data, 'price');
    [this.minStock, this.maxStock] = this.getRange(data, 'stock');
    // this.searchBar = new SearchBar(data, )
    this.currentFilterOptions = this.initFilterOptions();
  }

  public setCategoryFilter() {
    const { category } = this.getFilterOptions();
    this.currentFilterOptions.category = category;
  }

  public setBrandFilter() {
    const { brand } = this.getFilterOptions();
    this.currentFilterOptions.brand = brand;
  }

  public setPriceFilter() {
    const { minPrice, maxPrice } = this.getFilterOptions();
    [this.currentFilterOptions.minPrice, this.currentFilterOptions.maxPrice] = [
      minPrice,
      maxPrice,
    ];
  }

  public setStockFilter() {
    const { minStock, maxStock } = this.getFilterOptions();
    [this.currentFilterOptions.minStock, this.currentFilterOptions.maxStock] = [
      minStock,
      maxStock,
    ];
  }

  public filter(data: ProductData[]) {
    const { category, brand, minPrice, maxPrice, minStock, maxStock } =
      this.currentFilterOptions;
    let filteredData = data;

    if (category.length) {
      filteredData = filteredData.filter((product) =>
        category.includes(product.category)
      );
    }

    if (brand.length) {
      filteredData = filteredData.filter((product) =>
        brand.includes(product.brand)
      );
    }

    filteredData = filteredData.filter(
      (product) => product.price >= minPrice && product.price <= maxPrice
    );

    filteredData = filteredData.filter(
      (product) => product.stock >= minStock && product.stock <= maxStock
    );

    return filteredData.length ? filteredData : this.data;
  }

  private getRange(data: ProductData[], prop: 'price' | 'stock') {
    const arr = data.map((item) => item[prop]).sort((a, b) => a - b);
    return [arr[0], arr[arr.length - 1]];
  }

  private getFilterOptions(): filterOptions {
    const options: filterOptions = {
      category: [],
      brand: [],
      minPrice: 0,
      maxPrice: 0,
      minStock: 0,
      maxStock: 0,
    };

    const categories = Array.from(
      document.querySelectorAll('.categories-item_input')
    );
    const brands = Array.from(document.querySelectorAll('.brands-item_input'));

    const inputs = Array.from(document.querySelectorAll('.controls_input'));

    categories.forEach((item) => {
      if (item instanceof HTMLInputElement && item.checked) {
        options.category.push(item.value);
      }
    });

    brands.forEach((item) => {
      if (item instanceof HTMLInputElement && item.checked) {
        options.brand.push(item.value);
      }
    });

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
