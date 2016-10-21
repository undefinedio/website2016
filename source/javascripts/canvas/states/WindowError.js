import '../../helpers/events';
import CustomState from "./CustomState";
import $ from 'jquery';

class MouseTrail1 extends CustomState {
    init(data) {
        this.imageUrl = data.image;
        this.imageScale = data.scale;
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        if (data.activateOnHoverElement) {
            this.activateOnHoverElement = $(data.activateOnHoverElement);
        } else {
            this.activateOnHoverElement = false;
        }
    }

    preload() {
        this.game.load.image('window', this.imageUrl);
    }

    create() {
        $('body').on('mousemove', this.mouseMove.bind(this));

        if (this.activateOnHoverElement) {
            this.activateOnHoverElement.hover(()=> {
                this.startDrawing = true;
            })
        }
        this.texture = this.game.add.renderTexture(this.game.world.width, this.game.world.height, 'window');
        this.window = this.game.make.sprite(this.clientX, this.clientY, 'window');
        this.window.anchor.set(0.5);
        this.window.scale.setTo(this.imageScale);
        this.game.add.sprite(0, 0, this.texture);
    }

    mouseMove(e) {
        this.clientX = e.pageX * 2;
        this.clientY = e.pageY * 2;

        if (!this.activateOnHoverElement) {
            this.startDrawing = true;
        }
    }

    update() {
        if (this.startDrawing) {
            this.texture.renderXY(this.window, this.clientX, this.clientY);
        }
    }

    shutdown() {
        this.texture.destroy(true);
        this.window.destroy();
        this.startDrawing = false;
        $('body').off('mousemove', this.mouseMove.bind(this));
    }
}

export default MouseTrail1;
