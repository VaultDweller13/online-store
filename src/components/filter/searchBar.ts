import { createElemDOM } from '../../utils/utils';

export class SearchBar {
  element: HTMLElement;
  data: ProductData[];

  constructor() {
    this.element = this.createElement();
    this.data = [];
  }

  private createElement(): HTMLElement {
    const container = createElemDOM('div', 'search-bar');
    const input = createElemDOM('input', 'search-bar_input');
    input.setAttribute('type', 'text');
    input.setAttribute('placeholder', 'Найти товар');

    container.append(input);

    return container;
  }

  search(value: string): ProductData[] {
    const result = this.data.filter((item) => {
      const keys = Object.keys(item);
      const values = Object.values(item);

      return (
        keys.some((k) => k.includes(value)) ||
        values.some((v) => v.toString().includes(value))
      );
    });

    return result;
  }
}
