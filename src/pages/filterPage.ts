import { createElemDOM } from '../utils/utils';
import { ProductsView } from './../components/view/product/productsView';
import '../assets/styles/pages/filterPage.scss';

export class FilterPage {
  draw(data: ProductData[]): void {
    const main = document.querySelector('.main');
    if (!main) throw new Error("Can't find element with class 'main'");

    main.innerHTML = '';
    const page = createElemDOM('div', 'filter-page');
    page.append(
      this.createFiltersBlock(data),
      createElemDOM('section', 'products')
    );
    main.append(page);

    ProductsView.draw(data);
  }

  private createFiltersBlock(data: ProductData[]) {
    const container = createElemDOM('aside', 'filter-block');
    const categoriesBlock = createElemDOM('fieldset', 'filter-block_category');
    const brandsBlock = createElemDOM('fieldset', 'filter-block_brand');

    const categories = Array.from(
      new Set(data.map((product) => product.category))
    );
    const brands = Array.from(new Set(data.map((product) => product.brand)));

    categoriesBlock.append(
      ...categories.map((item) => {
        const itemName = `${item[0].toUpperCase()}${item.slice(1)}`;
        const div = createElemDOM('div', 'categories-item');
        const input = createElemDOM('input', 'categories-item_input');
        const label = createElemDOM('label', 'categories-item_label', itemName);
        input.setAttribute('type', 'checkbox');
        input.setAttribute('id', item);
        label.setAttribute('for', item);

        div.append(input, label);
        return div;
      })
    );

    brandsBlock.append(
      ...brands.map((item) => {
        const itemName = `${item[0].toUpperCase()}${item.slice(1)}`;
        const div = createElemDOM('div', 'brands-item');
        const input = createElemDOM('input', 'brands-item_input', item);
        const label = createElemDOM('label', 'brands-item_label', itemName);
        input.setAttribute('type', 'checkbox');
        input.setAttribute('id', item);
        label.setAttribute('for', item);

        div.append(input, label);
        return div;
      })
    );

    container.append(categoriesBlock, brandsBlock);
    return container;
  }
}
