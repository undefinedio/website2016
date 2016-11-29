import $ from 'jquery';
import Reveal from 'reveal.js/js/reveal'

class Explosion {
    constructor() {
        d.on("explosion", () => {
            this.explosion();
        });
    }

    explosion() {
        var timerExplosion = setTimeout(() =>{
            $('.explosion h1').hide();
            $('.explosion img').show();
        }, 500);

        var timerReveal = setTimeout(() => {
            Reveal.right();
            $('.explosion h1').show();
            $('.explosion img').hide();
        }, 1300);
    }
}

new Explosion();