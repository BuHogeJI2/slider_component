export default class SliderLogic {

    slidesBlock: HTMLElement;
    initTouch: number;
    startTouch: number;
    distance: number;
    finalPosition: number;
    slideWidth: number = 220;
    posThreshold: number = this.slideWidth * 0.45;
    swipeIndex: number = 0;

    transformValues = /[-0-9.]+(?=px)/;

    getEvent(event) {
        return event.type.search('touch') !== -1 ? event.touches[0] : event;
    }

    swipeStart(event) {
        console.log(event.type)
        event = this.getEvent(event);

        this.initTouch = this.startTouch = event.clientX;
        this.slidesBlock.style.transition = '';

        this.slidesBlock.addEventListener('mousemove', this.swipeAction.bind(this));
        this.slidesBlock.addEventListener('mouseup', this.swipeEnd.bind(this));
        this.slidesBlock.addEventListener('touchmove', this.swipeAction.bind(this));
        this.slidesBlock.addEventListener('touchend', this.swipeEnd.bind(this));
    }

    swipeAction(event) {
        event = this.getEvent(event);
        let transformMatch = +this.slidesBlock.style.transform.match(this.transformValues);

        this.distance = this.startTouch - event.clientX;
        this.startTouch = event.clientX;
        this.slidesBlock.style.transform = `translate3d(${transformMatch - this.distance}px, 0px, 0px)`;
    }

    swipeEnd(event) {
        console.log(event.type)
        this.finalPosition = this.initTouch - this.startTouch;

        this.slidesBlock.removeEventListener('mousemove', this.swipeAction.bind(this));
        this.slidesBlock.removeEventListener('mouseup', this.swipeEnd.bind(this));
        this.slidesBlock.removeEventListener('touchmove', this.swipeAction.bind(this));
        this.slidesBlock.removeEventListener('touchend', this.swipeEnd.bind(this));

        if (Math.abs(this.finalPosition) > this.posThreshold) {
            let swipeIndexFactor = Math.floor(Math.abs(this.finalPosition - this.posThreshold) / this.slideWidth);

            if (this.initTouch < this.startTouch) this.slideWidth = this.swipeIndex - 1 - swipeIndexFactor;
            else this.swipeIndex = this.swipeIndex + 1 + swipeIndexFactor;
        }

        this.initTouch !== this.startTouch && this.slide();

    }

    start() {
        this.slidesBlock = document.querySelector('.slides-block');
        this.slidesBlock.style.transform = 'translate3d(0px, 0px, 0px)';
        this.slidesBlock.addEventListener('mousedown', this.swipeStart.bind(this));
        this.slidesBlock.addEventListener('touchstart', this.swipeStart.bind(this));
    }

    slide() {
        console.log(this.swipeIndex);
    }
}