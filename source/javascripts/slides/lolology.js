import $ from 'jquery';

class Lolology {
    constructor() {
        let that = this;

        this.images = [];

        $(function () {
            setTimeout(function () {
                that.preloadImages();
            }, 0);
        });

        d.on("startLolology", ()=> {
            that.showGif();
            //that.gradientAnimation();
        });

        d.on("endLolology", () => {
            clearInterval(that.timer);

            $('.js-random-gif').hide();
        })
    }

    preloadImages() {
        $('.js-random-gif').each((i, gif) => {
            let that = this;

            $.get('https://api.giphy.com/v1/stickers/random?api_key=dc6zaTOxFJmzC&tag=weird')
                .then((res) => {
                    $(gif).css('background-image', 'url(' + res.data.image_original_url + ')');
                    that.images[i] = res.data.image_original_url;
                });
        });
    }

    showGif() {
        let i = 0,
            $randomGif = $('.js-random-gif'),
            randomGifLength = $randomGif.length,
            $prevGif = $randomGif.eq(0),
            $bg = $('.js-bg.lolology'),
            that = this;

        this.timer = setInterval(function () {
            $prevGif.hide();

            $randomGif.eq(i).show();

            $prevGif = $randomGif.eq(i);

            i++;

            if (i >= randomGifLength) {
                i = 0;
            }
        }, 1000);
    }

    gradientAnimation() {
        let blendAmount = 70,
            delay = -10,
            windowWidth = window.innerWidth,
            $bg = $(".backgrounds .lolology");

        $(document).on('mousemove', function (e) {
            var mouseX = Math.round(e.pageX / windowWidth * 100 - delay),
                col1 = mouseX - blendAmount,
                col2 = mouseX + blendAmount;

            $bg.css({
                "background": "linear-gradient(to right, #B3F6D8 " + col1 + "%,#E4FF7C " + col2 + "%)"
            });
        });
    }
}

new Lolology();