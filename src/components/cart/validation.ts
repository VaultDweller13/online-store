import { maskMMYY, maskCard } from './../../utils/utils';
export class Validate {
  static isEmail(email: string): string {
    const regExp = /[a-zA-Z_\d\\.-]+@[a-zA-Z_\\-]+(\.[a-zA-Z]+){1,6}/;
    if (!regExp.test(email)) return 'Email is not valid';
    return '';
  }
  static isCredit(data: string): string {
    let rez = false;
    const numCard = data.replace(/\s/g, '');

    const regExp =
      /^(?:4\d{12}(?:\d{3}){0,2}|5[1-5]\d{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})|(?:(5018|5020|5038|5893|6304|6759|6761|6762|6763)\d{12,15})$/;
    if (regExp.test(numCard)) {
      const controlNum = +numCard.slice(-1);

      const stringCheck = numCard.slice(0, -1);
      const stringForCheck: number[] = stringCheck
        .split('')
        .reverse()
        .map((elem) => +elem);
      for (let i = 0; i < stringForCheck.length; i = i + 2) {
        stringForCheck[i] *= 2;
        stringForCheck[i] > 9 ? (stringForCheck[i] -= 9) : '';
      }
      rez =
        (stringForCheck.reduce((a, b) => +a + +b, 0) + controlNum) % 10 === 0;
    }
    return rez ? '' : 'Not valid credit number';
  }
  static isMMYY(value: string) {
    const regExp = /([0][1-9])|([1][0-2])\/[\d]{2}/;
    return regExp.test(value) ? '' : 'field is not correct';
  }
  static isEmpty(text: string) {
    return text.length ? '' : 'field is required';
  }
  static isName(name: string): string {
    const regExp = /[A-ZА-Яa-яa-z]{2,} [A-ZА-Яa-яa-z]{2,}/;
    return regExp.test(name)
      ? ''
      : 'The name and surname only have letters and the length of each is min 2 symbols ';
  }
  static isPhone(phone: string) {
    const regExp =
      /^\+?(\d{1,3})?[\s]*[- .]?[\s]*\(?(?:\d{2,3})\)?([\s]*[- .]?[\s]*\d{2,4}){2,4}$/;
    return regExp.test(phone) ? '' : 'The phone number is not valid';
  }
  static isAddress(address: string) {
    const regExp = /.*[\w]{5,}.*[\w]{5,}.*[\w]{5,}.*/;
    return regExp.test(address) ? '' : 'The address is not valid';
  }
  static isCVV(cvv: string) {
    const regExp = /\d{3}/;
    return regExp.test(cvv) ? '' : 'Minimum length is three numbers';
  }

  static validateAll(form: HTMLElement): boolean {
    let isValid = true;
    form.querySelectorAll('input').forEach((input) => {
      const isValidInput = Validate.checkInput(input);
      if (!isValidInput) isValid = false;
    });
    return isValid;
  }

  static checkInput(target: HTMLInputElement): boolean {
    const id = target.id;
    if (!id) throw new Error(`input ${target.toString()} has no id`);
    const errField = target
      .closest('.form__field')
      ?.querySelector('.input__error');
    let err: string;
    if (!(errField instanceof HTMLElement))
      throw new Error('errField not HTML Element');
    err = Validate.isEmpty(target.value);
    if (err) {
      errField.textContent = err;
    } else {
      switch (id) {
        case 'name':
          err = Validate.isName(target.value);
          errField.textContent = err;

          break;
        case 'tel':
          target.value = target.value.replace(/[^+\d]/, '');

          err = Validate.isPhone(target.value);
          errField.textContent = err;
          if (target.value.length < 10)
            errField.textContent = 'Phone number has minimum nine digits';
          break;
        case 'address':
          err = Validate.isAddress(target.value);
          errField.textContent = err;
          break;
        case 'email':
          err = Validate.isEmail(target.value);
          errField.textContent = err;
          break;
        case 'card':
          target.value = target.value.replace(/\D/, '');
          target.value = maskCard(target.value);
          err = Validate.isCredit(target.value);
          errField.textContent = err;
          break;
        case 'mmyy':
          target.value = maskMMYY(target.value);
          err = Validate.isMMYY(target.value);
          errField.textContent = err;

          break;
        case 'cvv':
          target.value = target.value.replace(/\D/, '');
          err = Validate.isCVV(target.value);
          errField.textContent = err;
          break;
      }
    }

    return err ? false : true;
  }
}
