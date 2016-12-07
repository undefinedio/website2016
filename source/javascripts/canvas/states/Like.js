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
        this.game.load.image('like', this.imageUrl);
    }

    create() {
        $('body').on('click', this.particleBurst.bind(this));

        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.emitter = this.game.add.emitter(0, 0, 200);
        this.emitter.makeParticles('like', undefined, undefined, true, true);
        this.emitter.setScale(.5, .3, .5, .3, 10000, Phaser.Easing.Quintic.Out);
        this.emitter.gravity = 100;
        this.emitter.minParticleSpeed.setTo(-300, -300);
        this.emitter.maxParticleSpeed.setTo(300, 300);
        this.emitter.maxParticleScale = 0.4;
        this.emitter.minParticleScale = 0.3;
    }

    particleBurst() {
        this.emitter.x = global.MOUSE_X << 1;
        this.emitter.y = global.MOUSE_Y << 1;
        this.emitter.explode(10000, 5);
    }

    shutdown() {
        $('body').off('click', this.particleBurst.bind(this));
    }
}

export default Like;
