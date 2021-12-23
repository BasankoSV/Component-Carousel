import { Carousel } from "./components/Carousel/Carousel.js";

const carousel = new Carousel('#carousel', {
    title: null,            // null - default, "" - for nothing
    slides: [
            "https://picsum.photos/800/500?random=1",
            "https://picsum.photos/800/500?random=2",
            "https://picsum.photos/800/500?random=3",
            "https://picsum.photos/800/500?random=4",
            "https://picsum.photos/800/500?random=5",
            "https://picsum.photos/800/500?random=6",
            "https://picsum.photos/800/500?random=7",
        ],
    duration: '1.5s',       // default: '1.5s' - duration = setTimeout
    effect: 'ease',         // default: 'ease'
    delay: '0s',            // default: '1s'
})

// "https://picsum.photos/750/450"
// transition: <property> <duration> <timing-function> <delay></delay>
// "./img/slide_1.jpg","./img/slide_2.jpg","./img/slide_3.jpg","./img/slide_4.jpg","./img/slide_5.jpg",