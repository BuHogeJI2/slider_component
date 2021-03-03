import {SlideType} from "./SliderTypes";
import './css/styles.css'

export default class Slider {

    slides: Array<SlideType>;
    slidesOnScreen: number;

    log() {
        console.log(this.slides)
    }

    constructor(slides: Array<SlideType>, slidesOnScreen = 1) {
        this.slides = slides
        this.slidesOnScreen = slidesOnScreen
    }

    createWrapper(className) {
        const wrapper = document.createElement('div');
        wrapper.classList.add(`${className}`);

        return wrapper
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

        this.slides.forEach(slide => slidesBlock.innerHTML += this.renderSlide(slide.title, slide.text));

        sliderLine.append(slidesBlock);
        sliderWrapper.append(sliderLine);
        element.append(sliderWrapper);
    }

}
