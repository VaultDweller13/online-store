import { createElemDOM, getMinValue, getMaxValue } from '../utils/utils';
import { ProductsView } from './../components/view/product/productsView';
import '../assets/styles/pages/filterPage.scss';
import Filter from '../components/controller/filter';
import DualSlider from '../components/dualSlider/dualSlider';
import { Elements } from '../types/enums';

export class FilterPage {
  data: ProductData[];
  filterBlock: HTMLElement;
  filter: Filter;
  priceSlider: DualSlider;
  stockSlider: DualSlider;

  constructor(data: ProductData[]) {
    const maxPrice = getMaxValue(data, 'price');
    const minPrice = getMinValue(data, 'price');
    const maxStock = getMaxValue(data, 'stock');
    const minStock = getMinValue(data, 'stock');

    this.data = data;
    this.priceSlider = new DualSlider(
      'priceSlider',
      'Цена',
      'price',
      minPrice,
      maxPrice,
      minPrice,
      maxPrice
    );
    this.stockSlider = new DualSlider(
      'stockSlider',
      'Количество на складе',
      'stock',
      minStock,
      maxStock,
      minStock,
      maxStock
    );
    this.filterBlock = this.createFiltersBlock(data);
    this.filter = new Filter(data);

    // this.filter.setListener(this.filterBlock, (filteredData: ProductData[]) => {
    //   this.data = filteredData;
    //   this.draw();
    //   // this.update();
    // });

    this.filterBlock.addEventListener('click', (e) => {
      const target = e.target;
      if (!(target instanceof HTMLInputElement)) return;
      if (target.type !== Elements.checkbox) return;

      target.dataset.type === 'category'
        ? this.filter.setCategoryFilter()
        : this.filter.setBrandFilter();

      this.data = this.filter.filter();

      // this.draw();
      this.update();
    });

    this.filterBlock.addEventListener('change', (e) => {
      const target = e.target;
      if (!(target instanceof HTMLInputElement)) return;
      if (target.type !== Elements.textInput && target.type !== Elements.range)
        return;

      if (target.dataset.type === 'price') {
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
  }

  draw(): void {
    const main = document.querySelector('.main');
    if (!main) throw new Error("Can't find element with class 'main'");

    this.clear();

    const page = createElemDOM('div', 'filter-page');
    page.append(this.filterBlock, createElemDOM('section', 'products'));
    main.append(page);

    ProductsView.draw(this.data);
  }

  private update() {
    this.draw();

    this.priceSlider.setRange(
      getMinValue(this.data, 'price'),
      getMaxValue(this.data, 'price')
    );
    this.stockSlider.setRange(
      getMinValue(this.data, 'stock'),
      getMaxValue(this.data, 'stock')
    );
  }

  private clear() {
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
      createElemDOM('h3', 'filter-block_header', 'Категории'),
      ...categories.map((item) => {
        const itemName = `${item[0].toUpperCase()}${item.slice(1)}`;
        const div = createElemDOM('div', 'categories-item');
        const input = createElemDOM('input', 'categories-item_input');
        const label = createElemDOM('label', 'categories-item_label', itemName);
        input.dataset.type = 'category';
        input.setAttribute('type', 'checkbox');
        input.setAttribute('id', item);
        input.setAttribute('name', 'category');
        input.setAttribute('value', item);
        label.setAttribute('for', item);

        div.append(input, label);
        return div;
      })
    );

    brandsBlock.append(
      createElemDOM('h3', 'filter-block_header', 'Бренды'),
      ...brands.map((item) => {
        const itemName = `${item[0].toUpperCase()}${item.slice(1)}`;
        const div = createElemDOM('div', 'brands-item');
        const input = createElemDOM('input', 'brands-item_input', item);
        const label = createElemDOM('label', 'brands-item_label', itemName);
        input.dataset.type = 'brand';
        input.setAttribute('type', 'checkbox');
        input.setAttribute('id', item);
        input.setAttribute('name', 'brand');
        input.setAttribute('value', item);
        label.setAttribute('for', item);

        div.append(input, label);
        return div;
      })
    );

    container.append(
      categoriesBlock,
      brandsBlock,
      this.priceSlider.el,
      this.stockSlider.el
    );
    return container;
  }
}
