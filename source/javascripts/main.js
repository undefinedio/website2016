import 'whatwg-fetch'

import Reveal from 'reveal.js/js/reveal'

import loadDataSrcSVG from './helpers/svg'
import loadPrintCSS   from './helpers/print'

var prefix = 'node_modules/reveal.js/plugin';

document.addEventListener('DOMContentLoaded', (event) => {
    window.Reveal = Reveal;
    Reveal.initialize({
        controls: false,
        progress: false,
        history: false,
        center: true,
        transition: 'slide',
        dependencies: []
    });

    loadDataSrcSVG();
    loadPrintCSS();
});
