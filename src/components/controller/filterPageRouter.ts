import Router from './router';

export default class FilterPageRouter extends Router {
  constructor() {
    super();
  }

  setCategories() {
    const categories = [...document.querySelectorAll('.categories-item_input')]
      .filter((item) => (item as HTMLInputElement).checked)
      .map((item) => (item as HTMLInputElement).value);

    if (categories.length) {
      this.setQuery('categories', categories.join('↕'));
    } else {
      this.deleteQuery('categories');
    }
  }

  setBrands() {
    const brands = [...document.querySelectorAll('.brands-item_input')]
      .filter((item) => (item as HTMLInputElement).checked)
      .map((item) => (item as HTMLInputElement).value);

    if (brands.length) {
      this.setQuery('brands', brands.join('↕'));
    } else {
      this.deleteQuery('brands');
    }
  }

  setPrice() {
    console.log('price');
    const priceRange = [...document.querySelectorAll('.controls_input')]
      .slice(0, 2)
      .map((item) => (item as HTMLInputElement).value);

    this.setQuery('price', priceRange.join('↕'));
  }

  setStock() {
    console.log('stock');

    const stockRange = [...document.querySelectorAll('.controls_input')]
      .slice(2, 4)
      .map((item) => (item as HTMLInputElement).value);

    this.setQuery('stock', stockRange.join('↕'));
  }

  setSearch() {
    const search = (
      document.querySelector('.search-bar_input') as HTMLInputElement
    ).value;

    if (search) {
      this.setQuery('search', search);
    } else {
      this.deleteQuery('search');
    }
  }

  setView() {
    const view = document.querySelector('.view-active') as HTMLElement;
    const value = (view.dataset.type === 'list').toString();

    this.setQuery('list', value);
  }

  setSorting() {
    const selector = document.querySelector('.sorter_input');

    if (!(selector instanceof HTMLSelectElement)) return;

    // const [prop, order] = selector.value.split('-');
    this.setQuery('sort', selector.value);
  }
}
