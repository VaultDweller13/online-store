import { CartController } from './../components/controller/cartController';
import { createElemDOM, getMinValue, getMaxValue } from '../utils/utils';
import { ProductsView } from './../components/view/product/productsView';
import '../assets/styles/pages/filterPage.scss';
import Filter from '../components/filter/filter';
import DualSlider from '../components/filter/dualSlider/dualSlider';
import { Elements } from '../types/enums';
import { Sorter } from '../components/filter/sorter';
import FilterPageRouter from '../components/controller/filterPageRouter';

export class FilterPage {
  data: ProductData[];
  filteredData: ProductData[];
  buttonsBlock: HTMLElement;
  filterBlock: HTMLElement;
  filter: Filter;
  cartController: CartController;
  priceSlider: DualSlider;
  stockSlider: DualSlider;
  sorter: Sorter;
  searchBar: HTMLElement;
  viewSwitcher: HTMLElement;
  router: FilterPageRouter;
  productsHTML: HTMLElement;

  constructor(data: ProductData[], cartController: CartController) {
    this.data = data;
    this.router = new FilterPageRouter();
    this.filteredData = data;
    this.priceSlider = new DualSlider(
      'priceSlider',
      'Price',
      'price',
      getMinValue(data, 'price'),
      getMaxValue(data, 'price')
    );
    this.stockSlider = new DualSlider(
      'stockSlider',
      'Stock',
      'stock',
      getMinValue(data, 'stock'),
      getMaxValue(data, 'stock')
    );
    this.buttonsBlock = this.createResetCopyButtons();
    this.filterBlock = this.createFiltersBlock(data);
    this.filter = new Filter(data);

    this.cartController = cartController;
    this.sorter = new Sorter();
    this.searchBar = this.filter.searchBar.element;
    this.viewSwitcher = this.createViewSwitcher();
    this.productsHTML = createElemDOM('section', 'products');

    this.setListeners();
  }

  public draw(): void {
    const main = document.querySelector('.main');
    if (!main) throw new Error("Can't find element with class 'main'");

    this.clear();

    const page = createElemDOM('div', 'filter-page');
    const topControlsPanel = createElemDOM('div', 'top-panel');
    // const wrapper = createElemDOM('div', 'content-wrapper');
    const products = this.productsHTML;

    topControlsPanel.append(
      this.sorter.element,
      this.searchBar,
      this.viewSwitcher
    );
    // wrapper.append(topControlsPanel, products);
    page.append(this.filterBlock, topControlsPanel, products);
    main.append(page);

    this.cartController.refreshTotalCount();
    this.cartController.refreshTotalSum();

    this.restoreInputs();
    this.data = this.filter.filter();
    this.sorter.sort(this.data);
    ProductsView.draw(this.data, this.cartController.cart);
    ProductsView.setView();
  }

  private clear(): void {
    const main = document.querySelector('.main');
    if (!main) throw new Error("Can't find element with class 'main'");
    main.innerHTML = '';
  }

  private update() {
    const products = document.querySelector('.products');
    if (!products) throw new Error("Can't find element with class 'main'");
    products.innerHTML = '';
    this.sorter.sort(this.data);
    ProductsView.draw(this.data, this.cartController.cart);
    ProductsView.setView();
  }

  private createFiltersBlock(data: ProductData[]): HTMLElement {
    const container = createElemDOM('aside', 'filter-block');
    const categoriesBlock = createElemDOM('div', 'filter-block-container');
    const categoriesFieldset = createElemDOM(
      'fieldset',
      'filter-block_category'
    );
    const categoriesHeading = createElemDOM(
      'h3',
      'filter-block_heading',
      'Categories'
    );
    const brandsBlock = createElemDOM('div', 'filter-block-container');
    const brandsFieldset = createElemDOM('fieldset', 'filter-block_brand');
    const brandsHeading = createElemDOM('h3', 'filter-block_heading', 'Brands');

    const categories = [...new Set(data.map((product) => product.category))];
    const brands = [...new Set(data.map((product) => product.brand))];

    categoriesFieldset.append(
      ...this.createCheckboxBlock(categories, 'categories', 'category')
    );
    brandsFieldset.append(
      ...this.createCheckboxBlock(brands, 'brands', 'brand')
    );

    categoriesBlock.append(categoriesHeading, categoriesFieldset);
    brandsBlock.append(brandsHeading, brandsFieldset);

    container.append(
      this.buttonsBlock,
      categoriesBlock,
      brandsBlock,
      this.priceSlider.el,
      this.stockSlider.el
    );
    return container;
  }

  private createCheckboxBlock(
    array: string[],
    prefix: string,
    filterType: string
  ): HTMLElement[] {
    const items = array.map((item) => {
      const itemName = `${item[0].toUpperCase()}${item.slice(1)}`;
      const input = createElemDOM('input', `${prefix}-item_input`);
      const label = createElemDOM(
        'label',
        `${prefix}-item_label checkbox-container`,
        itemName
      );
      const box = createElemDOM('span', 'checkbox');
      input.dataset.type = filterType;
      input.setAttribute('type', 'checkbox');
      input.setAttribute('id', item);
      input.setAttribute('name', filterType);
      input.setAttribute('value', item);
      label.setAttribute('for', item);

      label.append(input, box);
      return label;
    });

    return items;
  }

  private createViewSwitcher(): HTMLElement {
    const container = createElemDOM('div', 'switch-view');
    const listView = createElemDOM(
      'div',
      'switch-view_button switch-view_list'
    );
    const gridView = createElemDOM(
      'div',
      'switch-view_button switch-view_grid view-active'
    );

    listView.dataset.type = 'list';
    gridView.dataset.type = 'grid';

    container.append(listView, gridView);
    return container;
  }

  private setListeners(): void {
    this.filterBlock.addEventListener('click', (e) => this.applyFilters(e));
    this.filterBlock.addEventListener('change', (e) => this.applyFilters(e));
    this.searchBar.addEventListener('input', (e) => this.applyFilters(e));
    this.sorter.element.addEventListener('input', (e) => {
      const target = e.target;
      if (!(target instanceof HTMLSelectElement)) return;

      this.sorter.sort(this.data);
      this.update();
      this.router.setSorting();
    });

    this.viewSwitcher.addEventListener('click', (e) => {
      const target = e.target;
      if (!(target instanceof HTMLElement)) return;

      const listButton = document.querySelector('.switch-view_list');
      const gridButton = document.querySelector('.switch-view_grid');

      if (target === listButton || target === gridButton) {
        const productCards = document.querySelectorAll('.card');

        productCards.forEach((card) => {
          card.classList.toggle('card-big');
          card.classList.toggle('card-small');
        });
        listButton?.classList.remove('view-active');
        gridButton?.classList.remove('view-active');
        target.classList.add('view-active');

        this.router.setView();
      }
    });

    this.buttonsBlock.addEventListener('click', (e) => {
      const target = e.target;

      if (!(target instanceof HTMLButtonElement)) return;

      if (target.dataset.type === 'reset') {
        this.router.resetURL();
        this.router.getQueryString();
        this.restoreInputs();
        this.data = this.filter.filter();
        this.update();
      } else if (target.dataset.type === 'copy') {
        this.router.copyURL();
      }
    });
    this.productsHTML.addEventListener('click', (e: Event) => {
      console.log('fdfd');
      this.cartController.addToCart(e);
    });
  }

  private applyFilters(e: Event) {
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

    if (target.dataset.type === 'category') this.router.setCategories();
    if (target.dataset.type === 'brand') this.router.setBrands();
    if (target.dataset.type === 'price') this.router.setPrice();
    if (target.dataset.type === 'stock') this.router.setStock();
    if (target.dataset.type === 'search') this.router.setSearch();

    this.update();
  }

  private restoreInputs(): void {
    const categories = this.router.getValues('categories');
    const brands = this.router.getValues('brands');
    const price = this.router.getValues('price');
    const stock = this.router.getValues('stock');
    const search = this.router.getValues('search');
    const isListView = this.router.getView();
    const sorting = this.router.getSorting();

    const categoriesInputs = [
      ...document.querySelectorAll('.categories-item_input'),
    ];
    const brandsInputs = [...document.querySelectorAll('.brands-item_input')];

    categoriesInputs.forEach((input) => {
      if (input instanceof HTMLInputElement) {
        if (categories?.includes(input.value.toLowerCase())) {
          input.checked = true;
        } else input.checked = false;
      }
    });

    brandsInputs.forEach((input) => {
      if (input instanceof HTMLInputElement) {
        if (brands?.includes(input.value.toLowerCase())) {
          input.checked = true;
        } else input.checked = false;
      }
    });

    this.priceSlider.reset();
    this.stockSlider.reset();
    this.priceSlider.setRange(+price[0], +price[1]);
    this.filter.setPriceRange();
    this.stockSlider.setRange(+stock[0], +stock[1]);
    this.filter.setStockRange();

    this.filter.searchBar.setInput(search[0]);

    const gridButton = document.querySelector('.switch-view_grid');
    const listButton = document.querySelector('.switch-view_list');

    if (isListView) {
      listButton?.classList.add('view-active');
      gridButton?.classList.remove('view-active');
    } else {
      listButton?.classList.remove('view-active');
      gridButton?.classList.add('view-active');
    }

    this.sorter.setValue(sorting);
  }

  private createResetCopyButtons(): HTMLElement {
    const container = createElemDOM('div', 'reset-block');
    const resetButton = createElemDOM(
      'button',
      'button-reset button',
      'Reset filters'
    );
    const copyButton = createElemDOM(
      'button',
      'button-reset button',
      'Copy filters'
    );

    resetButton.dataset.type = 'reset';
    copyButton.dataset.type = 'copy';

    container.append(resetButton, copyButton);

    return container;
  }
}
