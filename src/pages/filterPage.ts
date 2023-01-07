import { CartController } from './../components/controller/cartController';
import { createElemDOM, getMinValue, getMaxValue } from '../utils/utils';
import { ProductsView } from './../components/view/product/productsView';
import '../assets/styles/pages/filterPage.scss';
import Filter from '../components/filter/filter';
import DualSlider from '../components/filter/dualSlider/dualSlider';
import { Elements } from '../types/enums';
import { Sorter } from '../components/filter/sorter';

export class FilterPage {
  data: ProductData[];
  filteredData: ProductData[];
  filterBlock: HTMLElement;
  filter: Filter;
  cartController: CartController;
  priceSlider: DualSlider;
  stockSlider: DualSlider;
  sorter: Sorter;
  searchBar: HTMLElement;

  constructor(data: ProductData[], cartController: CartController) {
    this.data = data;
    this.filteredData = data;
    this.priceSlider = new DualSlider(
      'priceSlider',
      'Цена',
      'price',
      getMinValue(data, 'price'),
      getMaxValue(data, 'price')
    );
    this.stockSlider = new DualSlider(
      'stockSlider',
      'Количество на складе',
      'stock',
      getMinValue(data, 'stock'),
      getMaxValue(data, 'stock')
    );
    this.filterBlock = this.createFiltersBlock(data);
    this.filter = new Filter(data);

    this.cartController = cartController;
    this.sorter = new Sorter();
    this.sorter.sort(this.data);
    this.searchBar = this.filter.searchBar.element;

    this.setListeners();
  }

  public draw(): void {
    const main = document.querySelector('.main');
    if (!main) throw new Error("Can't find element with class 'main'");

    this.clear();

    const page = createElemDOM('div', 'filter-page');
    const topControlsPanel = createElemDOM('div', 'top-panel');
    const products = createElemDOM('section', 'products');

    topControlsPanel.append(this.sorter.element, this.searchBar);
    page.append(this.filterBlock, topControlsPanel, products);
    main.append(page);
    products.addEventListener('click', (e: Event) =>
      this.cartController.addToCart(e)
    );
    this.cartController.refreshTotalCount();
    this.cartController.refreshTotalSum();
    ProductsView.draw(this.data, this.cartController.cart);
  }

  private clear(): void {
    const main = document.querySelector('.main');
    if (!main) throw new Error("Can't find element with class 'main'");
    main.innerHTML = '';
  }

  private update() {
    console.log(this.data.length);
    const products = document.querySelector('.products');
    if (!products) throw new Error("Can't find element with class 'main'");
    products.innerHTML = '';
    ProductsView.draw(this.data, this.cartController.cart);
  }

  private createFiltersBlock(data: ProductData[]): HTMLElement {
    const container = createElemDOM('aside', 'filter-block');
    const categoriesBlock = createElemDOM('fieldset', 'filter-block_category');
    const brandsBlock = createElemDOM('fieldset', 'filter-block_brand');

    const categories = [...new Set(data.map((product) => product.category))];
    const brands = [...new Set(data.map((product) => product.brand))];

    categoriesBlock.append(
      ...this.createCheckboxBlock(
        categories,
        'Категории',
        'categories',
        'category'
      )
    );
    brandsBlock.append(
      ...this.createCheckboxBlock(brands, 'Бренды', 'brands', 'brand')
    );

    container.append(
      categoriesBlock,
      brandsBlock,
      this.priceSlider.el,
      this.stockSlider.el
    );
    return container;
  }

  private createCheckboxBlock(
    array: string[],
    title: string,
    prefix: string,
    filterType: string
  ): HTMLElement[] {
    const heading = createElemDOM('h3', 'filter-block_header', title);
    const items = array.map((item) => {
      const div = createElemDOM('div', `${prefix}-item`);
      const itemName = `${item[0].toUpperCase()}${item.slice(1)}`;
      const input = createElemDOM('input', `${prefix}-item_input`);
      const label = createElemDOM('label', `${prefix}-item_label`, itemName);
      input.dataset.type = filterType;
      input.setAttribute('type', 'checkbox');
      input.setAttribute('id', item);
      input.setAttribute('name', filterType);
      input.setAttribute('value', item);
      label.setAttribute('for', item);

      div.append(input, label);
      return div;
    });

    return [heading, ...items];
  }

  private setListeners(): void {
    this.filterBlock.addEventListener('click', (e) => this.applyFilters(e));
    this.filterBlock.addEventListener('change', (e) => this.applyFilters(e));
    this.searchBar.addEventListener('input', (e) => this.applyFilters(e));
    this.sorter.element.addEventListener('input', (e: Event) => {
      const target = e.target;
      if (!(target instanceof HTMLSelectElement)) return;

      this.sorter.sort(this.data);
      this.update();
    });
  }

  applyFilters(e: Event) {
    const target = e.target;

    if (!(target instanceof HTMLInputElement)) return;

    if (
      (target.type === Elements.textInput &&
        target.classList.contains('controls_input')) ||
      target.type === Elements.range
    ) {
      this.filter.setPriceRange();
      this.filter.setStockRange();
    }

    this.data = this.filter.filter();

    if (
      target.type === Elements.checkbox ||
      (target.type === Elements.textInput &&
        !target.classList.contains('controls_input'))
    ) {
      this.priceSlider.setRange(
        getMinValue(this.data, 'price'),
        getMaxValue(this.data, 'price')
      );
      this.stockSlider.setRange(
        getMinValue(this.data, 'stock'),
        getMaxValue(this.data, 'stock')
      );
    }

    this.sorter.sort(this.data);
    this.update();
  }
}
