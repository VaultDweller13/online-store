import { createElemDOM } from '../../utils/utils';
import './dual-slider.scss';

export default class DualSliderFactory {
  name: string;
  min: number;
  max: number;
  slider: HTMLElement;
  minThumb: HTMLInputElement;
  maxThumb: HTMLInputElement;
  currentMin: number;
  currentMax: number;
  minValueInput: HTMLInputElement;
  maxValueInput: HTMLInputElement;

  constructor(
    name: string,
    heading: string,
    dataAttr: string,
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
    this.currentMin = currentMin;
    this.currentMax = currentMax;
    this.slider = this.getSlider(heading, dataAttr);
    const textInputs = Array.from(
      this.slider.querySelectorAll('.controls_input')
    );
    this.minValueInput = textInputs[0] as HTMLInputElement;
    this.maxValueInput = textInputs[1] as HTMLInputElement;
  }

  private getSlider(heading: string, dataAttr: string): HTMLElement {
    const container = createElemDOM('div', 'dual-slider');
    const h3 = createElemDOM('h3', 'dual-slider_heading', heading);
    const slider = this.createSlider(dataAttr);
    const rangeContainer = createElemDOM('div', 'controls-container');
    const minRangeInput = this.createRangeInput('От', this.currentMin);
    const maxRangeInput = this.createRangeInput('До', this.currentMax);
    rangeContainer.append(minRangeInput, maxRangeInput);

    container.append(h3, slider, rangeContainer);

    return container;
  }

  private createSlider(dataAttr: string): HTMLElement {
    const slider = createElemDOM('fieldset', 'slider');
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
    this.minThumb.setAttribute('value', `${this.currentMin}`);
    this.maxThumb.setAttribute('value', `${this.currentMax}`);

    slider.append(this.minThumb, this.maxThumb);

    return slider;
  }

  private createRangeInput(labelText: string, value: number): HTMLElement {
    const fieldset = createElemDOM('fieldset', 'controls');
    const label = createElemDOM('label', 'controls_label', labelText);
    const input = createElemDOM('input', 'controls_input');

    input.setAttribute('type', 'text');
    input.setAttribute('value', `${value}`);

    label.append(input);
    fieldset.append(label);

    return fieldset;
  }
}
