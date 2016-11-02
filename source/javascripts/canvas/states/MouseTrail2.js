import '../../helpers/events';
import CustomState from "./CustomState";
import $ from 'jquery';

class MouseTrail1 extends CustomState {
    init(data) {
        this.sentence = " " + data.text || "UNDEFINED";
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    }

    preload() {
        this.textStyle = {
            fill: 'black',
            font: '40px Space Mono'
        };

        this.target = new Phaser.Point();
        this.letterArray = this.sentence.split('');

    }

    create() {
        this.clientX = this.game.world.width;
        this.clientY = 0;

        this.firstMove = true;

        this.snakeGroup = this.game.add.group();
        if (this.snakeGroup.children.length == 0) {
            this.drawChain();
        }
        $('body').on('mousemove', this.mouseMove.bind(this));
    }

    drawChain() {
        this.points = this.letterArray.length;
        this.distance = 25;
        this.path = [];

        for (var i = 0; i < this.points; i++) {
            this.path.push(this.game.add.text(this.clientX + i * this.distance, this.clientY + 0, this.letterArray[i], this.textStyle));
        }

    }

    mouseMove(e) {
        this.clientX = e.pageX * 2;
        this.clientY = e.pageY * 2;

        this.path[0].x = this.clientX;
        this.path[0].y = this.clientY;

    }

    update() {
        if (this.firstMove) {
            this.game.add.tween(this.path[0]).to({
                x: this.game.world.width / 2,
                y: this.game.world.height /2
            }, 2000, Phaser.Easing.Power2, true);

            this.firstMove = false;
        }

        for (var i = 0; i < this.points - 1; i++) {
            var segment = this.path[i];
            var nextSegment = this.path[i + 1];

            if (nextSegment) {
                var vector = new Phaser.Point(segment.x - nextSegment.x, segment.y - nextSegment.y);
                vector.setMagnitude(this.distance);
                nextSegment.position = new Phaser.Point(segment.x - vector.x, segment.y - vector.y);
            }
        }
    }

    shutdown() {
        this.snakeGroup.destroy(true);
        if (this.snakeHead) {
            this.snakeHead.destroy();
        }
        $('body').off('mousemove', this.mouseMove.bind(this));
    }
}

export default MouseTrail1;
