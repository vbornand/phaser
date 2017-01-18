/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

import Game from '../boot/Game';

/**
* Abstracts away the use of RAF or setTimeOut for the core game update loop.
*
* @class Phaser.RequestAnimationFrame
* @constructor
* @param {Phaser.Game} game - A reference to the currently running game.
* @param {boolean} [forceSetTimeOut=false] - Tell Phaser to use setTimeOut even if raf is available.
*/

export default class RequestAnimationFrame {

    public game: Game;
    public isRunning: boolean;
    public tick: number;
    public isSetTimeOut: boolean;
    public timeOutID: number;

    constructor(game: Game) {
        /**
        * @property {Phaser.Game} game - The currently running game.
        */
        this.game = game;

        /**
        * @property {boolean} isRunning - true if RequestAnimationFrame is running, otherwise false.
        * @default
        */
        this.isRunning = false;

        this.tick = 0;

        /**
        * @property {boolean} isSetTimeOut  - True if the browser is using setTimeout instead of rAf.
        */
        this.isSetTimeOut = false;

        /**
        * @property {number} timeOutID - The callback setTimeout or rAf callback ID used when calling cancel.
        */
        this.timeOutID = null;

        var _this = this;

    }


    /**
    * Starts the requestAnimationFrame running or setTimeout if unavailable in browser
    * @method Phaser.RequestAnimationFrame#start
    */
    public start() {
        let _this = this;
        this.isRunning = true;

        if (this.game.config.forceSetTimeOut) {
            this.isSetTimeOut = true;

            this.timeOutID = window.setTimeout(() => {
                _this.tick = Date.now();
            }, 0);
        }
        else {
            this.isSetTimeOut = false;
            this.timeOutID = window.requestAnimationFrame(this.step.bind(this));
        }
    }

    step(timestamp: number) {
        this.tick = timestamp;
        this.timeOutID = window.requestAnimationFrame(this.step.bind(this));
        this.game.update(timestamp);
    }

    /**
    * Stops the requestAnimationFrame from running.
    * @method Phaser.RequestAnimationFrame#stop
    */
    public stop() {
        this.isRunning = false;

        if (this.isSetTimeOut) {
            clearTimeout(this.timeOutID);
        }
        else {
            window.cancelAnimationFrame(this.timeOutID);
        }
    };

    public destroy() {
        this.stop();

        this.game = undefined;
    };

}