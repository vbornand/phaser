/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

import * as MATH_CONST from '../math/const';
import WrapAngle from '../math/angle/Wrap';
import Transform from './Transform';

/**
* A BaseTransform class that you can use when extending Game Objects.
* Hides away the 'private' stuff and exposes only the useful getters and setters
*
* @class
*/
export default class BaseTransform {

    transform;


    constructor(x, y) {
        this.transform = new Transform(this, x, y);
    }

    get x() {
        return this.transform._posX;
    }

    set x(value) {
        this.transform._posX = value;
        this.transform.dirty = true;
    }


    get y() {
        return this.transform._posY;
    }

    set y(value) {
        this.transform._posY = value;
        this.transform.dirty = true;
    }

    get scale() {
        return this.transform._scaleX;
    }

    set scale(value) {
        this.transform._scaleX = value;
        this.transform._scaleY = value;
        this.transform.dirty = true;
        this.transform.updateCache();
    }


    get scaleX() {
        return this.transform._scaleX;
    }

    set scaleX(value) {
        this.transform._scaleX = value;
        this.transform.dirty = true;
        this.transform.updateCache();
    }


    get scaleY() {
        return this.transform._scaleY;
    }

    set scaleY(value) {
        this.transform._scaleY = value;
        this.transform.dirty = true;
        this.transform.updateCache();
    }



    get anchor() {
        return this.transform._anchorX;
    }

    set anchor(value) {
        this.transform._anchorX = value;
        this.transform._anchorY = value;
    }



    get anchorX() {
        return this.transform._anchorX;
    }

    set anchorX(value) {
        this.transform._anchorX = value;
    }



    get anchorY() {
        return this.transform._anchorY;
    }

    set anchorY(value) {
        this.transform._anchorY = value;
    }



    get pivotX() {
        return this.transform._pivotX;
    }

    set pivotX(value) {
        this.transform._pivotX = value;
        this.transform.dirty = true;
        this.transform.updateCache();
    }

    get pivotY() {
        return this.transform._pivotY;
    }

    set pivotY(value) {
        this.transform._pivotY = value;
        this.transform.dirty = true;
        this.transform.updateCache();
    }

    get angle() {
        return WrapAngle(this.rotation * MATH_CONST.RAD_TO_DEG);
    }

    set angle(value) {
        this.rotation = WrapAngle(value) * MATH_CONST.DEG_TO_RAD;
    }

    get rotation() {
        return this.transform._rotation;
    }

    set rotation(value) {
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