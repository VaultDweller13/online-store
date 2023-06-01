import { createElemDOM } from '../../../utils/utils';
import './dual-slider.scss';

export default class DualSliderFactory {
  name: string;
  min: number;
  max: number;
  slider: HTMLElement;
  minThumb: HTMLInputElement;
  maxThumb: HTMLInputElement;
  minValueInput: HTMLInputElement;
  maxValueInput: HTMLInputElement;

  constructor(
    name: string,
    heading: string,
    dataAttr: string,
    min: number,
    max: number
  ) {
    this.name = name;
    this.min = min;
    this.max = max;
    this.minThumb = document.createElement('input');
    this.maxThumb = document.createElement('input');
    this.slider = this.getSlider(heading, dataAttr);
    const textInputs = Array.from(
      this.slider.querySelectorAll('.controls_input')
    );
    this.minValueInput = textInputs[0] as HTMLInputElement;
    this.maxValueInput = textInputs[1] as HTMLInputElement;
  }

  private getSlider(heading: string, dataAttr: string): HTMLElement {
    const container = createElemDOM('div', 'dual-slider-container');
    const fieldset = createElemDOM('fieldset', 'dual-slider');
    const h3 = createElemDOM('h3', 'dual-slider_heading', heading);
    const slider = this.createSlider(dataAttr);
    const rangeContainer = createElemDOM('div', 'controls-container');
    const minRangeInput = this.createRangeInput('From', dataAttr, this.min);
    const maxRangeInput = this.createRangeInput('To', dataAttr, this.max);
    rangeContainer.append(minRangeInput, maxRangeInput);

    fieldset.append(slider, rangeContainer);
    container.append(h3, fieldset);

    return container;
  }

  private createSlider(dataAttr: string): HTMLElement {
    const slider = createElemDOM('div', 'slider');
    this.minThumb.classList.add('slider_input', 'minThumb');
    this.maxThumb.classList.add('slider_input', 'maxThumb');

    [this.minThumb, this.maxThumb].forEach((input) => {
      input.dataset.type = dataAttr;
      input.setAttribute('type', 'range');
      input.setAttribute('min', `${this.min}`);
      input.setAttribute('max', `${this.max}`);
    });

    this.minThumb.id = `${this.name}_minThumb`;
    this.maxThumb.id = `${this.name}_maxThumb`;
    this.minThumb.setAttribute('value', `${this.min}`);
    this.maxThumb.setAttribute('value', `${this.max}`);

    slider.append(this.minThumb, this.maxThumb);

    return slider;
  }

  private createRangeInput(
    labelText: string,
    dataAttr: string,
    value: number
  ): HTMLElement {
    const div = createElemDOM('div', 'controls');
    const label = createElemDOM('label', 'controls_label', labelText);
    const input = createElemDOM('input', 'controls_input');
    input.dataset.type = dataAttr;

    input.setAttribute('type', 'text');
    input.setAttribute('value', `${value}`);

    label.append(input);
    div.append(label);

    return div;
  }
}
