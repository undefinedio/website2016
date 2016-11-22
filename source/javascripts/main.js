import $ from 'jquery';
import Reveal from 'reveal.js/js/reveal'

import './helpers/events';
import Sound from './classes/sound';
import Game from './canvas/Game';

//import slide specific javascript
import './slides/lolology.js';

class App {
    constructor() {
        this.env = this.getEnv();

        this.sound = new Sound();
        this.initReveal();

        new Game();

        this.eventHandlers();
    }

    initReveal() {
        let keyboard = false,
            history = false;

        window.Reveal = Reveal;
        this.$slides = $('.js-slides');

        if (this.env) {
            keyboard = true;
            history = true;
        }

        Reveal.initialize({
            controls: false,
            progress: false,
            history: history,
            keyboard: keyboard,
            center: true,
            touch: false,
            loop: true,
            mouseWheel: false,
            viewDistance: 2,
            transition: 'none',
            hideAddressBar: true,
            overview: false,
            dependencies: [],
            width: "100%",
            height: "100%",
            margin: 0,
            minScale: 1,
            maxScale: 1
        });
    }

    eventHandlers() {
        this.$slides.on('click', (e)=> {
            if (!$(e.originalEvent.srcElement).hasClass('js-link')) {
                this.sound.play('click');
                global.d.dispatch("startStage=Idle");
                Reveal.right();
            }
        });

        Reveal.addEventListener('ready', (event) => {
            this.doSlide(event);
        });

        Reveal.addEventListener('slidechanged', (event) => {
            this.doSlide(event);
        });

        $('body').on('mousemove', e => {
            global.MOUSE_X = e.pageX;
            global.MOUSE_Y = e.pageY;
        });

    }

    doSlide(event) {
        let $el = $(event.currentSlide);

        var fireEvent = $el.data('event');
        var startCanvasStage = $el.data('canvas');
        var playSound = $el.data('play');
        var stopSound = $el.data('stop');
        var className = $el.data('class');

        if (fireEvent) {
            global.d.dispatch(fireEvent);
        }

        if (startCanvasStage) {
            if (typeof startCanvasStage == 'object' && startCanvasStage.startStage) {
                global.d.dispatch("startStage", startCanvasStage.startStage);
            }
        }

        if (playSound) {
            console.log(playSound);
            this.sound.play(playSound);
        }

        if (stopSound) {
            this.sound.stop(playSound);
        }

        if (className) {
            this.clearClasses();
            $('.js-bg').addClass(className);
        }
    }

    clearClasses() {
        $('.js-bg').attr('class', 'bg js-bg');
    }

    getEnv() {
        if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
            $('body').attr('data-env', 'dev');

            return true;
        }
    }
}

$(document).ready(() => {
    new App();
});
