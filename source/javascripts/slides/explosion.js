import $ from 'jquery';
import Reveal from 'reveal.js/js/reveal'

class Explosion {
    constructor() {
        var that = this;

        d.on("explosion", () => {
            that.explosion();
        });
    }

    explosion() {
        var timerExplosion = setTimeout(function(){
            $('.explosion h1').hide();
            $('.explosion img').show();
        }, 500);

        var timerReveal = setTimeout(function () {
            Reveal.right();
            $('.explosion h1').show();
            $('.explosion img').hide();
        }, 1300);
    }
}

new Explosion();