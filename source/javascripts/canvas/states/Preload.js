import CustomState from "./CustomState";

class GameState extends CustomState {
    preload() {
        //TODO: preload stuff for the website here
    }

    create() {
        this.state.start('IdleStateListener');
    }
}

export default GameState;
