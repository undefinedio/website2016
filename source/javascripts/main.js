import $ from 'jquery';
import Reveal from 'reveal.js/js/reveal'
import loadDataSrcSVG from './helpers/svg'

import './helpers/events';
import Sound from './classes/sound';

class App {
    constructor() {
        window.Reveal = Reveal;
        this.$slides = $('.js-slides');

        Reveal.initialize({
            controls: false,
            progress: false,
            history: false,
            keyboard: false,
            center: true,
            touch: false,
            loop: true,
            mouseWheel: false,
            viewDistance: 3,
            transition: 'none',
            hideAddressBar: true,
            overview: false,
            dependencies: []
        });

        this.sound = new Sound();

        loadDataSrcSVG();

        this.eventHandlers();
    }

    eventHandlers() {
        this.$slides.on('click', ()=> {
            this.sound.play('click');
            Reveal.right();
        });

        Reveal.addEventListener('slidechanged', (event) => {
            let $el = $(event.currentSlide);

            var fireEvent = $el.data('event');
            var playSound = $el.data('play');
            var stopSound = $el.data('stop');
            var className = $el.data('class');

            if (fireEvent) {
                global.d.dispatch(fireEvent);
            }

            if (playSound) {
                this.sound.play(playSound);
            }

            if (stopSound) {
                this.sound.stop(playSound);
            }

            if (className) {
                this.clearClasses();
                $('.js-bg').addClass(className);
            }
        });
    }

    clearClasses() {
        $('.js-bg').attr('class', 'bg js-bg');
    }
}

$(document).ready(() => {
    new App();
});
