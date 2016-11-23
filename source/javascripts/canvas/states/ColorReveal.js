import '../../helpers/events';
import CustomState from "./CustomState";

class ColorReveal extends CustomState {
    init(data) {
        this.colors = data.colors ? eval(data.colors) : Phaser.Color.HSVColorWheel();
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    }

    create() {
        this.letterArray = "?".split('');
        this.index = 0;
        this.bmd = this.game.make.bitmapData(this.game.world.width, this.game.world.height);
        this.bmdDest = this.game.make.bitmapData(this.game.width, this.game.height);
        this.bmdDest.addToWorld();

        this.game.add.sprite(0, 0, this.bmd);
    }

    update() {
        this.paint();
        this.paint(); //double the speed

        this.bmdDest.copy(this.bmd, 0, 0);
    }

    shutdown() {
        this.bmd.destroy();
        this.bmdDest.destroy();
    }

    paint() {
        var i = this.letterArray.length;
        while (i--) {
            this.index = this.game.math.wrapValue(this.index, 1, this.colors.length);
            this.bmd.text(this.letterArray[i], this.game.world.randomX, this.game.world.randomY, '50px Space Mono', this.colors[this.index].rgba, false);
        }
    }
}

export default ColorReveal;
