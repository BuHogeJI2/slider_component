import {SlideType} from "./SliderTypes";
import './css/styles.css'
import {sliderStart} from "./startSlider";

export default class Slider{

    slides: Array<SlideType>;
    slidesOnScreen: number;

    constructor(slides: Array<SlideType>, slidesOnScreen = 1) {
        this.slides = slides;
        this.slidesOnScreen = slidesOnScreen;
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
        slidesOnScreen && sliderWrapper.classList.add(`width-${slidesOnScreen}`)
        return sliderWrapper;
    }

    renderSlide(title: string, text: string) {
        return `
            <div class="slide">
                <h2>${title}</h2>
                <p>${text}</p>
            </div> 
        `
    }

    renderSlides(element: HTMLElement) {
        const slidesBlock = this.createSlidesBlock(this.slidesOnScreen);
        const sliderLine = this.createWrapper('slider-line');
        const sliderWrapper = this.createWrapper('slider-wrapper');
        const leftArrow = this.createArrow('left');
        const rightArrow = this.createArrow('right');

        this.slides.forEach(slide => slidesBlock.innerHTML += this.renderSlide(slide.title, slide.text));

        sliderLine.append(slidesBlock);
        sliderWrapper.append(leftArrow)
        sliderWrapper.append(sliderLine);
        sliderWrapper.append(rightArrow);
        element.append(sliderWrapper);

        sliderStart(slidesBlock, {left: leftArrow, right: rightArrow}, this.slidesOnScreen);
    }

}
