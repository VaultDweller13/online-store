import { createElemDOM } from '../../utils/utils';
import '../../assets/styles/pages/modal.scss';
export class DialogView {
  static draw(content: HTMLElement): void {
    const container = document.querySelector('.body');
    if (!container) throw new Error("Can't find element with class 'products'");

    const modal = createElemDOM('div', 'dialog');
    const dialogContent = createElemDOM('div', 'dialog__content');
    dialogContent.append(content);
    modal.append(dialogContent);
    modal.addEventListener('click', (e: Event) => {
      if (!e.target || !e.currentTarget) return;
      if (!(<HTMLElement>e.target).classList.contains('dialog')) return;

      DialogView.close();
    });
    container.append(modal);
  }
  static close(callBack?: () => void): void {
    if (callBack) callBack();
    const modal = document.querySelector('.dialog');
    if (!modal) throw new Error("Can't find element with class 'modal'");
    modal.remove();
  }
}
