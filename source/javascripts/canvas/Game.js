import Boot from './states/Boot';
import Preload from './states/Preload';
import IdleStateListener from './states/IdleStateListener';
import MouseTrail2 from './states/MouseTrail2';
import PatternBackground from './states/PatternBackground';
import WindowError from './states/WindowError';
import ColorReveal from './states/ColorReveal';
import teamRotor from './states/teamRotor';
import Like from './states/Like';
import Clouds from './states/Clouds';

var pjson = require('../../../package.json');

class Game extends Phaser.Game {
    constructor() {
        super(document.getElementById('canvasWrapper').clientWidth * 2, document.getElementById('canvasWrapper').clientHeight * 2, Phaser.CANVAS, 'game', null, true);

        this.settings = {};

        this.state.add('Boot', Boot, true);
        this.state.start('Boot', true, false);

        this.state.add('Preload', Preload, false);
        this.state.add('IdleStateListener', IdleStateListener, false);
        this.state.add('MouseTrail2', MouseTrail2, false);
        this.state.add('WindowError', WindowError, false);
        this.state.add('ColorReveal', ColorReveal, false);
        this.state.add('TeamRotor', teamRotor, false);
        this.state.add('Like', Like, false);
        this.state.add('PatternBackground', PatternBackground, false);
        this.state.add('Clouds', Clouds, false);

        this.previousState = undefined;

        this.addListeners();
    }

    addListeners() {
        global.d.on('startStage', (data)=> {
            if (data.name != this.previousState || data.forceStart) {
                this.state.start(data.name, true, false, data);
                this.previousState = data.name;
            }
        });

        global.d.on('startStage=Idle', ()=> {
            this.state.start('IdleStateListener');
        });
    }
}

export default Game;