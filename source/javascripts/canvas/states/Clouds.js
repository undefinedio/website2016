import '../../helpers/events';
import CustomState from "./CustomState";
import $ from 'jquery';

class Like extends CustomState {
    init(data) {
        this.imageUrl = data.image;
        this.imageScale = data.scale;
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    }

    preload() {
        this.game.load.image('bg-cloud', 'assets/images/bg-cloud.png');
    }

    create() {
        this.drawClouds();
    }

    drawClouds() {
        for (var i = 0; i < 30; i++) {
            let x = this.game.rnd.realInRange(this.game.world.width / 8, 2 * this.game.world.width);
            let sprite = this.game.add.sprite(x, (this.game.world.randomY - 200), 'bg-cloud', null);

            sprite.scale.set(this.game.rnd.realInRange(0.1, 0.6));
            sprite.alpha = this.game.rnd.realInRange(0.4, 1);

            let speed = this.game.rnd.between(25 * Phaser.Timer.SECOND, 40 * Phaser.Timer.SECOND);

            let tween = this.game.add.tween(sprite).to({x: -100}, speed, null, true, 0, -1, false);
            tween.onUpdateCallback((tween) => {
                if (tween.target.position.x < -30) {
                    tween.target.position.x = this.game.world.width;
                }
            });
        }
    }

    shutdown() {
    }
}

export default Like;
