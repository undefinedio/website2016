import CustomState from './CustomState';

class Boot extends CustomState {
    init(data) {
        this.input.maxPointers = 1;

        // auto pause if window looses focus
        this.stage.disableVisibilityChange = false;
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.refresh();

        if (this.game.device.android && this.game.device.chrome == false) {
            this.game.stage.scaleMode = Phaser.ScaleManager.EXACT_FIT;
        }
    }

    preload() {
        //TODO: load crucial sprites and other stuff here,
        // But also do this in the corresponding state
        this.game.load.bitmapFont('monoSpace', 'assets/images/bitmapfont/spacemono-regular_regular_48.PNG', 'assets/images/bitmapfont/spacemono-regular_regular_48.fnt');

        this.game.load.image('bg-cloud', 'assets/images/bg-cloud.png');

        this.game.load.image('lolology-doge', 'assets/images/lolology/lolology-doge.png');
        this.game.load.image('lolology-pepe', 'assets/images/lolology/lolology-pepe.png');
        this.game.load.image('lolology-lol-yellow', 'assets/images/lolology/lolology-lol-yellow.png');
        this.game.load.image('lolology-lol', 'assets/images/lolology/lolology-lol.png');
        this.game.load.image('lolology-troll', 'assets/images/lolology/lolology-troll.png');
    }

    create() {
        this.state.start('Preload');
        global.d.dispatch("PreloadReady");
    }
}

export default Boot;
