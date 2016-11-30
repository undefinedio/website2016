import '../../helpers/events';
import CustomState from "./CustomState";

var imageScrollPosition = {x: 0, y: 0};

class PatternBackground extends CustomState {
    init(data) {
        this.imageKey = data.image;
        this.imageScale = data.scale;
        this.speed = data.speed || 5;
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    }

    preload() {
        this.game.load.image(this.imageKey, 'assets/images/lolology/' + this.imageKey + '.png');

        this.texture = this.game.add.renderTexture(this.game.world.width, this.game.world.height, 'window');
    }

    create() {
        this.image = this.game.make.sprite(0, 0, this.imageKey);
        this.image.anchor.set(0.5);
        this.image.scale.setTo(this.imageScale);
        this.game.add.sprite(0, 0, this.texture);

        this.populateImageArray();
    }

    populateImageArray() {
        this.images = [];

        for (var w = 0 - this.image.width; w < this.texture.width + this.image.width; w += this.image.width) {
            for (var h = 0 - this.image.height; h < this.texture.height + this.image.height; h += this.image.height) {
                this.images.push({
                    x: w,
                    y: h
                })
            }
        }
    }

    update() {
        this.clientX = global.MOUSE_X << 1; //bit shifting 1 to the left equals times 2 ;-)
        this.clientY = global.MOUSE_Y << 1;

        this.texture.clear();
        imageScrollPosition.x -= this.speed;
        imageScrollPosition.y += this.speed;

        this.images.forEach((img) => {
            let x = img.x + imageScrollPosition.x;
            let y = img.y + imageScrollPosition.y;

            let targetX = this.clientX - x;
            let targetY = this.clientY - y;

            this.image.rotation = Math.atan2(targetY, targetX);
            this.texture.renderXY(this.image, x, y, false);
        });

        if (Math.abs(imageScrollPosition.x) > this.image.width) {
            imageScrollPosition.x = 0;
        }

        if (Math.abs(imageScrollPosition.y) > this.image.height) {
            imageScrollPosition.y = 0;
        }
    }

    shutdown() {
        this.texture.destroy();
    }
}

export default PatternBackground;
