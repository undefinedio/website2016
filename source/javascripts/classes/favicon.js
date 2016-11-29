import Favico from 'favico.js';
import $ from 'jquery';
import Reveal from 'reveal.js/js/reveal'

class Favicon {
    constructor() {
        $(function () {
            var favicon = new Favico();

            var favicons = document.querySelectorAll('.favicons img')
                , i = 1,
                faviconsLength = favicons.length - 1;

            $(document).on('click', (e)=> {
                favicon.image(favicons[i]);

                if (i >= faviconsLength) {
                    i = 0;
                } else {
                    i++;
                }
            });
        });
    }
}

export default Favicon;