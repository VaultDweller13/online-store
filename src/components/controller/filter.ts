import { Elements } from '../../types/enums';

export default class Filter {
  data: ProductData[];
  maxPrice: number;
  minPrice: number;

  constructor(data: ProductData[]) {
    this.data = data;
    [this.minPrice, this.maxPrice] = this.getPriceRange();
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

  private getPriceRange() {
    const prices = this.data.map((item) => item.price).sort((a, b) => a - b);
    return [prices[0], prices[prices.length - 1]];
  }

  private getFilterOptions(): filterOptions {
    const options: filterOptions = {
      category: [],
      brand: [],
      minPrice: 0,
      maxPrice: 0,
    };

    const categories = Array.from(
      document.querySelectorAll('.categories-item_input')
    );
    const brands = Array.from(document.querySelectorAll('.brands-item_input'));
    const priceInputs = Array.from(
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

    if (priceInputs[0] instanceof HTMLInputElement) {
      options.minPrice = +priceInputs[0].value;
    }

    if (priceInputs[1] instanceof HTMLInputElement) {
      options.maxPrice = +priceInputs[1].value;
    }

    return options;
  }
}
