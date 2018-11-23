import $ from "jquery";

class Marquee {
    constructor() {
        d.on("Marquee", () => {
            this.init();
        });
    }

    init() {
        let dir = 'left';
        this.$marquee = $('.marquee');

        if (this.$marquee.data('dir')) {
            dir = this.$marquee.data('dir');
        }
    }
}

new Marquee();