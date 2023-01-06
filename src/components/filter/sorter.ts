import { createElemDOM } from '../../utils/utils';

export class Sorter {
  element: HTMLElement;

  constructor() {
    this.element = this.createElement();
  }

  private createElement(): HTMLElement {
    const container = createElemDOM('div', 'sorter');
    const input = createElemDOM('select', 'sorter_input');
    input.setAttribute('type', 'select');
    const sortOptions = [
      this.addOption('price-ascending', 'По возрастанию цены'),
      this.addOption('price-descending', 'По убыванию цены'),
      this.addOption('rating-ascending', 'По возрастанию рейтинга'),
      this.addOption('rating-descending', 'По убыванию рейтинга'),
    ];

    input.append(...sortOptions);
    container.append(input);

    return container;
  }

  private addOption(value: string, name: string): HTMLElement {
    const option = createElemDOM('option', 'sorter_option', name);
    option.setAttribute('value', value);

    return option;
  }

  public sort(data: ProductData[], selector?: HTMLSelectElement) {
    let [prop, order] = ['price', 'ascending'] as sortOptions;

    if (selector) [prop, order] = selector.value.split('-') as sortOptions;

    switch (order) {
      case 'ascending':
        data.sort((a, b) => a[prop] - b[prop]);
        break;
      case 'descending':
        data.sort((a, b) => b[prop] - a[prop]);
        break;
    }
  }
}
