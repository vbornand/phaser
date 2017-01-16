import * as CONST from '../const';
import GetObjectValue from '../utils/GetObjectValue';

export default class Settings {

    state;
    status;
    op;
    key;
    active;
    visible;
    scaleMode;
    fps;
    x;
    y;
    width;
    height;

    constructor(state, config) {
        if (typeof config === 'string') {
            config = { key: config };
        }
        else if (config === undefined) {
            //  Pass the 'hasOwnProperty' checks
            config = {};
        }

        this.state = state; //  Do we actually need this reference? This could just be a property bucket

        this.status = CONST.state.PENDING;

        //  Which part of this State is currently being processed?
        //  preload, create, update, shutdown, etc
        this.op = CONST.state.BOOT;

        this.key = GetObjectValue(config, 'key', '');
        this.active = GetObjectValue(config, 'active', false);
        this.visible = GetObjectValue(config, 'visible', true);
        this.scaleMode = GetObjectValue(config, 'scaleMode', CONST.scaleModes.DEFAULT);
        this.fps = GetObjectValue(config, 'fps', 60);
        this.x = GetObjectValue(config, 'x', 0);
        this.y = GetObjectValue(config, 'y', 0);

        //  -1 means the State Manager will set it to be the Game dimensions
        this.width = GetObjectValue(config, 'width', -1);
        this.height = GetObjectValue(config, 'height', -1);
    }
}
