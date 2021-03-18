import {sliderStart} from "./startSlider";
import {ArrowsType} from "./SliderTypes";
import './css/styles.css'

class Slider extends HTMLElement {

    slidesBlock: HTMLElement
    arrows: ArrowsType

    minSlidesNumber: number = 1;
    maxSlidesNumber: number = 5;
    slidesNumber: number = 3;
    slideWidth: number = 200;
    slideHeight: number = 160;
    slidesBlockWidth: number;
    type: string = 'common';

    connectedCallback() {
        this.append(this.renderSlider());
        sliderStart(this.slidesNumber, this.slideWidth, {
            block: this.slidesBlock,
            arrows: this.arrows
        })

    }

    checkAttributes() {
        if (this.hasAttribute('slides')) this.slidesNumber = +this.getAttribute('slides')
        if (this.hasAttribute('type')) this.type = this.getAttribute('type');
    }

    setOptions() {

        type Params = {
            prop: 'width' | 'height'
            value: number
        }

        const changeSlideParams = (param: Params) => {

            if (this.slidesNumber < this.minSlidesNumber) this.slidesNumber = this.minSlidesNumber
            else if (this.slidesNumber > this.maxSlidesNumber) this.slidesNumber = this.maxSlidesNumber

            if (param.prop === 'width') this.slideWidth = param.value
            else if (param.prop === 'height') this.slideHeight = param.value

            const slides = this.slidesBlock.querySelectorAll<HTMLElement>('slide');
            slides.forEach(slide => {
                if (param.prop === 'width') slide.style.width = `${param.value}px`
                else if (param.prop === 'height') slide.style.height = `${param.value}px`
            });

            this.slidesBlockWidth = (this.slideWidth + 20) * this.slidesNumber;
            this.slidesBlock.style.width = `${this.slidesBlockWidth}px`;
        }

        switch (this.type) {
            case 'wide': {
                this.maxSlidesNumber = 2;
                changeSlideParams({prop: 'width', value: 600})
                break;
            }
            case 'narrow': {
                changeSlideParams({prop: 'height', value: 320})
                break;
            }
            case 'middle': {
                this.maxSlidesNumber = 3;
                changeSlideParams({prop: 'width', value: 400})
                break;
            }
            default: {
                changeSlideParams({prop: 'width', value: 200})
                break;
            }
        }
    }

    renderSlider() {
        const sliderWrapper = this.createWrapper('slider-wrapper');
        const sliderLine = this.createWrapper('slider-line');
        const slidesBlock = this.createWrapper('slides-block');
        const leftArrow = this.createArrow('left-arrow');
        const rightArrow = this.createArrow('right-arrow');

        slidesBlock.append(...this.children);
        sliderLine.append(slidesBlock);
        sliderWrapper.append(leftArrow);
        sliderWrapper.append(sliderLine);
        sliderWrapper.append(rightArrow);

        this.slidesBlock = slidesBlock;
        this.arrows = {left: leftArrow, right: rightArrow}

        this.checkAttributes();
        this.setOptions()

        return sliderWrapper;
    }

    createWrapper(className) {
        const element = document.createElement('div');
        element.classList.add(className);
        return element;
    }

    createArrow(sideClass) {
        const arrow = document.createElement('div');
        arrow.classList.add('arrow', `${sideClass}`);
        return arrow;
    }

}

customElements.define('custom-slider', Slider);
