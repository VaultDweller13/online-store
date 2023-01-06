import { createElemDOM } from '../../utils/utils';

export class Sorter {
  element: HTMLElement;
  data: ProductData[];

  constructor(data: ProductData[]) {
    this.data = data;
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

  public setListener(callback: (data: ProductData[]) => void) {
    this.sort('price', 'ascending');

    this.element.addEventListener('change', (e) => {
      const target = e.target;

      if (!(target instanceof HTMLSelectElement)) return;

      const option = target.value.split('-')[0];
      const order = target.value.split('-')[1];

      if (
        (option !== 'price' && option !== 'rating') ||
        (order !== 'ascending' && order !== 'descending')
      )
        return;

      this.sort(option, order);

      callback(this.data);
    });
  }

  public sort(option: 'price' | 'rating', order: 'ascending' | 'descending') {
    switch (order) {
      case 'ascending':
        this.data.sort((a, b) => a[option] - b[option]);
        break;
      case 'descending':
        this.data.sort((a, b) => b[option] - a[option]);
        break;
    }
  }
}
