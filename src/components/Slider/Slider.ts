import {SliderOptionsType, SlideType} from "./SliderTypes";
import './css/styles.css'
import {sliderStart} from "./startSlider";

export default class Slider{

    slides: Array<SlideType>;
    options: SliderOptionsType;

    constructor(slides: Array<SlideType>, options: SliderOptionsType) {
        this.slides = slides;
        this.options = options;
    }

    createArrow(side: string) {
        const arrow = document.createElement('div');
        arrow.classList.add('arrow', `${side}-arrow`);
        return arrow;
    }

    createWrapper(className: string) {
        const wrapper = document.createElement('div');
        wrapper.classList.add(`${className}`);
        return wrapper;
    }

    createSlidesBlock(slidesOnScreen: number) {
        const sliderWrapper = document.createElement('div');
        sliderWrapper.classList.add('slides-block');
        slidesOnScreen && sliderWrapper.classList.add(`width-${slidesOnScreen}-${this.options.slideWidth}`)
        return sliderWrapper;
    }

    renderSlide(title: string, text: string) {
        const slide = document.createElement('div');
        const slideContent = `<h2>${title}</h2> <p>${text}</p>`
        slide.classList.add('slide', `width-${this.options.slideWidth}`, `height-${this.options.slideHeight}`);
        slide.innerHTML += slideContent;
        return slide
    }

    renderSlides(element: HTMLElement) {
        const slidesBlock = this.createSlidesBlock(this.options.slidesOnScreen);
        const sliderLine = this.createWrapper('slider-line');
        const sliderWrapper = this.createWrapper('slider-wrapper');
        const leftArrow = this.createArrow('left');
        const rightArrow = this.createArrow('right');

        this.slides.forEach(slide => slidesBlock.append(this.renderSlide(slide.title, slide.text)));

        sliderLine.append(slidesBlock);
        sliderWrapper.append(leftArrow)
        sliderWrapper.append(sliderLine);
        sliderWrapper.append(rightArrow);
        element.append(sliderWrapper);

        sliderStart(slidesBlock, {left: leftArrow, right: rightArrow}, this.options);
    }

}
