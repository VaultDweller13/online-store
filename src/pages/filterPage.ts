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
  filterBlock: HTMLElement;
  filter: Filter;
  cartController: CartController;
  priceSlider: DualSlider;
  stockSlider: DualSlider;
  sorter: Sorter;

  constructor(data: ProductData[], cartController: CartController) {
    this.data = data;
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
    this.sorter = new Sorter(data);

    this.setListeners();
  }

  public draw(): void {
    const main = document.querySelector('.main');
    if (!main) throw new Error("Can't find element with class 'main'");

    this.clear();

    const page = createElemDOM('div', 'filter-page');
    const products = createElemDOM('section', 'products');

    page.append(
      this.filterBlock,
      this.sorter.element,
      createElemDOM('section', 'products')
    );
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

  private createFiltersBlock(data: ProductData[]): HTMLElement {
    const container = createElemDOM('aside', 'filter-block');
    const categoriesBlock = createElemDOM('fieldset', 'filter-block_category');
    const brandsBlock = createElemDOM('fieldset', 'filter-block_brand');

    const categories = Array.from(
      new Set(data.map((product) => product.category))
    );
    const brands = Array.from(new Set(data.map((product) => product.brand)));

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
    this.filterBlock.addEventListener('click', (e) => {
      const target = e.target;
      if (!(target instanceof HTMLInputElement)) return;
      if (target.type !== Elements.checkbox) return;

      target.dataset.type === 'category'
        ? this.filter.setCategoryFilter()
        : this.filter.setBrandFilter();

      this.data = this.filter.filter();

      this.priceSlider.setRange(
        getMinValue(this.data, 'price'),
        getMaxValue(this.data, 'price')
      );
      this.stockSlider.setRange(
        getMinValue(this.data, 'stock'),
        getMaxValue(this.data, 'stock')
      );
      this.draw();
    });

    this.filterBlock.addEventListener('change', (e) => {
      const target = e.target;
      if (!(target instanceof HTMLInputElement)) return;
      if (target.type !== Elements.textInput && target.type !== Elements.range)
        return;

      if (target.dataset.type === 'price') {
        console.log('price');
        this.filter.setPriceFilter();
        this.data = this.filter.filter();
        this.stockSlider.setRange(
          getMinValue(this.data, 'stock'),
          getMaxValue(this.data, 'stock')
        );
      } else {
        this.filter.setStockFilter();
        this.data = this.filter.filter();
        this.priceSlider.setRange(
          getMinValue(this.data, 'price'),
          getMaxValue(this.data, 'price')
        );
      }

      this.draw();
    });

    this.sorter.setListener((sortedData: ProductData[]) => {
      this.data = sortedData;
      this.draw();
    });
  }
}
