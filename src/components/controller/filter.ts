import { Elements } from '../../types/enums';

export default class Filter {
  data: ProductData[];

  constructor(data: ProductData[]) {
    this.data = data;
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

    return filteredData;
  }

  setListener(
    element: HTMLElement,
    callback: (filteredData: ProductData[]) => void
  ) {
    element.addEventListener('click', (e) => {
      const target = e.target;
      if (!(target instanceof HTMLElement)) return;
      if (target.tagName !== Elements.input) return;

      const data = this.filter(this.getFilterOptions());

      callback(data);
    });
  }

  private getFilterOptions(): filterOptions {
    const options: filterOptions = {
      category: [],
      brand: [],
    };

    const categories = Array.from(
      document.querySelectorAll('.categories-item_input')
    );

    const brands = Array.from(document.querySelectorAll('.brands-item_input'));

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

    return options;
  }
}
