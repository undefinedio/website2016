import $ from 'jquery';
import _ from "lodash";

class Draw {
    constructor() {
        d.on("start-drawing", () => {
            this.drawing();
        });
    }

    drawing() {
        const $canvas = $('#drawing-canvas');

        const canvas = $canvas[0];
        const context = canvas.getContext('2d');

        canvas.width = $canvas.width();
        canvas.height = $canvas.height();

        let lastX = 0;
        let lastY = 0;
        let isDrawing = false;
        let startDrawing = false;

        $(window).resize(_.debounce(() => {
            canvas.width = $canvas.width();
            canvas.height = $canvas.height();
            lastX = 0;
            lastY = 0;
            isDrawing = false;
        }, 100));

        canvas.addEventListener("mousemove", function (e) {
            let mouseX = e.offsetX;
            let mouseY = e.offsetY;

            if (lastX !== 0 && lastY !== 0) {
                context.moveTo(lastX, lastY);
                context.lineTo(mouseX, mouseY);
                context.strokeStyle = "#e85a36";
                context.closePath();
                context.stroke();
            }

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
        }, false);

        canvas.addEventListener("touchend", function (e) {
            isDrawing = false;
        }, false);
    }
}

new Draw();