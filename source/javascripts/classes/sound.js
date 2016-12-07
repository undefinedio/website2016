var Howl = require('howler').Howl;
import sprite from '../../../dist/assets/sounds/sprite.json';

class Sound {
    constructor() {
        this.howler = new Howl(sprite);
        this.fadeTime = 1000;

        this.addListeners();
    }

    addListeners() {
        this.lastFocusStatus = document.hasFocus();
        this.checkForFocus();
        setInterval(this.checkForFocus.bind(this), 200);
    }

    play(sound) {
        this.howler.stop();
        this.howler.play(sound);
    }

    stop() {
        //Fadeout with fadeTime
        this.howler.fade(1, 0, this.fadeTime);
    }

    checkForFocus() {
        if (document.hasFocus() == this.lastFocusStatus) {
            return;
        }
        if (document.hasFocus()) {
            //Unpause and unmute when focus has been gained
            this.howler.mute(false);
        } else {
            //Pause and mute when focus had been lost
            this.howler.mute(true);
        }
        this.lastFocusStatus = !this.lastFocusStatus;
    }
}

export default Sound;