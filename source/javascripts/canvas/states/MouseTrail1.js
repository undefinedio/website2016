import '../../helpers/events';
import CustomState from "./CustomState";
import $ from 'jquery';

class MouseTrail1 extends CustomState {
    init(data) {
        this.sentence = data.text || "UNDEFINED";
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    }

    preload() {
        this.textStyle = {
            fill: 'black',
            font: '40px Space Mono'
        };

        this.target = new Phaser.Point();
        this.letterArray = this.sentence.split('');

        this.clientX = this.game.world.width / 2;
        this.clientY = this.game.world.height / 2;
    }

    create() {
        $('body').on('mousemove', this.mouseMove.bind(this));
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.snakeGroup = this.game.add.group();
        console.log(this.snakeHead);
    }

    drawSnake() {
        this.snakeHead = this.game.add.text(this.clientX, this.clientY, this.letterArray[0], this.textStyle, this.snakeGroup);
        this.snakeHead.anchor.setTo(0.5, 0.5);
        this.game.physics.enable(this.snakeHead, Phaser.Physics.ARCADE);

        this.numSnakeSections = this.letterArray.length;
        this.snakeSpacer = 2;
        this.snakeSection = [];
        this.snakePath = [];
        this.visiblecounter = 1;

        //  Init snakeSection array
        for (let i = 1; i <= this.numSnakeSections - 1; i++) {
            this.snakeSection[i] = this.game.add.text(this.clientX, this.clientY, this.letterArray[i], this.textStyle, this.snakeGroup);
            this.snakeSection[i].anchor.setTo(0.5, 0.5);
            this.snakeSection[i].alpha = 0;
        }

        //  Init snakePath array
        for (let i = 0; i <= this.numSnakeSections * this.snakeSpacer; i++) {
            this.snakePath[i] = new Phaser.Point(this.clientX, this.clientY);
        }
    }

    mouseMove(e) {
        this.clientX = e.pageX * 2;
        this.clientY = e.pageY * 2;

        if (this.snakeGroup.children.length == 0) {
            this.drawSnake();
        }
    }

    update() {
        if (this.snakeHead && this.snakeHead.body) {
            this.snakeHead.body.velocity.setTo(0, 0);
            this.snakeHead.body.angularVelocity = 0;

            var speed = 1300;

            if (!Phaser.Rectangle.contains(this.snakeHead.body, this.clientX, this.clientY)) {

                /**
                 * If you want the first letter to point at your cursor uncomment this.
                 */
                // this.snakeHead.angle = Math.atan2(this.clientY - this.snakeHead.y, this.clientX - this.snakeHead.x) * 180 / Math.PI;
                this.snakeHead.body.velocity.copyFrom(this.game.physics.arcade.velocityFromAngle(Math.atan2(this.clientY - this.snakeHead.y, this.clientX - this.snakeHead.x) * 180 / Math.PI, speed));

                /**
                 * if you want smooth elastic snake uncomment this.
                 */
                    // this.game.physics.arcade.moveToXY(this.snakeHead,this.clientX, this.clientY, speed, 400);

                var part = this.snakePath.pop();

                part.setTo(this.snakeHead.x, this.snakeHead.y);

                if (this.visiblecounter < this.numSnakeSections) {
                    this.snakeSection[this.visiblecounter].alpha = 1;
                    this.visiblecounter++;
                }
                this.snakePath.unshift(part);

                for (var i = 1; i <= this.numSnakeSections - 1; i++) {
                    this.snakeSection[i].x = (this.snakePath[i * this.snakeSpacer]).x;
                    this.snakeSection[i].y = (this.snakePath[i * this.snakeSpacer]).y;
                }
            }
        }
    }

    shutdown() {
        this.snakeGroup.destroy(true);
        this.snakeHead.destroy();
        $('body').off('mousemove', this.mouseMove.bind(this));
    }

    reverse(s) {
        s = s.split('');
        var len = s.length,
            halfIndex = Math.floor(len / 2) - 1,
            tmp;
        for (var i = 0; i <= halfIndex; i++) {
            tmp = s[len - i - 1];
            s[len - i - 1] = s[i];
            s[i] = tmp;
        }
        return s.join('');
    }
}

export default MouseTrail1;
