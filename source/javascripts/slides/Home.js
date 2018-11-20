import $ from 'jquery';

class Home {
    constructor() {
        d.on("Home", () => {
            this.init();
        });
    }

    init() {
        this.images = $('.intro').data('images').images;
        this.updateCount = 0;
        this.imageIndex = 0;
        this.imageIndexMax = this.images.length - 1;
        this.mouseHistoryIndex = 0;
        this.mouseHistoryIndexMax = 3;
        this.previousMouseX = 0;
        this.previousMouseY = 0;
        this.mouseHistory = [];
        this.trails = [];
        this.$trailsContainer = $('.trails-container');

        this.makeTrail();

        $(window).on('mousemove', this.mousePos.bind(this));
    }

    makeTrail() {
        for (let i = 0; i <= this.imageIndexMax; i++) {
            let trail = document.createElement("div");
            trail.classList.add("trail");
            trail.style.backgroundImage = 'url("' + this.images[this.imageIndex] + '");';
            document.getElementsByClassName('trails-container')[0].appendChild(trail);
            this.trails.push(trail);
        }
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
}

new Home();