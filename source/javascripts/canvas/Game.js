import Boot from './states/Boot';
import Preload from './states/Preload';
import IdleStateListener from './states/IdleStateListener';
import MouseTrail1 from './states/MouseTrail1';
import WindowError from './states/WindowError';

var pjson = require('../../../package.json');

class Game extends Phaser.Game {
    constructor() {
        super(document.getElementById('canvasWrapper').clientWidth * 2, document.getElementById('canvasWrapper').clientHeight * 2, Phaser.AUTO, 'game', null, true);

        this.settings = {};
        this.settings.version = pjson.version;

        this.state.add('Boot', Boot, false);
        this.state.add('Preload', Preload, false);
        this.state.add('IdleStateListener', IdleStateListener, false);
        this.state.add('MouseTrail1', MouseTrail1, false);
        this.state.add('WindowError', WindowError, false);

        this.state.start('Boot');

        this.addListeners();
    }

    addListeners() {
        global.d.on('startStage', (data)=> {
            this.state.start(data.name, true, false, data);
        });

        global.d.on('startStage=Idle', ()=> {
            this.state.start('IdleStateListener');
        });
    }
}

export default Game;