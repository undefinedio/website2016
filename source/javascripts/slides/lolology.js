import $ from 'jquery';

class Lolology {
    constructor() {
        let that = this;
        this.images = [];

        that.preloadImages();

        d.on("startLolology", ()=> {
            that.showGif();
        });

        d.on("endLolology", () => {
            clearInterval(that.timer);
            $('body').css('background-image', 'none');
            $('.js-random-gif').hide();
        });
    }

    preloadImages() {
        this.totalRandomGifs = 5;
        var that = this;

        for (var i = 0; i < this.totalRandomGifs; i++) {
            (function (i) {
                $.get('//api.giphy.com/v1/stickers/random?api_key=dc6zaTOxFJmzC&tag=dancing')
                    .then((res) => {
                        that.images[i] = res.data.image_original_url;
                    });
            })(i);
        }
    }

    showGif() {
        let i = 0,
            j = 1,
            that = this,
            $randomGif = $('.js-random-gif'),
            $prevGif = $randomGif.eq(0);

        $('.js-bg-random-gifs').css('background-image', 'url(' + that.images[0] + ')');
        $randomGif.eq(0).css('background-image', 'url(' + that.images[1] + ')');

        this.timer = setInterval(function () {
            $prevGif.hide();

            $('.js-bg-random-gifs').css('background-image', 'url(' + that.images[i] + ')');
            $randomGif.eq(j).css('background-image', 'url(' + that.images[j] + ')');

            $randomGif.eq(j).show();

            $prevGif = $randomGif.eq(j);

            i++;
            j++;

            if (i >= that.totalRandomGifs) {
                i = 0;
            }

            if (j >= that.totalRandomGifs) {
                j = 0;
            }
        }, 2500);
    }
}

new Lolology();