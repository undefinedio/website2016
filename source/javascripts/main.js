import $ from 'jquery';
import Reveal from 'reveal.js/js/reveal'
import loadDataSrcSVG from './helpers/svg'

import './helpers/events';
import Sound from './classes/sound';

class App {
    constructor() {
        this.env = this.getEnv();

        this.sound = new Sound();
        this.initReveal();

        loadDataSrcSVG();

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
            viewDistance: 3,
            transition: 'none',
            hideAddressBar: true,
            overview: false,
            dependencies: [],
            width: "95%",
            height: "95%",
            margin: 0,
            minScale: 1,
            maxScale: 1
        });
    }

    eventHandlers() {
        this.$slides.on('click', ()=> {
            this.sound.play('click');
            Reveal.right();
        });

        Reveal.addEventListener('ready', (event)  => {
            this.doSlide();
        });

        Reveal.addEventListener('slidechanged', (event) => {
            this.doSlide();
        });
    }

    doSlide() {
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
