var Howl = require('howler').Howl;
import sprite from '../../../dist/assets/sounds/sprite.json';

class Sound {
    constructor() {
        this.sound = new Howl(sprite);
    }

    play(sound) {
        this.sound.play(sound);
    }

    stop(sound) {
        this.sound.fadeOut(0, this.fadeTime);
    }
}

export default Sound;