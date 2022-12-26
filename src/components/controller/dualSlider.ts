import { createElemDOM } from '../../utils/utils';
import '../../assets/styles/components/dual-slider.scss';

export default class DualSLider {
  // // parent: HTMLElement;
  // min: number;
  // max: number;

  // constructor(min: number, max: number) {
  //   // this.parent = parent;
  //   this.min = min;
  //   this.max = max;
  // }

  static getSlider(min: number, max: number): HTMLElement {
    const container = createElemDOM('div', 'dual-slider');
    const slider = this.createSlider(min, max);
    const rangeContainer = createElemDOM('div', 'controls-container');
    const minRangeInput = this.createRangeInput();
    const maxRangeInput = this.createRangeInput();
    rangeContainer.append(minRangeInput, maxRangeInput);

    container.append(slider, rangeContainer);

    return container;
  }

  private static createSlider(min: number, max: number): HTMLElement {
    const slider = createElemDOM('fieldset', 'slider');
    const fromInput = createElemDOM('input', 'slider_input from-slider');
    const toInput = createElemDOM('input', 'slider_input to-slider');

    [fromInput, toInput].forEach((input) => {
      input.setAttribute('type', 'range');
      input.setAttribute('min', `${min}`);
      input.setAttribute('max', `${max}`);
    });

    slider.append(fromInput, toInput);

    return slider;
  }

  private static createRangeInput(): HTMLElement {
    const fieldset = createElemDOM('fieldset', 'controls');
    const label = createElemDOM('label', 'controls_label');
    const input = createElemDOM('input', 'controls_input');

    input.setAttribute('type', 'number');
    input.setAttribute('min', 'this.min');
    input.setAttribute('max', 'this.max');

    label.append(input);
    fieldset.append(label);

    return fieldset;
  }
}
