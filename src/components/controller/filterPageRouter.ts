import Router from './router';

export default class FilterPageRouter extends Router {
  constructor() {
    super();
  }

  setCategories(): void {
    const categories = [...document.querySelectorAll('.categories-item_input')]
      .filter((item) => (item as HTMLInputElement).checked)
      .map((item) => (item as HTMLInputElement).value);

    if (categories.length) {
      this.setQuery('categories', categories.join('↕'));
    } else {
      this.deleteQuery('categories');
    }
  }

  setBrands(): void {
    const brands = [...document.querySelectorAll('.brands-item_input')]
      .filter((item) => (item as HTMLInputElement).checked)
      .map((item) => (item as HTMLInputElement).value);

    if (brands.length) {
      this.setQuery('brands', brands.join('↕'));
    } else {
      this.deleteQuery('brands');
    }
  }

  setPrice(): void {
    const priceRange = [...document.querySelectorAll('.controls_input')]
      .slice(0, 2)
      .map((item) => (item as HTMLInputElement).value);

    this.setQuery('price', priceRange.join('↕'));
  }

  setStock(): void {
    const stockRange = [...document.querySelectorAll('.controls_input')]
      .slice(2, 4)
      .map((item) => (item as HTMLInputElement).value);

    this.setQuery('stock', stockRange.join('↕'));
  }

  setSearch(): void {
    const search = (
      document.querySelector('.search-bar_input') as HTMLInputElement
    ).value;

    if (search) {
      this.setQuery('search', search);
    } else {
      this.deleteQuery('search');
    }
  }

  setView(): void {
    const view = document.querySelector('.view-active') as HTMLElement;
    const value = (view.dataset.type === 'list').toString();

    this.setQuery('list', value);
  }

  setSorting(): void {
    const selector = document.querySelector('.sorter_input');

    if (!(selector instanceof HTMLSelectElement)) return;

    this.setQuery('sort', selector.value);
  }

  getValues(name: string): string[] {
    const queryString = super.getQuery(name);
    if (!queryString) return [];
    console.log(queryString);
    return queryString.split('↕').map((value) => value.toLowerCase());
  }

  getView(): boolean {
    const queryString = super.getQuery('list');
    if (queryString === 'true') return true;

    return false;
  }

  getSorting(): string {
    const queryString = super.getQuery('sort');
    if (!queryString) return '';

    return queryString;
  }
}
