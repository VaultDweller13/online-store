import { Elements } from '../../types/enums';

export default class Filter {
  data: ProductData[];
  maxPrice: number;
  minPrice: number;
  minStock: number;
  maxStock: number;

  constructor(data: ProductData[]) {
    this.data = data;
    [this.minPrice, this.maxPrice] = this.getRange('price');
    [this.minStock, this.maxStock] = this.getRange('stock');
  }

  filter(options: filterOptions) {
    let filteredData = this.data;

    if (options.category.length) {
      filteredData = filteredData.filter((product) =>
        options.category.includes(product.category)
      );
    }

    if (options.brand.length) {
      filteredData = filteredData.filter((product) =>
        options.brand.includes(product.brand)
      );
    }

    filteredData = filteredData.filter(
      (product) =>
        product.price >= options.minPrice && product.price <= options.maxPrice
    );

    filteredData = filteredData.filter(
      (product) =>
        product.stock >= options.minStock && product.stock <= options.maxStock
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

      const data = this.filter(this.getFilterOptions());

      callback(data);
    });

    element.addEventListener('change', (e) => {
      const target = e.target;
      if (!(target instanceof HTMLInputElement)) return;
      if (target.type !== Elements.textInput && target.type !== Elements.range)
        return;

      const data = this.filter(this.getFilterOptions());

      callback(data);
    });
  }

  private getRange(prop: 'price' | 'stock') {
    const arr = this.data.map((item) => item[prop]).sort((a, b) => a - b);
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
    const controlInputs = Array.from(
      document.querySelectorAll('.controls_input')
    );

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

    if (controlInputs[0] instanceof HTMLInputElement) {
      options.minPrice = +controlInputs[0].value;
    }

    if (controlInputs[1] instanceof HTMLInputElement) {
      options.maxPrice = +controlInputs[1].value;
    }

    if (controlInputs[2] instanceof HTMLInputElement) {
      options.minStock = +controlInputs[2].value;
    }

    if (controlInputs[3] instanceof HTMLInputElement) {
      options.maxStock = +controlInputs[3].value;
    }

    return options;
  }
}
