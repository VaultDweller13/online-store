import { createElemDOM } from '../../utils/utils';

export class SearchBar {
  element: HTMLElement;
  data: ProductData[];
  value: string;

  constructor(data: ProductData[]) {
    this.element = this.createElement();
    this.data = data;
    this.value = '';
  }

  private createElement(): HTMLElement {
    const container = createElemDOM('div', 'search-bar');
    const input = createElemDOM('input', 'search-bar_input');
    input.setAttribute('type', 'text');
    input.setAttribute('placeholder', 'Найти товар');
    input.dataset.type = 'search';

    container.append(input);

    return container;
  }

  public search(): ProductData[] {
    this.value = this.parseInput().toLowerCase();
    const keys = [
      'title',
      'description',
      'price',
      'discountPercentage',
      'rating',
      'stock',
      'brand',
      'category',
    ];

    return this.data.filter((item) => {
      const values: string[] = [];

      for (const [k, v] of Object.entries(item)) {
        if (keys.includes(k)) values.push(v.toString());
      }

      return (
        keys.some((k) => k.toLowerCase().includes(this.value)) ||
        values.some((v) => v.toString().toLowerCase().includes(this.value))
      );
    });
  }

  public parseInput(): string {
    return (document.querySelector('.search-bar_input') as HTMLInputElement)
      .value;
  }

  public setInput(value: string): void {
    const input = document.querySelector('.search-bar_input');
    if (input instanceof HTMLInputElement && value) input.value = value;
  }
}
