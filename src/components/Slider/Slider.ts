import {SlideType} from "./SliderTypes";

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


}
