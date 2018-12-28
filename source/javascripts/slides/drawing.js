import $ from 'jquery';
import _ from "lodash";

// drawing on canvas

class Draw {
    constructor() {
        d.on("drawing", () => {
            this.drawing();
        });
    }

    drawing (){
        const $el = $('#game');
        const $canvas = $el.find('canvas');

        const canvas = $canvas[0];
        const context = canvas.getContext('2d');

        canvas.width = $el.width();
        canvas.height = $el.height();

        let lastX = 0;
        let lastY = 0;
        let isDrawing = false;

        $(window).resize(_.debounce(() => {
            canvas.width = $el.width();
            canvas.height = $el.height();
            lastX = 0;
            lastY = 0;
            isDrawing = false;
        }, 100));

        canvas.addEventListener("mousemove", function (e) {
            console.log(e);
            let mouseX = e.offsetX;
            let mouseY = e.offsetY;
            context.moveTo(lastX, lastY);
            context.lineTo(mouseX, mouseY);
            context.strokeStyle = "#e85a36";
            context.closePath();
            context.stroke();

            lastX = mouseX;
            lastY = mouseY;
        }, false);

        canvas.addEventListener("touchstart", function (e) {
            const rect = e.target.getBoundingClientRect();
            const mouseX = e.targetTouches[0].pageX - rect.left;
            const mouseY = e.targetTouches[0].pageY - rect.top;
            lastX = mouseX;
            lastY = mouseY;
            isDrawing = true;
        }, false);

        canvas.addEventListener("touchmove", function (e) {
            if (!isDrawing) {
                return;
            }

            if (!e) {
                e = event;
            }

            const rect = e.target.getBoundingClientRect();
            const mouseX = e.targetTouches[0].pageX - rect.left;
            const mouseY = e.targetTouches[0].pageY - rect.top;

            context.moveTo(lastX, lastY);
            context.lineTo(mouseX, mouseY);
            context.strokeStyle = "#e85a36";

            context.closePath();
            context.stroke();

            lastX = mouseX;
            lastY = mouseY;

            e.preventDefault();
        },false);

        canvas.addEventListener("touchend", function (e) {
            isDrawing = false;
        }, false);
    }
}

new Draw();