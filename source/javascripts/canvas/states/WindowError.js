import '../../helpers/events';
import CustomState from "./CustomState";
import $ from 'jquery';
import gyro from '../plugins/gyro';

class MouseTrail1 extends CustomState {
    init(data) {
        this.imageUrl = data.image;
        this.imageScale = data.scale;
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    }

    preload() {
        this.game.load.image('window', this.imageUrl);
    }

    create() {
        this.texture = this.game.add.renderTexture(this.game.world.width, this.game.world.height, 'texture');
        this.cara = this.game.make.sprite(this.clientX, this.clientY, 'window');
        this.cara.anchor.set(0.5);
        this.cara.scale.setTo(this.imageScale);
        this.game.add.sprite(0, 0, this.texture);

        this.caraDimensions = {width: this.cara.width * this.imageScale, height: this.cara.height * this.imageScale};
        console.log(this.caraDimensions);

        if (gyro.getFeatures().length > 0 && !this.game.device.desktop) {

            gyro.frequency = 5;
            let speedScale = 1.8;
            this.clientX = this.world.centerX;
            this.clientY = this.world.centerY;

            gyro.startTracking((o) => {
                this.clientX += o.x * speedScale;
                this.clientY -= o.y * speedScale;

            });
        }
    }

    update() {
        if (this.clientX > (this.world.width + this.caraDimensions.width)) {
            this.clientX = -this.caraDimensions.width;
        }

        if (this.clientX < -this.caraDimensions.width) {
            this.clientX = this.world.width;
        }

        if (this.clientY > (this.world.height + this.caraDimensions.height)) {
            this.clientY = -this.caraDimensions.height;
        }

        if (this.clientY < -this.caraDimensions.height) {
            this.clientY = this.world.height;
        }

        if (this.game.device.desktop) {
            this.clientX = global.MOUSE_X * 2;
            this.clientY = global.MOUSE_Y * 2;

        }
        this.texture.renderXY(this.cara, this.clientX, this.clientY);
    }

    shutdown() {
        gyro.stopTracking();
        this.texture.destroy(true);
        this.cara.destroy();
    }
}

export default MouseTrail1;
