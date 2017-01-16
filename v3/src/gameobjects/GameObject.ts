/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

import * as CONST from '../const';
import * as MATH_CONST from '../math/const';
import * as Component from '../components';
import WrapAngle from '../math/angle/Wrap';

/**
* This is the base Game Object class that you can use when creating your own extended Game Objects.
* It hides away the 'private' stuff and exposes only the useful getters, setters and properties.
*
* @class
*/

//  Phaser.Texture and Phaser.Frame objects passed in here, instead of looked-up.
//  Allows override from non-standard GO types
export default class GameObject {

    state;
    game;
    name;
    type;
    parent;
    texture;
    frame;
    transform;
    data;
    color;
    scaleMode;
    skipRender;
    visible;
    children;
    exists;
    render;

    constructor(state, x, y, texture, frame, parent?) {
        this.state = state;

        this.game = state.game;

        this.name = '';

        this.type = 0;

        this.parent = parent;

        //  Texture is globally shared between GameObjects, not specific to this one
        this.texture = texture;

        //  Frame is globally shared between GameObjects, not specific to this one
        this.frame = frame;

        //  All GameObjects have the following components, always:
        this.transform = new Component.Transform(this, x, y);

        //  Optional? Maybe set on a per GO basis?
        this.data = new Component.Data(this);

        this.color = new Component.Color(this);

        //  ----------------------------------------------------------------
        //  ----------------------------------------------------------------
        //  The following properties are debatable to have in this class
        //  ----------------------------------------------------------------
        //  ----------------------------------------------------------------

        this.scaleMode = CONST.scaleModes.DEFAULT;

        //  Allows you to turn off a GameObject from rendering, but still render its children (if it has any)
        //  Maybe this should move?
        // this.skipRender = (key === undefined);
        this.skipRender = false;

        this.visible = true;

        //  Either null, or the Children component
        this.children = null;

        this.exists = true;
    }

    preUpdate() {
        //  NOOP
    }

    update() {
        //  NOOP
    }

    postUpdate() {
        //  NOOP
    }

    /*render() {
        //  NOOP
    }*/

    destroy() {
        //  NOOP
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
        this.transform.setAnchor(value);
    }


    get anchorX() {
        return this.transform._anchorX;
    }

    set anchorX(value) {
        this.transform._anchorX = value;
        this.transform.dirty = true;
    }

    get anchorY() {
        return this.transform._anchorY;
    }

    set anchorY(value) {
        this.transform._anchorY = value;
        this.transform.dirty = true;
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


    //  Color getters / setters


    get alpha() {
        return this.color._alpha;
    }

    set alpha(value) {
        this.color.alpha = value;
    }

    get blendMode() {
        return this.color._blendMode;
    }

    set blendMode(value) {
        this.color.blendMode = value;
    }
}
