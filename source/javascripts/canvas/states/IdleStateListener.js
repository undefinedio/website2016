import '../../helpers/events';
import CustomState from "./CustomState";

class IdleState extends CustomState {
    preload() {
        //TODO: load sprites and other stuff for idle state here
    }

    create() {
        //TODO: do stuff that has to be done in Idle state => every page that does not have a scpecial Phaser state
        console.info('canvas is now Idle');
    }
}

export default IdleState;