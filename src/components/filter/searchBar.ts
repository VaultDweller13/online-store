import { createElemDOM } from '../../utils/utils';

export class SearchBar {
  element: HTMLElement;
  data: ProductData[];

  constructor(data: ProductData[]) {
    this.element = this.createElement();
    this.data = data;
  }

  private createElement(): HTMLElement {
    const container = createElemDOM('div', 'search-bar');
    const input = createElemDOM('input', 'search-bar_input');
    input.setAttribute('type', 'text');
    input.setAttribute('placeholder', 'Найти товар');

    container.append(input);

    return container;
  }

  search(): ProductData[] {
    const value = this.parseInput().toLowerCase();

    return this.data.filter((item) => {
      const keys = Object.keys(item);
      const values = Object.values(item);

      return (
        keys.some((k) => k.toLowerCase().includes(value)) ||
        values.some((v) => v.toString().toLowerCase().includes(value))
      );
    });
  }

  parseInput(): string {
    return (document.querySelector('.search-bar_input') as HTMLInputElement)
      .value;
  }
}
