// import { createElemDOM } from '../../utils/utils';
import { Colors } from '../../types/enums';
import './dual-slider.scss';
import DualSLiderFactory from './dualSliderFactory';

export default class DualSlider {
  static getSlider(
    name: string,
    min: number,
    max: number,
    currentMin: number,
    currentMax: number
  ) {
    const slider = new DualSLiderFactory(
      name,
      min,
      max,
      currentMin,
      currentMax
    );
    this.fillSlider(slider.minThumb, slider.maxThumb, slider.maxThumb);
    this.setToggleAccessible(slider, slider.maxThumb);
    this.setListener(slider);

    return slider.slider;
  }

  private static setListener(slider: DualSLiderFactory) {
    slider.minThumb.addEventListener('input', () => {
      this.processMinThumb(slider);
    });

    slider.maxThumb.addEventListener('input', () => {
      this.processMaxThumb(slider);
    });

    slider.minValueInput.addEventListener('input', () => {
      this.processMinValueInput(slider);
    });

    slider.maxValueInput.addEventListener('input', () => {
      this.processMaxValueInput(slider);
    });
  }

  private static fillSlider(
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

  private static processMinThumb(slider: DualSLiderFactory) {
    this.fillSlider(slider.minThumb, slider.maxThumb, slider.maxThumb);
    if (+slider.minThumb.value > +slider.maxThumb.value) {
      slider.minThumb.value = slider.maxThumb.value;
    }
    slider.minValueInput.value = slider.minThumb.value;
  }

  private static processMaxThumb(slider: DualSLiderFactory) {
    this.fillSlider(slider.minThumb, slider.maxThumb, slider.maxThumb);
    this.setToggleAccessible(slider, slider.maxThumb);
    if (+slider.maxThumb.value < +slider.minThumb.value) {
      slider.maxThumb.value = slider.minThumb.value;
    }
    slider.maxValueInput.value = slider.maxThumb.value;
  }

  private static processMinValueInput(slider: DualSLiderFactory) {
    if (+slider.minValueInput.value > +slider.maxValueInput.value) {
      slider.minValueInput.value = slider.maxValueInput.value;
    }

    slider.minThumb.value = slider.minValueInput.value;
    this.fillSlider(slider.minThumb, slider.maxThumb, slider.maxThumb);
  }

  private static processMaxValueInput(slider: DualSLiderFactory) {
    if (+slider.maxValueInput.value < +slider.minValueInput.value) {
      slider.maxValueInput.value = slider.minValueInput.value;
    }

    slider.maxThumb.value = slider.maxValueInput.value;
    this.fillSlider(slider.minThumb, slider.maxThumb, slider.maxThumb);
  }

  private static setToggleAccessible(
    slider: DualSLiderFactory,
    currentTarget: HTMLInputElement
  ) {
    if (+currentTarget.value <= 0) {
      slider.maxThumb.style.zIndex = '2';
    } else {
      slider.maxThumb.style.zIndex = '0';
    }
  }
}
