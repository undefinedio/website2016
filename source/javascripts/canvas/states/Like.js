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

        console.log('start Like State');

        //$('body').on('click', e => {
        //    this.particleBurst();
        //});


        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.stage.backgroundColor = 0x337799;

        this.emitter = this.game.add.emitter(0, 0, 100);
        this.emitter.makeParticles('like');
        this.emitter.gravity = 200;
    }

    particleBurst() {
        console.log("GO PARTICLES GO!");
        this.emitter.x = global.MOUSE_X << 1;
        this.emitter.y = global.MOUSE_Y << 1;
        this.emitter.start(true, 2000, null, 10);
    }

}

export default Like;
