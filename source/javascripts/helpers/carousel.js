import $ from 'jquery';

class Carousel {
    constructor(container, speed) {
        this.$container = $(container);
        this.$element = $(container + ' .carousel-element');
        this.$prevElement = this.$element.eq(0);
        this.totalElements = this.$element.length;
        this.speed = speed;

        this.setTimer();

        this.$container.hover(e => {
            clearInterval(this.timer);
        }, e => {
            this.setTimer();
        });
    }

    setTimer() {
        let j = 1;

        this.timer = setInterval(() => {
            this.$prevElement.hide();

            this.$element.eq(j).show();

            this.$prevElement = this.$element.eq(j);

            j++;

            if (j >= this.totalElements) {
                j = 0;
            }

        }, this.speed);
    }
}

export default Carousel;