import {ArrowsType} from "./SliderTypes";

let slidesBlock: HTMLElement;
let initTouch: number;
let startTouch: number;
let distance: number;
let finalPosition: number;
let slideWidth: number = 220;
let posThreshold: number = slideWidth * 0.45;
let swipeIndex: number = 0;
let transformValues = /[-0-9.]+(?=px)/;
let slidesOnScreen: number = 0;

export const sliderStart = (slidesBlockElement: HTMLElement, arrows: ArrowsType, slidesNumber: number) => {
    slidesOnScreen = slidesNumber;
    slidesBlock = slidesBlockElement;

    slidesBlock.style.transform = 'translate3d(0px, 0px, 0px)';
    slidesBlock.addEventListener('mousedown', swipeStart);
    slidesBlock.addEventListener('touchstart', swipeStart);

    arrows.left.addEventListener('click', handleLeftArrowClick);
    arrows.right.addEventListener('click', handleRightArrowClick);
}

const getEvent = (event) => {
    return event.type.search('touch') !== -1 ? event.touches[0] : event;
}

const swipeStart = (event) => {
    event = getEvent(event);

    initTouch = startTouch = event.clientX;
    slidesBlock.style.transition = '';

    document.addEventListener('mousemove', swipeAction);
    document.addEventListener('mouseup', swipeEnd);
    document.addEventListener('touchmove', swipeAction);
    document.addEventListener('touchend', swipeEnd);
}

const swipeAction =(event) => {
    event = getEvent(event);
    let transformMatch = +slidesBlock.style.transform.match(transformValues);

    distance = startTouch - event.clientX;
    startTouch = event.clientX;
    slidesBlock.style.transform = `translate3d(${transformMatch - distance}px, 0px, 0px)`;
}

const swipeEnd = () => {
    finalPosition = initTouch - startTouch;

    document.removeEventListener('mousemove', swipeAction);
    document.removeEventListener('mouseup', swipeEnd);
    document.removeEventListener('touchmove', swipeAction);
    document.removeEventListener('touchend', swipeEnd);

    if (Math.abs(finalPosition) > posThreshold) {
        let swipeIndexFactor = Math.floor(Math.abs(Math.abs(finalPosition) - posThreshold) / slideWidth);

        if (initTouch < startTouch) {
            swipeIndex = swipeIndex - 1 - swipeIndexFactor;
        } else {
            swipeIndex = swipeIndex + 1 + swipeIndexFactor;
        }
    }

    initTouch !== startTouch && slide();
}

const handleLeftArrowClick = () => {
    swipeIndex--;
    slide();
}

const handleRightArrowClick = () => {
    swipeIndex++;
    slide();
}

const slide = () => {
    if (swipeIndex > slidesBlock.children.length - slidesOnScreen) {
        swipeIndex = slidesBlock.children.length - slidesOnScreen;
    } else if (swipeIndex < 0) {
        swipeIndex = 0;
    }

    slidesBlock.style.transition = 'transform .5s';
    slidesBlock.style.transform = `translate3d(-${swipeIndex * slideWidth}px, 0px, 0px)`
}