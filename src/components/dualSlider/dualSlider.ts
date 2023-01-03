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
      this.processMinThumb(slider.minThumb, slider.maxThumb);
    });

    slider.maxThumb.addEventListener('input', () => {
      this.processMaxThumb(slider, slider.minThumb, slider.maxThumb);
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

  private static processMinThumb(
    minThumb: HTMLInputElement,
    maxThumb: HTMLInputElement
  ) {
    this.fillSlider(minThumb, maxThumb, maxThumb);
    if (+minThumb.value > +maxThumb.value) {
      minThumb.value = maxThumb.value;
    }
  }

  private static processMaxThumb(
    slider: DualSLiderFactory,
    minThumb: HTMLInputElement,
    maxThumb: HTMLInputElement
  ) {
    this.fillSlider(minThumb, maxThumb, maxThumb);
    this.setToggleAccessible(slider, maxThumb);
    if (+maxThumb.value < +minThumb.value) {
      maxThumb.value = minThumb.value;
    }
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
