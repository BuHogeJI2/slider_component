import Slider from "./components/Slider/Slider";
import {SlideType} from "./components/Slider/SliderTypes";

const slides: Array<SlideType> = [
    {title: 'First slide', text: 'Some text for first slide'},
    {title: 'Second slide', text: 'Some text for second slide'},
    {title: 'Third slide', text: 'Some text for third slide'},
    {title: 'Forth slide', text: 'Some text for fourth slide'},
    {title: 'Fifth slide', text: 'Some text for fifth slide'},
]


const slider = new Slider(slides, 2);
const root = document.getElementById('root');


root.innerHTML = `<h1>Slider Component</h1>`
slider.renderSlides(root);
