import { Colors } from '../../types/enums';
import './dual-slider.scss';
import DualSliderFactory from './dualSliderFactory';

export default class DualSlider {
  el: HTMLElement;
  minThumb: HTMLInputElement;
  maxThumb: HTMLInputElement;
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
    const slider = new DualSliderFactory(
      name,
      heading,
      dataAttr,
      min,
      max,
      currentMin,
      currentMax
    );
    this.el = slider.slider;
    this.minThumb = slider.minThumb;
    this.maxThumb = slider.maxThumb;
    this.minValueInput = slider.minValueInput;
    this.maxValueInput = slider.maxValueInput;

    this.fillSlider(this.minThumb, this.maxThumb, this.maxThumb);
    this.setToggleAccessible(this.maxThumb);
    this.setListeners();
  }

  setRange(min: number, max: number) {
    this.minThumb.value = min.toString();
    this.maxThumb.value = max.toString();

    this.processMinThumb();
    this.processMaxThumb();
  }

  private setListeners() {
    this.minThumb.addEventListener('input', () => {
      this.processMinThumb();
    });

    this.maxThumb.addEventListener('input', () => {
      this.processMaxThumb();
    });

    this.minValueInput.addEventListener('input', () => {
      this.processMinValueInput();
    });

    this.maxValueInput.addEventListener('input', () => {
      this.processMaxValueInput();
    });
  }

  private fillSlider(
    start: HTMLInputElement,
    end: HTMLInputElement,
    currentTopSlider: HTMLInputElement
  ) {
    const distance = +end.max - +end.min;
    const startPosition = +start.value - +end.min;
    const endPosition = +end.value - +end.min;

    currentTopSlider.style.background = `linear-gradient(
      to right,
      ${Colors.sliderDefault} 0%,
      ${Colors.sliderDefault} ${(startPosition / distance) * 100}%,
      ${Colors.sliderRange} ${(startPosition / distance) * 100}%,
      ${Colors.sliderRange} ${(endPosition / distance) * 100}%, 
      ${Colors.sliderDefault} ${(endPosition / distance) * 100}%, 
      ${Colors.sliderDefault} 100%)`;
  }

  private processMinThumb() {
    this.fillSlider(this.minThumb, this.maxThumb, this.maxThumb);
    if (+this.minThumb.value > +this.maxThumb.value) {
      this.minThumb.value = this.maxThumb.value;
    }
    this.minValueInput.value = this.minThumb.value;
  }

  private processMaxThumb() {
    this.fillSlider(this.minThumb, this.maxThumb, this.maxThumb);
    this.setToggleAccessible(this.maxThumb);
    if (+this.maxThumb.value < +this.minThumb.value) {
      this.maxThumb.value = this.minThumb.value;
    }
    this.maxValueInput.value = this.maxThumb.value;
  }

  private processMinValueInput() {
    if (+this.minValueInput.value > +this.maxValueInput.value) {
      this.minThumb.value = this.maxThumb.value;
    } else {
      this.minThumb.value = this.minValueInput.value;
    }

    this.fillSlider(this.minThumb, this.maxThumb, this.maxThumb);
  }

  private processMaxValueInput() {
    if (+this.maxValueInput.value < +this.minValueInput.value) {
      this.maxThumb.value = this.minThumb.value;
    } else {
      this.maxThumb.value = this.maxValueInput.value;
    }

    this.fillSlider(this.minThumb, this.maxThumb, this.maxThumb);
  }

  private setToggleAccessible(currentTarget: HTMLInputElement) {
    if (+currentTarget.value <= 0) {
      this.maxThumb.style.zIndex = '2';
    } else {
      this.maxThumb.style.zIndex = '0';
    }
  }
}
