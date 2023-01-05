import { CartController } from './../components/controller/cartController';
import { createElemDOM } from '../utils/utils';
import { ProductsView } from './../components/view/product/productsView';
import '../assets/styles/pages/filterPage.scss';
import Filter from '../components/controller/filter';

export class FilterPage {
  data: ProductData[];
  filterBlock: HTMLElement;
  filter: Filter;
  cartController: CartController;

  constructor(data: ProductData[], cartController: CartController) {
    this.data = data;
    this.filterBlock = this.createFiltersBlock(data);
    this.filter = new Filter(data);
    this.filter.setListener(this.filterBlock, (filteredData: ProductData[]) => {
      this.data = filteredData;
      this.draw();
    });
    this.cartController = cartController;
  }

  draw(): void {
    const main = document.querySelector('.main');
    if (!main) throw new Error("Can't find element with class 'main'");

    this.clear();

    const page = createElemDOM('div', 'filter-page');
    const products = createElemDOM('section', 'products');
    page.append(this.filterBlock, products);
    main.append(page);
    products.addEventListener('click', (e: Event) =>
      this.cartController.addToCart(e)
    );
    this.cartController.refreshTotalCount();
    this.cartController.refreshTotalSum();
    ProductsView.draw(this.data, this.cartController.cart);
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
        input.setAttribute('type', 'checkbox');
        input.setAttribute('id', item);
        input.setAttribute('name', 'brand');
        input.setAttribute('value', item);
        label.setAttribute('for', item);

        div.append(input, label);
        return div;
      })
    );

    container.append(categoriesBlock, brandsBlock);
    return container;
  }
}
