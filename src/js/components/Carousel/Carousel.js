const getTemplate = (slides = [], title) => {
    let numberOfSlides = slides.length
    let slideNumber = 0 
    let items = ''
    for (let i = 0; i < slides.length; i++) {
        slideNumber = i + 1
        items += `
            <div class="carousel-item"
                data-slide-number=${i + 1}
                ${(i === 0) ? "data-current=1" : ""}
                ${(i > 0) ? "style=opacity:0;" : ""}>
                <img src=${slides[i]} alt="Random image">
                <span class="slide-number">${slideNumber}</span>
            </div>
        `
    }
    
    return `
        <h1>${title ??= 'Component Carousel (default)'}</h1>
        <button class="btn-left" data-arrow="left">
            <img src="img/arrow.svg" alt="arrow-left">
        </button>
        <div class="carousel-items">
                ${items}    
        </div>
        <button class="btn-right" data-arrow="right">
            <img src="img/arrow.svg" alt="arrow-right">
        </button>
        <div class="carousel-footer">Number of slides: ${numberOfSlides}</div>
    `
}

export class Carousel {
    constructor(selector, options) {
        this.$el = document.querySelector(selector)
        this.options = options
        this.#render()
        this.#setup()
    } // constructor

    #render() {
        const {slides, title} = this.options
        this.$el.innerHTML = getTemplate(slides, title)
    }

    #setup() {
        this.slides = document.querySelectorAll('.carousel-item')
        this.carouselFooter = document.querySelector('.carousel-footer')
        const arrows = document.querySelectorAll('[data-arrow]')
        for (let i = 0; i < arrows.length; i++) {
            arrows[i].addEventListener('click', this.changeSlides.bind(this))
        }
    }

    changeSlides(event) {
        const btn = event.currentTarget
        btn.setAttribute('disabled', 'disabled')
        setTimeout(() => { btn.removeAttribute('disabled') }, 2000);
        
        const {duration, effect, delay} = this.options
        console.log('Duration:' , Number(duration.replace(/\D+/g,'')));
        const arrowDirection = event.currentTarget.dataset.arrow 
        let currentSlide
        for (let i = 0; i < this.slides.length; i++) {
            this.slides[i].dataset.current === '1' ? currentSlide = i : null
        }
        this.slides[currentSlide].removeAttribute('data-current')
        let prevSlide = currentSlide

        switch (arrowDirection) {
            case 'left':
                this.slides[currentSlide].style = `transform: translate(120%, 0); transition: transform ${duration} ${effect} ${delay};`
                currentSlide--
                (currentSlide < 0) ? currentSlide = this.slides.length - 1 : currentSlide
                this.slides[currentSlide].style = 'transform: translate(-120%, 0);'
            break
            case 'right':
                this.slides[currentSlide].style = `transform: translate(-120%, 0); transition: transform ${duration} ${effect} ${delay};`
                currentSlide++
                (currentSlide === this.slides.length) ? currentSlide = 0 : currentSlide
                this.slides[currentSlide].style = 'transform: translate(120%, 0);'
            break
        }

        setTimeout(() => { this.slides[currentSlide].style = `transform: translate(0, 0); transition: transform ${duration} ${effect} ${delay};` }, 1)
        setTimeout(() => { this.slides[prevSlide].style = 'transform: translate(0, 0); opacity: 0;' }, 2000)
        this.slides[currentSlide].setAttribute('data-current', '1')
    }
}

// Сделать внешнюю проверку вводимых значений, параметров!