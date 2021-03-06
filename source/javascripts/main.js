import $ from 'jquery';
import Reveal from 'reveal.js/js/reveal'

window.Reveal = Reveal;

import './helpers/events';
import Sound from './classes/sound';
import Favicon from './classes/favicon.js';
import Game from './canvas/Game';

//import slide specific javascript
import './slides/explosion.js';
import './slides/drawing.js';

import Carousel from './helpers/carousel.js';

//start this as soon as possible to preload all the assets needed
const CLICK_TIMEOUT = 200;

class App {
    constructor() {
        global.clicksDisabled = false;
        this.env = this.getEnv();

        this.sound = new Sound();
        this.initReveal();

        this.carouselClients = new Carousel('.carousel-client', 500);
        this.carouselKop = new Carousel('.carousel-kop', 500);

        new Favicon();

        this.eventHandlers();
    }

    initReveal() {
        let keyboard = false,
            history = false;

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
            dependencies: [
                {src: 'lib/menu.min.js'}
            ],
            menu: {
                side: 'right',
                titleSelector: 'span.menu-title',
                useTextContentForMissingTitles: false,
                hideMissingTitles: true,
                markers: false,
            },
            width: "100%",
            height: "100%",
            margin: 0,
            minScale: 1,
            maxScale: 1
        });
    }

    eventHandlers() {

        $(document.body).on('click', '.slide-menu-button', e => {
            console.log('menu click instead of advance');
            e.stopImmediatePropagation()
        });

        $(document.body).on('click', '.js-slides, canvas#drawing-canvas', e => {
            if (!$(e.originalEvent.srcElement).hasClass('js-link') && !$('.present').hasClass('js-disable-click')) {
                if (global.clicksDisabled) {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                } else {
                    global.clicksDisabled = true;
                    this.sound.play('click');
                    Reveal.right();
                    setTimeout(() => {
                        global.clicksDisabled = false;
                    }, CLICK_TIMEOUT);
                }
            } else {
                console.log('click disabled');
            }
        });


        Reveal.addEventListener('ready', event => {
            this.doSlide(event);
        });

        Reveal.addEventListener('slidechanged', (event) => {
            if (!$(event.currentSlide).attr('data-canvas')) {
                //TODO: do something with the "PreloadReady" event to prevent flashes
                global.d.dispatch("startStage=Idle");
            }
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
        var playSound = $el.data('play-audio');
        var stopSound = $el.data('stop-audio');
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
            this.sound.play(playSound);
        }

        if (stopSound) {
            this.sound.stop();
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
    new Game();
    new App();
});
