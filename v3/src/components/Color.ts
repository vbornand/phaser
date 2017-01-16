/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* The Color Component allows you to control the alpha, blend mode, tint and background color
* of a Game Object.
*
* @class
*/
export default class Color {

    gameObject;
    state;
    private _dirty;
    private _alpha;
    private _worldAlpha;
    private _blendMode;
    private _tint;
    private _glTint;
    private _hasTint;
    private _r;
    private _g;
    private _b;
    private _a;
    private _rgba;
    private _glBg;
    private _hasBackground: boolean;

    constructor(gameObject) {
        this.gameObject = gameObject;

        this.state = gameObject.state;

        this._dirty = false;

        this._alpha = 1;
        this._worldAlpha = 1;

        this._blendMode = 0;

        this._tint = { topLeft: 0xffffff, topRight: 0xffffff, bottomLeft: 0xffffff, bottomRight: 0xffffff };
        this._glTint = { topLeft: 16777215, topRight: 16777215, bottomLeft: 16777215, bottomRight: 16777215 };
        this._hasTint = false;

        //  Between 0 and 255
        this._r = 0;
        this._g = 0;
        this._b = 0;

        //  Between 0 and 1
        this._a = 1;

        //  String version of RGBA
        this._rgba = '';

        //  32-bit version of ARGB
        this._glBg = 0;

        this._hasBackground = false;
    }

    setBackground(red, green, blue, alpha) {
        if (red === undefined) {
            this._hasBackground = false;
            this._glBg = 0;
        }
        else {
            this._hasBackground = true;
            this._r = red;
            this._g = (green) ? green : 0;
            this._b = (blue) ? blue : 0;
            this._a = (alpha) ? alpha : 1;
        }

        this.dirty = true;
    }

    clearTint() {
        this.setTint(0xffffff);

        this._hasTint = false;
    }

    setTint(topLeft, topRight = topLeft, bottomLeft = topLeft, bottomRight = topLeft) {
        this.tintTopLeft = topLeft;
        this.tintTopRight = topRight;
        this.tintBottomLeft = bottomLeft;
        this.tintBottomRight = bottomRight;

        this._hasTint = true;

        this.dirty = true;
    }

    //  Called by the Dirty Manager
    update() {
        this._dirty = false;

        if (this._hasBackground) {
            this._rgba = 'rgba(' + this._r + ',' + this._g + ',' + this._b + ',' + this._a + ')';
            this._glBg = this.getColor32(this._r, this._g, this._b, this._a);
        }

        //  Tint mults?

    }

    getColor(value) {
        return (value >> 16) + (value & 0xff00) + ((value & 0xff) << 16);
    }

    getColor32(r, g, b, a) {
        a *= 255;

        return ((a << 24) | (b << 16) | (g << 8) | r) >>> 0;
    }

    destroy() {
        this.gameObject = null;
        this.state = null;
        this._tint = [];
    }

    get dirty() {
        return this._dirty;
    }

    set dirty(value) {
        if (value) {
            if (!this._dirty) {
                this._dirty = true;

                this.state.sys.updates.add(this);
            }
        }
        else {
            this._dirty = false;
        }
    }

    get tintTopLeft() {
        return this._tint.topLeft;
    }

    set tintTopLeft(value) {
        this._tint.topLeft = value;
        this._glTint.topLeft = this.getColor(value);
        this.dirty = true;
    }


    get tintTopRight() {
        return this._tint.topRight;
    }

    set tintTopRight(value) {
        this._tint.topRight = value;
        this._glTint.topRight = this.getColor(value);
        this.dirty = true;
    }

    get tintBottomLeft() {
        return this._tint.bottomLeft;
    }

    set tintBottomLeft(value) {
        this._tint.bottomLeft = value;
        this._glTint.bottomLeft = this.getColor(value);
        this.dirty = true;
    }


    get tintBottomRight() {
        return this._tint.bottomRight;
    }

    set tintBottomRight(value) {
        this._tint.bottomRight = value;
        this._glTint.bottomRight = this.getColor(value);
        this.dirty = true;
    }


    get tint() {
        return this._tint;
    }

    set tint(value) {
        this.setTint(value, value, value, value);
    }


    get alpha() {
        return this._alpha;
    }

    set alpha(value) {
        if (value !== this._alpha) {
            this._alpha = value;
            this.dirty = true;
        }
    }


    get blendMode() {
        return this._blendMode;
    }

    set blendMode(value) {
        if (value !== this._blendMode && value >= 0 && value <= 16) {
            this._blendMode = value;
            this.dirty = true;
        }
    }



    get worldAlpha() {
        if (this.gameObject.parent) {
            this._worldAlpha = this._alpha * this.gameObject.parent.color.worldAlpha;
        }

        return this._worldAlpha;
    }

    set worldAlpha(value) {
        this._worldAlpha = this._alpha * value;
    }


    get backgroundAlpha() {
        return this._a;
    }

    set backgroundAlpha(value) {
        if (value !== this._a) {
            this._a = value;
            this._hasBackground = true;
            this.dirty = true;
        }
    }


    get red() {
        return this._r;
    }

    set red(value) {
        if (value !== this._r) {
            this._r = value | 0;
            this._hasBackground = true;
            this.dirty = true;
        }
    }


    get green() {
        return this._g;
    }

    set green(value) {
        if (value !== this._g) {
            this._g = value | 0;
            this._hasBackground = true;
            this.dirty = true;
        }
    }

    get blue() {
        return this._b;
    }

    set blue(value) {
        if (value !== this._b) {
            this._b = value | 0;
            this._hasBackground = true;
            this.dirty = true;
        }
    }
}