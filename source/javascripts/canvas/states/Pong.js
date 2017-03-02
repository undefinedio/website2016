import '../../helpers/events';
import CustomState from "./CustomState";

class Like extends CustomState {
    init(data) {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.options = {
            paddle1: null,
            paddle2: null,
            ball: {x: null, y: null},
            ballOrig: null,
            ballSpeed: {x: 5, y: 5}
        };

        this.scores = [0, 0];
        this.scoreTexts = ['', ''];

        this.fontStyle = {font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle"};
    }

    preload() {
        this.game.load.image('dot', 'assets/images/pong/dot.png');

    }

    create() {
        this.scoreTexts[0] = this.game.add.text(this.game.world.centerX - 50, 50, this.scores[0], this.fontStyle);
        this.scoreTexts[1] = this.game.add.text(this.game.world.centerX + 50, 50, this.scores[1], this.fontStyle);

        this.options.ballOrig = {x: this.game.world.centerX, y: this.game.world.centerY};
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.options.paddle1 = this.createPaddle(20, this.game.world.centerY);
        this.options.paddle2 = this.createPaddle(this.game.world.width - 20, this.game.world.centerY);

        var separator = this.game.add.sprite(this.game.world.centerX, 0, 'dot');
        separator.height = this.game.world.height;
        separator.width = 10;

        this.options.ball = this.game.add.sprite(this.options.ballOrig.x, this.options.ballOrig.y, 'dot');
        this.options.ball.anchor.setTo(0.5, 0.5);
        this.game.physics.arcade.enable(this.options.ball, Phaser.Physics.ARCADE);
    }

    update() {
        this.ai();
        this.game.physics.arcade.collide(this.options.ball, this.options.paddle1, this.paddleCollision.bind(this), null, this);
        this.game.physics.arcade.collide(this.options.ball, this.options.paddle2, this.paddleCollision.bind(this), null, this);

        this.controlPaddle(this.options.paddle1, global.MOUSE_Y << 1);

        this.moveBall();
        this.outOfBounds();
    }

    ai() {
        this.options.paddle2.y = this.options.ball.y;
    }

    moveBall() {
        this.options.ball.x += this.options.ballSpeed.x;
        this.options.ball.y += this.options.ballSpeed.y;
    }

    controlPaddle(paddle, y) {
        paddle.y = y;
    }

    paddleCollision(obj1, obj2) {
        this.options.ballSpeed.x = -this.options.ballSpeed.x;
        this.options.ball.x = this.options.ball.x + 30 - Math.abs(obj2.x - obj1.x); //Fix vertical collision
    }

    outOfBounds() {
        //all this logic can ve avoided using colliderWorldBounds,
        // bounce and velocity properties
        if (this.options.ball.x < 0) {
            this.options.ball.x = this.options.ballOrig.x;
            this.options.ball.y = this.options.ballOrig.y;
            this.options.ballSpeed.x = -this.options.ballSpeed.x;
            this.scores[1]++;
            this.scoreTexts[1].text = this.scores[1];
        }
        if (this.options.ball.x > this.game.world.width) {
            this.options.ball.x = this.options.ballOrig.x;
            this.options.ball.y = this.options.ballOrig.y;
            this.options.ballSpeed.x = -this.options.ballSpeed.x;
            this.scores[0]++;
            this.scoreTexts[0].text = this.scores[0];
        }

        if (this.options.ball.y > this.game.world.height || this.options.ball.y < 0) {
            this.options.ballSpeed.y = -this.options.ballSpeed.y;
        }
    }

    createPaddle(x, y) {
        var paddle = this.game.add.sprite(x, y, 'dot');
        paddle.height = 100;
        paddle.anchor.setTo(0.5, 0.5);
        this.game.physics.arcade.enable(paddle, Phaser.Physics.ARCADE);
        paddle.body.collideWorldBounds = true;

        return paddle;
    }

}

export default Like;
