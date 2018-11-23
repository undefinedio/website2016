import $ from 'jquery';

class Contact {
    constructor() {
        d.on("Contact", () => {
            this.init();
        });
    }

    init() {
        setInterval(() => {
            let containerHeight = $(window).height(),
                containerWidth = $(window).width(),
                posX = this.randomNumber(0, containerHeight),
                posY = this.randomNumber(0, containerWidth);

                let $clone = $('.windows').not('.cloned').clone().addClass('cloned').appendTo('.clones');

            $clone.css({ top : posY, left : posX, display : 'block' });
        }, 1000);
    }

    mousePos(e) {
        this.clientX = e.pageX;
        this.clientY = e.pageY;

        let mousePositionDif = 10,
            mousePositionDifY = this.previousMouseY >= this.clientY + mousePositionDif || this.previousMouseY <= this.clientY - mousePositionDif,
            mousePositionDifX = this.previousMouseX >= this.clientX + mousePositionDif || this.previousMouseX <= this.clientX - mousePositionDif,
            that = this;


        if ((this.previousMouseY !== this.clientY) && (this.previousMouseX !== this.clientX)) {
            if (mousePositionDifY || mousePositionDifX) {
                this.previousMouseY = this.clientY;
                this.previousMouseX = this.clientX;

                this.trails[this.imageIndex].style.opacity = 1;

                this.trails[this.imageIndex].style.left = this.clientX + 'px';
                this.trails[this.imageIndex].style.top = this.clientY + 'px';

                this.imageIndex++;

                if (this.imageIndex > this.imageIndexMax) {
                    this.imageIndex = 0;
                }
            }
        }
    }

    randomNumber(min,max) // min and max included
    {
        return Math.floor(Math.random()*(max-min+1)+min);
    }
}

new Contact();