import { createElemDOM } from '../../utils/utils';
import './dual-slider.scss';

export default class DualSLiderFactory {
  name: string;
  min: number;
  max: number;
  slider: HTMLElement;
  minThumb: HTMLInputElement;
  maxThumb: HTMLInputElement;

  constructor(
    name: string,
    min: number,
    max: number,
    currentMin: number,
    currentMax: number
  ) {
    this.name = name;
    this.min = min;
    this.max = max;
    this.minThumb = document.createElement('input');
    this.maxThumb = document.createElement('input');
    this.minThumb.setAttribute('value', `${currentMin}`);
    this.maxThumb.setAttribute('value', `${currentMax}`);
    // this.maxThumb.value = currentMax.toString();
    this.slider = this.getSlider();
  }

  private getSlider(): HTMLElement {
    const container = createElemDOM('div', 'dual-slider');
    const slider = this.createSlider();
    const rangeContainer = createElemDOM('div', 'controls-container');
    const minRangeInput = this.createRangeInput();
    const maxRangeInput = this.createRangeInput();
    rangeContainer.append(minRangeInput, maxRangeInput);

    container.append(slider, rangeContainer);

    return container;
  }

  private createSlider(): HTMLElement {
    const slider = createElemDOM('fieldset', 'slider');
    this.minThumb.classList.add('slider_input', 'minThumb');
    this.maxThumb.classList.add('slider_input', 'maxThumb');

    [this.minThumb, this.maxThumb].forEach((input) => {
      input.setAttribute('type', 'range');
      input.setAttribute('min', `${this.min}`);
      input.setAttribute('max', `${this.max}`);
    });

    this.minThumb.id = `${this.name}_minThumb`;
    this.maxThumb.id = `${this.name}_maxThumb`;

    slider.append(this.minThumb, this.maxThumb);

    return slider;
  }

  private createRangeInput(): HTMLElement {
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
