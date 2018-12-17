import '../../helpers/events';
import CustomState from "./CustomState";


class Drawing extends CustomState {
    init() {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    }

    create() {
        this.bmd = this.game.add.bitmapData(this.game.world.width, this.game.world.height);

        this.game.add.image(0, 0, this.bmd);
        this.game.time.desiredFps = 120;

        this.bmd2 = this.game.make.bitmapData(16, 16);
        this.bmd2.circle(8, 8, 8, 'rgba(233,81,42,1)');
    }

    update() {
        if (this.game.device.desktop) {
            this.clientX = global.MOUSE_X << 1; //bit shifting 1 to the left equals times 2 ;-)
            this.clientY = global.MOUSE_Y << 1;
        }

        this.bmd.draw(this.bmd2, this.clientX - 8, this.clientY - 8);
    }
}

export default Drawing;
