import { Elements } from '../../types/enums';
import { getMaxValue, getMinValue } from '../../utils/utils';

export default class Filter {
  data: ProductData[];
  maxPrice: number;
  minPrice: number;
  minStock: number;
  maxStock: number;
  currentFilterOptions: filterOptions;

  constructor(data: ProductData[]) {
    this.data = data;
    [this.minPrice, this.maxPrice] = this.getRange(data, 'price');
    [this.minStock, this.maxStock] = this.getRange(data, 'stock');
    this.currentFilterOptions = this.initFilterOptions();
  }

  setCategoryFilter() {
    const { category } = this.getFilterOptions();
    this.currentFilterOptions.category = category;
  }

  setBrandFilter() {
    const { brand } = this.getFilterOptions();
    this.currentFilterOptions.brand = brand;
  }

  setPriceFilter() {
    const { minPrice, maxPrice } = this.getFilterOptions();
    [this.currentFilterOptions.minPrice, this.currentFilterOptions.maxPrice] = [
      minPrice,
      maxPrice,
    ];
  }

  setStockFilter() {
    const { minStock, maxStock } = this.getFilterOptions();
    [this.currentFilterOptions.minStock, this.currentFilterOptions.maxStock] = [
      minStock,
      maxStock,
    ];
  }

  filter() {
    const { category, brand, minPrice, maxPrice, minStock, maxStock } =
      this.currentFilterOptions;
    let filteredData = this.data;

    console.log(this.currentFilterOptions);
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

    return filteredData;
  }

  setListener(
    element: HTMLElement,
    callback: (filteredData: ProductData[]) => void
  ) {
    element.addEventListener('click', (e) => {
      const target = e.target;
      if (!(target instanceof HTMLInputElement)) return;
      if (target.type !== Elements.checkbox) return;

      const data = this.filter();

      // this.updateInputs(data);
      callback(data);
    });

    element.addEventListener('change', (e) => {
      const target = e.target;
      if (!(target instanceof HTMLInputElement)) return;
      if (target.type !== Elements.textInput && target.type !== Elements.range)
        return;

      const data = this.filter();

      callback(data);
    });
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
