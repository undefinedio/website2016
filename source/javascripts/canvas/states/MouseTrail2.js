import '../../helpers/events';
import CustomState from "./CustomState";

var segment, nextSegment, vector;

class MouseTrail1 extends CustomState {
    init(data) {
        this.sentence = " " + data.text || "UNDEFINED";
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    }

    preload() {
        this.game.load.bitmapFont('monoSpace', 'assets/images/bitmapfont/spacemono-regular_regular_48.PNG', 'assets/images/bitmapfont/spacemono-regular_regular_48.fnt');
        this.target = new Phaser.Point();
        this.letterArray = this.sentence.split('');
    }

    create() {
        this.clientX = this.game.world.width;
        this.clientY = 0;

        this.snakeGroup = this.game.add.group();

        if (this.snakeGroup.children.length == 0) {
            this.drawChain();
        }
    }

    drawChain() {
        this.points = this.letterArray.length;
        this.distance = 28;
        this.path = [];

        for (var i = 0; i < this.points; i++) {
            this.path.push(this.game.add.bitmapText(this.clientX + i * this.distance, this.clientY + 0, 'monoSpace', this.letterArray[i], 30));
        }
    }

    update() {
        this.clientX = global.MOUSE_X << 1; //bit shifting 1 to the left equals times 2 ;-)
        this.clientY = global.MOUSE_Y << 1;

        this.path[0].x = this.clientX;
        this.path[0].y = this.clientY;

        let length = this.points - 1;
        let i = 0;
        while (i < length) {
            segment = this.path[i];
            nextSegment = this.path[i + 1];

            if (nextSegment) {
                vector = new Phaser.Point(segment.x - nextSegment.x, segment.y - nextSegment.y);
                vector.setMagnitude(this.distance);
                nextSegment.position = new Phaser.Point(segment.x - vector.x, segment.y - vector.y);
            }
            i++;
        }
    }

    shutdown() {
        if (this.snakeGroup) {
            this.snakeGroup.destroy(true);
        }

        if (this.snakeHead) {
            this.snakeHead.destroy();
        }
    }
}

export default MouseTrail1;
