import '../../helpers/events';
import CustomState from "./CustomState";


class Home extends CustomState {
    init(data) {
        this.updateCount = 0;
        this.spriteIndex = 0;
        this.spriteIndexMax = data.images.length - 1;
        this.mouseHistoryIndex = 0;
        this.mouseHistoryIndexMax = 2;
        this.images = data.images;
        this.imageScale = .5;
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.previousMouseX = 0;
        this.previousMouseY = 0;
        this.mouseHistory = [];
    }

    preload() {
        let that = this;

        this.images.forEach(function (image, i) {
            that.game.load.image('image' + i, image);
        });
    }

    create() {
        this.sprites = [];
        this.groups = [];

        this.texture = this.game.add.renderTexture(this.game.world.width, this.game.world.height, 'texture');

        for (let i = 0; i < this.images.length; i++) {
            this.sprites[i] = this.game.make.sprite(this.game.world.width + 1000, this.game.world.height + 1000, 'image' + i);
            this.sprites[i].anchor.set(0.5);
            this.sprites[i].scale.setTo(this.imageScale);
            this.sprites[i].visible = false;

            if (this.game.world.width <= 500) {
                this.sprites[i].scale.setTo(.3, .3);
            }

            this.sprites[i].alpha = 1;
            this.tween = this.game.add.tween(this.sprites[i]);
            this.tween.to( { alpha: 0 }, 1000, "Sine.easeInOut", true, 0, 100);

            this.game.add.sprite(0, 0, this.texture);
        }
    }

    update() {
        let mousePositionDif = 50,
            mousePositionDifY = this.previousMouseY >= this.clientY + mousePositionDif || this.previousMouseY <= this.clientY - mousePositionDif,
            mousePositionDifX = this.previousMouseX >= this.clientX + mousePositionDif || this.previousMouseX <= this.clientX - mousePositionDif,
            that = this;

        if ((this.previousMouseY !== this.clientY) && (this.previousMouseX !== this.clientX)) {
            if (mousePositionDifY || mousePositionDifX) {
                this.previousMouseY = this.clientY;
                this.previousMouseX = this.clientX;

                if (this.mouseHistoryIndex < this.mouseHistoryIndexMax) {
                    this.mouseHistory[this.mouseHistoryIndex] = {
                        "image": this.spriteIndex,
                        "x": this.clientX,
                        "y": this.clientY
                    };
                }

                this.mouseHistory.forEach(function (obj, i) {
                    that.sprites[obj.image].visible = true;
                    that.texture.renderXY(that.sprites[obj.image], obj.x, obj.y, false);
                });

                this.mouseHistoryIndex++;
                this.spriteIndex++;

                if (this.spriteIndex > this.spriteIndexMax) {
                    this.spriteIndex = 0;
                }

                if (this.mouseHistoryIndex > this.mouseHistoryIndexMax) {
                    this.mouseHistoryIndex = 0;
                }
            }
        }

        this.updateCount++;

        if (this.game.device.desktop) {
            this.clientX = global.MOUSE_X << 1; //bit shifting 1 to the left equals times 2 ;-)
            this.clientY = global.MOUSE_Y << 1;
        }
    }

    shutdown() {
        if (this.texture) {
            this.texture.destroy(true);
        }

        if (this.work) {
            this.work.destroy();
        }
    }

    random(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}

export default Home;