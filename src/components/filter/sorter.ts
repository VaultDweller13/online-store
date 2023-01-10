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
      this.addOption('price-ascending', 'Price ascending'),
      this.addOption('price-descending', 'Price descending'),
      this.addOption('rating-ascending', 'Rating ascending'),
      this.addOption('rating-descending', 'Rating descending'),
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

  public sort(data: ProductData[]) {
    const selector = this.element.querySelector('select') as HTMLSelectElement;
    const [prop, order] = selector.value.split('-') as sortOptions;

    switch (order) {
      case 'ascending':
        data.sort((a, b) => a[prop] - b[prop]);
        break;
      case 'descending':
        data.sort((a, b) => b[prop] - a[prop]);
        break;
    }
  }

  public setValue(value: string) {
    const selector = this.element.querySelector('select');
    if (!(selector instanceof HTMLSelectElement)) return;

    selector.value = value || 'price-ascending';
  }
}
