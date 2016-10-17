import 'whatwg-fetch'
import $ from 'jquery';

import Reveal from 'reveal.js/js/reveal'

import loadDataSrcSVG from './helpers/svg'
import loadPrintCSS   from './helpers/print'

var prefix = 'node_modules/reveal.js/plugin';

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

        loadDataSrcSVG();
        loadPrintCSS();

        this.eventHandlers();
    }

    eventHandlers() {
        this.$slides.on('click', ()=> {
            Reveal.right();
        });
    }
}

$(document).ready(() => {
    new App();
});
