/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* Dirty! Manager
*
* @class
*/
export default class UpdateManager
{
    state;
    game;
    list;
    running;
    processed;

    constructor(state)
    {
        this.state = state;

        this.game = state.game;

        this.list = [];

        // this.i = 1;

        this.running = false;

        this.processed = 0;
    }

    stop()
    {
        if (!this.running) {
            return;
        }

        // console.log(this.i, 'UpdateManager.stop', this.processed);

        this.list.length = 0;

        // this.i++;
    }

    start()
    {
        if (!this.running) {
            return;
        }

        var len = this.list.length;

        if (len === 0) {
            return;
        }

        // console.log(this.i, 'UpdateManager.start', len);

        this.processed = 0;

        for (var i = 0; i < len; i++) {
            //  Because it may have already been processed (as a child of another Transform that was updated)
            if (this.list[i] && this.list[i]._dirty) {
                this.processed++;
                this.list[i].update();
            }
        }
    }

    add(transform)
    {
        this.list.push(transform);
    }
}