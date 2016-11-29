import $ from 'jquery';

class Carousel {
    constructor(container, element){
        let i = 0,
            j = 1,
            that = this,
            $container = $('.carousel'),
            $element = $('.carousel-element'),
            $prevElement = $element.eq(0),
            totalElements = $element.length;

        this.timer = setInterval(function () {
            $prevElement.hide();

            $element.eq(j).show();

            $prevElement = $element.eq(j);

            j++;

            if (j >= totalElements) {
                j = 0;
            }
        }, 100);
    }
}

export default Carousel;