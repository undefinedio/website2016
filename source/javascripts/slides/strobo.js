import $ from 'jquery';
import Reveal from 'reveal.js/js/reveal'

class Strobo {
    constructor() {
        d.on("strobo", () => {
            this.explosion();
        });
    }

    explosion() {
        var timerExplosion = setTimeout(() =>{
            $('.explosion h2').hide();
            $('.explosion img').show();
        }, 500);

        var timerReveal = setTimeout(() => {
            Reveal.right();
            $('.explosion h2').show();
            $('.explosion img').hide();
        }, 1300);
    }
}

new Explosion();