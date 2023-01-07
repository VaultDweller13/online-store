import { CartView } from './cartView';
import { Pagination } from './../../cart/pagination';
import { createElemDOM } from './../../../utils/utils';
export class PaginationView {
  btnInc: HTMLElement;
  btnDec: HTMLElement;
  elemsOnPage: HTMLInputElement;
  currPage: HTMLElement;
  pagination: Pagination<CartProduct>;
  constructor(pagination: Pagination<CartProduct>) {
    this.pagination = pagination;
    this.btnInc = createElemDOM('button', 'button button_paginInc', '+');
    this.btnDec = createElemDOM('button', 'button button_paginDec', '-');
    this.elemsOnPage = this.createElemsOnPage();
    this.currPage = createElemDOM(
      'p',
      'pagin__page',
      pagination.getCurrPage().toString()
    );
    this.setListeners();
  }

  draw() {
    const pagin = createElemDOM('div', '');

    pagin.append(this.elemsOnPage, this.btnDec, this.currPage, this.btnInc);
    return pagin;
  }
  private setListeners() {
    this.btnDec.addEventListener('click', () => {
      this.currPage.textContent = this.pagination.decPage().toString();

      CartView.draw(this.pagination.getCurrPageColl());
    });
    this.btnInc.addEventListener('click', () => {
      console.log('inc');
      const currPageVal = this.pagination.incPage();
      this.currPage.textContent = currPageVal.toString();
      CartView.draw(this.pagination.getCurrPageColl());
    });
    this.elemsOnPage.addEventListener('change', (e: Event) => {
      this.pagination.setElemsOnPage(
        Number((<HTMLInputElement>e.target).value)
      );
      CartView.draw(this.pagination.getCurrPageColl());
    });
  }
  createElemsOnPage(): HTMLInputElement {
    const elem = createElemDOM('input', '');
    if (!(elem instanceof HTMLInputElement))
      throw new Error("Couldn't create input element");
    return elem;
  }
}
