import CustomState from './CustomState';

class Boot extends CustomState {
    init() {
        this.input.maxPointers = 1;

        // auto pause if window looses focus
        this.stage.disableVisibilityChange = false;
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    }

    preload() {
        //TODO: load crucial sprites and other stuff here
        this.game.load.bitmapFont('monoSpace', 'assets/images/bitmapfont/spacemono-regular_regular_48.PNG', 'assets/images/bitmapfont/spacemono-regular_regular_48.fnt');
    }

    create() {
        this.state.start('Preload');
    }
}

export default Boot;
