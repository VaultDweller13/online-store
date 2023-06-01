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
    this.btnInc = createElemDOM('button', 'button button_paginInc');
    this.btnDec = createElemDOM('button', 'button button_paginDec');
    this.elemsOnPage = this.createElemsOnPage();
    this.currPage = createElemDOM(
      'p',
      'pagin__page',
      pagination.getCurrPage().toString()
    );
    this.setListeners();
  }

  draw() {
    const pagin = createElemDOM('div', 'pagin__menu');
    pagin.append(createElemDOM('h2', 'h2', 'Products in Cart'));
    pagin.append(createElemDOM('p', 'text', 'Limit:'));
    const page = createElemDOM('p', 'text', 'Page:');

    pagin.append(
      this.elemsOnPage,
      page,
      this.btnDec,
      this.currPage,
      this.btnInc
    );
    return pagin;
  }
  private setListeners() {
    this.btnDec.addEventListener('click', () => {
      this.currPage.textContent = this.pagination.decPage().toString();

      CartView.draw(
        this.pagination.getCurrPageColl(),
        this.pagination.getPreviosNumber()
      );
    });
    this.btnInc.addEventListener('click', () => {
      console.log('inc');
      const currPageVal = this.pagination.incPage();
      this.currPage.textContent = currPageVal.toString();
      CartView.draw(
        this.pagination.getCurrPageColl(),
        this.pagination.getPreviosNumber()
      );
    });
    this.elemsOnPage.addEventListener('change', (e: Event) => {
      this.pagination.setElemsOnPage(
        Number((<HTMLInputElement>e.target).value)
      );
      CartView.draw(
        this.pagination.getCurrPageColl(),
        this.pagination.getPreviosNumber()
      );
    });
  }
  createElemsOnPage(): HTMLInputElement {
    const elem = createElemDOM('input', 'input pagin__input');
    if (!(elem instanceof HTMLInputElement))
      throw new Error("Couldn't create input element");
    elem.type = 'number';
    elem.value = this.pagination.elemsOnPage.toString();
    return elem;
  }
}
