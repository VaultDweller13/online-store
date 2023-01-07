export class Pagination<T> {
  elemsOnPage: number;
  private currPage: number;
  collection: T[];
  constructor(collection: T[]) {
    this.currPage = 1;
    this.elemsOnPage = 3;
    this.collection = collection;
  }
  setElemsOnPage(count: number) {
    if (count <= 0) return;
    this.elemsOnPage = count;
  }

  getPagesCount() {
    return Math.ceil(this.collection.length / this.elemsOnPage);
  }
  setCurrPage(page: number) {
    if (page <= 0 || page > this.getPagesCount()) return;
    this.currPage = page;
  }
  getCurrPage() {
    return this.currPage;
  }
  incPage(): number {
    console.log(this.getPagesCount());
    if (this.currPage + 1 > this.getPagesCount()) return this.currPage;
    this.currPage += 1;
    return this.currPage;
  }
  decPage(): number {
    if (this.currPage - 1 == 0) return this.currPage;
    this.currPage -= 1;
    return this.currPage;
  }
  getCurrPageColl() {
    let subCol = this.collection.slice(
      (this.currPage - 1) * this.elemsOnPage,
      this.currPage * this.elemsOnPage
    );
    if (subCol.length === 0) {
      this.setCurrPage(this.getPagesCount());
      subCol = this.collection.slice(
        (this.currPage - 1) * this.elemsOnPage,
        this.currPage * this.elemsOnPage
      );
    }

    return subCol;
  }
}
