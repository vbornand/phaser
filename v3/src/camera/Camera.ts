/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

import * as Component from '../components';
import * as MATH_CONST from '../math/const';
import WrapAngle from '../math/angle/Wrap';
import State from '../state/State';
import Game from '../boot/Game';
import Transform from '../components/Transform';

export default class Camera {

    public state: State;
    public game: Game;
    public viewportWidth: number;
    public viewportHeight: number;
    public transform: Transform;
    public atLimit: { x: boolean, y: boolean };
    public bounds;
    public view: { x: number, y: number };
    public width: number;
    public height: number;

    private _shake;


    /**
    * A Camera is your view into the game world. It has a position and size and renders only those objects within its field of view.
    * The game automatically creates a single Stage sized camera on boot. Move the camera around the world with Phaser.Camera.x/y
    *
    * @class Phaser.Camera
    * @constructor
    * @param {Phaser.Game} game - Game reference to the currently running game.
    * @param {number} id - Not being used at the moment, will be when Phaser supports multiple camera
    * @param {number} x - Position of the camera on the X axis
    * @param {number} y - Position of the camera on the Y axis
    * @param {number} width - The width of the view rectangle
    * @param {number} height - The height of the view rectangle
    */
    constructor(state: State, x: number, y: number, viewportWidth: number, viewportHeight: number) {
        /**
         * The State that this Camera belongs to. A Camera can only belong to one State, and a State only
         * has one Camera.
        * @property {Phaser.State} state
        */
        this.state = state;

        /**
        * @property {Phaser.Game} game - A reference to the currently running Game.
        */
        this.game = state.game;

        this.viewportWidth = viewportWidth;

        this.viewportHeight = viewportHeight;

        this.transform = new Component.Transform(this, x, y);

        /**
        * The Camera is bound to this Rectangle and cannot move outside of it. By default it is enabled and set to the size of the World.
        * The Rectangle can be located anywhere in the world and updated as often as you like. If you don't wish the Camera to be bound
        * at all then set this to null. The values can be anything and are in World coordinates, with 0,0 being the top-left of the world.
        *
        * @property {Phaser.Rectangle} bounds - The Rectangle in which the Camera is bounded. Set to null to allow for movement anywhere.
        */
        // this.bounds = new Phaser.Rectangle(x, y, width, height);

        // this.bounds = new Phaser.Circle(x, y)

        /**
        * @property {boolean} atLimit - Whether this camera is flush with the World Bounds or not.
        */
        this.atLimit = { x: false, y: false };
    };


    /**
    * Method called to ensure the camera doesn't venture outside of the game world.
    * Called automatically by Camera.update.
    *
    * @method Phaser.Camera#checkBounds
    * @protected
    */
    protected checkBounds() {
        this.atLimit.x = false;
        this.atLimit.y = false;

        // var vx = this.view.x + this._shake.x;
        // var vw = this.view.right + this._shake.x;
        // var vy = this.view.y + this._shake.y;
        // var vh = this.view.bottom + this._shake.y;

        var vx = this.x;
        var vw = this.x + this.viewportWidth;
        var vy = this.y;
        var vh = this.y + this.viewportHeight;

        //  Make sure we didn't go outside the cameras bounds
        if (vx <= this.bounds.x * this.scaleX) {
            this.atLimit.x = true;
            this.view.x = this.bounds.x * this.scaleX;

            if (!this._shake.shakeBounds) {
                //  The camera is up against the bounds, so reset the shake
                this._shake.x = 0;
            }
        }

        if (vw >= this.bounds.right * this.scaleX) {
            this.atLimit.x = true;
            this.view.x = (this.bounds.right * this.scaleX) - this.width;

            if (!this._shake.shakeBounds) {
                //  The camera is up against the bounds, so reset the shake
                this._shake.x = 0;
            }
        }

        if (vy <= this.bounds.top * this.scaleY) {
            this.atLimit.y = true;
            this.view.y = this.bounds.top * this.scaleY;

            if (!this._shake.shakeBounds) {
                //  The camera is up against the bounds, so reset the shake
                this._shake.y = 0;
            }
        }

        if (vh >= this.bounds.bottom * this.scaleY) {
            this.atLimit.y = true;
            this.view.y = (this.bounds.bottom * this.scaleY) - this.height;

            if (!this._shake.shakeBounds) {
                //  The camera is up against the bounds, so reset the shake
                this._shake.y = 0;
            }
        }
    }

    get x(): number {
        return this.transform._posX;
    }

    set x(value: number) {
        this.transform._posX = value;
        this.transform.dirty = true;
    }

    get y(): number {
        return this.transform._posY;
    }

    set y(value: number) {
        this.transform._posY = value;
        this.transform.dirty = true;
    }

    get right(): number {
        return this.transform._posX + (this.viewportWidth * this.transform._scaleX);
    }

    get bottom(): number {
        return this.transform._posY + (this.viewportHeight * this.transform._scaleY);
    }

    get scale(): number {
        return this.transform._scaleX;
    }

    set scale(value: number) {
        this.transform._scaleX = value;
        this.transform._scaleY = value;
        this.transform.dirty = true;
        this.transform.updateCache();
    }

    get scaleX(): number {
        return this.transform._scaleX;
    }

    set scaleX(value: number) {
        this.transform._scaleX = value;
        this.transform.dirty = true;
        this.transform.updateCache();
    }

    get scaleY(): number {
        return this.transform._scaleY;
    }

    set scaleY(value: number) {
        this.transform._scaleY = value;
        this.transform.dirty = true;
        this.transform.updateCache();
    }

    get pivotX(): number {
        return this.transform._pivotX;
    }

    set pivotX(value: number) {
        this.transform._pivotX = value;
        this.transform.dirty = true;
        this.transform.updateCache();
    }

    get pivotY(): number {
        return this.transform._pivotY;
    }

    set pivotY(value: number) {
        this.transform._pivotY = value;
        this.transform.dirty = true;
        this.transform.updateCache();
    }

    get angle(): number {
        return WrapAngle(this.rotation * MATH_CONST.RAD_TO_DEG);
    }

    set angle(value: number) {
        this.rotation = WrapAngle(value) * MATH_CONST.DEG_TO_RAD;
    }

    get rotation(): number {
        return this.transform._rotation;
    }

    set rotation(value: number) {
        if (this.transform._rotation === value) {
            return;
        }

        this.transform._rotation = value;
        this.transform.dirty = true;

        if (this.transform._rotation % MATH_CONST.PI2) {
            this.transform.cache.sr = Math.sin(this.transform._rotation);
            this.transform.cache.cr = Math.cos(this.transform._rotation);
            this.transform.updateCache();
            this.transform.hasLocalRotation = true;
        }
        else {
            this.transform.hasLocalRotation = false;
        }
    }

}