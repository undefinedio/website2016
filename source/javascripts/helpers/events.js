import {Dispatcher} from 'evently';

class Events {
    constructor() {
        global.d = new Dispatcher();
    }
}

new Events();