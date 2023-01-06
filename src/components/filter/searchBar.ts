import { createElemDOM } from '../../utils/utils';

export class SearchBar {
  element: HTMLElement;
  data: ProductData[];
  callback: (data: ProductData[]) => void;

  constructor(data: ProductData[], callback: (data: ProductData[]) => void) {
    this.element = this.createElement();
    this.data = data;
    this.callback = callback;
    this.setListeners();
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
    return this.data.filter((item) => {
      const keys = Object.keys(item);
      const values = Object.values(item);

      return (
        keys.some((k) => k.includes(value)) ||
        values.some((v) => v.toString().includes(value))
      );
    });
  }

  setListeners() {
    // this.element.addEventListener('focusin', (e) => {
    //   const target = e.target;
    //   if (!(target instanceof HTMLInputElement)) return;

    //   if (!target.value) this.data = this.data;
    // });

    // this.element.addEventListener('focusout', (e) => {
    //   const target = e.target;
    //   if (!(target instanceof HTMLInputElement)) return;

    //   if (!target.value) {
    //     this.data = backupData;
    //     this.callback();
    //   }
    // });

    this.element.addEventListener('input', (e: Event) => {
      const target = e.target;
      if (!(target instanceof HTMLInputElement)) return;
      const data = this.search(target.value);
      this.callback(data);
    });
  }
}
