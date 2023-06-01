import { createElemDOM } from "../../utils/utils";

export class Breadcrumbs{
    public static get(product: ProductData): HTMLElement {
      const {category, brand, title, id} = product;
      const container = createElemDOM('div', 'breadcrumbs');
      const sep = createElemDOM('span', 'breadcrumbs_sep', ' / ');

      const firstCrumb = createElemDOM('a', 'breadcrumbs_path', category.toLowerCase());
      const secondCrumb = createElemDOM('a', 'breadcrumbs_path', brand.toLowerCase());
      const thirdCrumb = createElemDOM('a', 'breadcrumbs_path', title.toLowerCase());
      firstCrumb.setAttribute('href', `/?categories=${category}`);
      secondCrumb.setAttribute('href', `/?categories=${category}&brands=${brand}`);
      thirdCrumb.setAttribute('href', `/product/${id}`);

      container.append(firstCrumb, sep, secondCrumb, sep.cloneNode(true), thirdCrumb)

      return container;
    }
}