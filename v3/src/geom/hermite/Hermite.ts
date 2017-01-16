import Point from '../point';
import GetAngle from './GetAngle';
import GetAngleWithDistance from './GetAngleWithDistance';
import GetEntryTangent from './GetEntryTangent';
import GetPoint from './GetPoint';
import GetPointWithDistance from './GetPointWithDistance';
import GetX from './GetX';
import GetY from './GetY';

/**
* @author       Richard Davey <rich@photonstorm.com>
* @author       Pete Baron <pete@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* A data representation of a Hermite Curve (see http://en.wikipedia.org/wiki/Cubic_Hermite_spline)
* 
* A Hermite curve has a start and end point and tangent vectors for both of them.
* The curve will always pass through the two control points and the shape of it is controlled
* by the length and direction of the tangent vectors.  At the control points the curve will
* be facing exactly in the vector direction.
* 
* As these curves change speed (speed = distance between points separated by an equal change in
* 't' value - see Hermite.getPoint) this class attempts to reduce the variation by pre-calculating
* the `accuracy` number of points on the curve. The straight-line distances to these points are stored
* in the private 'points' array, and this information is used by Hermite.findT() to convert a pixel
* distance along the curve into a 'time' value.
* 
* Higher `accuracy` values will result in more even movement, but require more memory for the points
* list. 5 works, but 10 seems to be an ideal value for the length of curves found in most games on
* a desktop screen. If you use very long curves (more than 400 pixels) you may need to increase
* this value further.
*
* @class Phaser.Hermite
* @constructor
* @param {number} p1x - The x coordinate of the start of the curve.
* @param {number} p1y - The y coordinate of the start of the curve.
* @param {number} p2x - The x coordinate of the end of the curve.
* @param {number} p2y - The y coordinate of the end of the curve.
* @param {number} v1x - The x component of the tangent vector for the start of the curve.
* @param {number} v1y - The y component of the tangent vector for the start of the curve.
* @param {number} v2x - The x component of the tangent vector for the end of the curve.
* @param {number} v2y - The y component of the tangent vector for the end of the curve.
* @param {number} [accuracy=10] The amount of points to pre-calculate on the curve.
*/
export default class Hermite {
    public static GetAngle = GetAngle;
    public static GetAngleWithDistance = GetAngleWithDistance;
    public static GetEntryTangent = GetEntryTangent;
    public static GetPoint = GetPoint;
    public static GetPointWithDistance = GetPointWithDistance;
    public static GetX = GetX;
    public static GetY = GetY;

    private _accuracy;
    private _p1x;
    private _p1y;
    private _p2x;
    private _p2y;
    private _v1x;
    private _v1y;
    private _v2x;
    private _v2y;
    private _points;
    private _temp1;
    private _temp2;
    private _ax;
    private _ay;
    private _bx;
    private _by;
    private length;

    constructor(p1x, p1y, p2x, p2y, v1x, v1y, v2x, v2y, accuracy: number = 10) {
        /**
        * @property {number} _accuracy - The amount of points to pre-calculate on the curve.
        * @private
        */
        this._accuracy = accuracy;

        /**
        * @property {number} _p1x - The x coordinate of the start of the curve.
        * @private
        */
        this._p1x = p1x;

        /**
        * @property {number} _p1y - The y coordinate of the start of the curve.
        * @private
        */
        this._p1y = p1y;

        /**
        * @property {number} _p2x - The x coordinate of the end of the curve.
        * @private
        */
        this._p2x = p2x;

        /**
        * @property {number} _p2y - The y coordinate of the end of the curve.
        * @private
        */
        this._p2y = p2y;

        /**
        * @property {number} _v1x - The x component of the tangent vector for the start of the curve.
        * @private
        */
        this._v1x = v1x;

        /**
        * @property {number} _v1y - The y component of the tangent vector for the start of the curve.
        * @private
        */
        this._v1y = v1y;

        /**
        * @property {number} _v2x - The x component of the tangent vector for the end of the curve.
        * @private
        */
        this._v2x = v2x;

        /**
        * @property {number} _v2y - The y component of the tangent vector for the end of the curve.
        * @private
        */
        this._v2y = v2y;

        /**
        * @property {array} _points - A local array of cached points.
        * @private
        */
        this._points = [];

        /**
        * @property {Phaser.Point} _temp1 - A local cached Point object.
        * @private
        */
        this._temp1 = new Point();

        /**
        * @property {Phaser.Point} _temp2 - A local cached Point object.
        * @private
        */
        this._temp2 = new Point();

        this.recalculate();
    }

    /**
    * Performs the curve calculations.
    *
    * This is called automatically if you change any of the curves public properties, such as `Hermite.p1x` or `Hermite.v2y`.
    *
    * If you adjust any of the internal private values, then call this to update the points.
    *
    * @method Phaser.Hermite#recalculate
    * @return {Phaser.Hermite} This object.
    */
    recalculate() {

        this._ax = (2 * this._p1x - 2 * this._p2x + this._v1x + this._v2x);
        this._ay = (2 * this._p1y - 2 * this._p2y + this._v1y + this._v2y);
        this._bx = (-3 * this._p1x + 3 * this._p2x - 2 * this._v1x - this._v2x);
        this._by = (-3 * this._p1y + 3 * this._p2y - 2 * this._v1y - this._v2y);

        this.length = this.calculateEvenPoints();

        return this;

    }

    getPoint(curve, t) {
        return GetPoint(curve, t, this);
    }

    /**
    * Calculate a number of points along the curve, based on `Hermite.accuracy`, and stores them in the private `_points` array.
    *
    * @method Phaser.Hermite#calculateEvenPoints
    * @return {number} The total length of the curve approximated as straight line distances between the points.
    */
    calculateEvenPoints() {

        var totalLength = 0;

        this._temp1.setTo(0, 0);                    //  pnt
        this._temp2.setTo(this._p1x, this._p1y);    //  lastPnt

        this._points[0] = 0;

        for (var i = 1; i <= this._accuracy; i++) {
            this.getPoint(i / this._accuracy, this._temp1);
            totalLength += this._temp1.distance(this._temp2);
            this._points[i] = totalLength;
            this._temp2.copyFrom(this._temp1);
        }

        return totalLength;

    }

    get accuracy() {
        return this._accuracy;
    }

    set accuracy(value) {
        if (value !== this._accuracy) {
            this._accuracy = value;
            this.recalculate();
        }
    }
    /**
    * @name Phaser.Hermite#p1x
    * @property {number} p1x - The x coordinate of the start of the curve. Setting this value will recalculate the curve.
    */


    get p1x() {

        return this._p1x;

    }

    set p1x(value) {

        if (value !== this._p1x) {
            this._p1x = value;
            this.recalculate();
        }

    }


    /**
    * @name Phaser.Hermite#p1y
    * @property {number} p1y - The y coordinate of the start of the curve. Setting this value will recalculate the curve.
    */
    get p1y() {

        return this._p1y;

    }

    set p1y(value) {

        if (value !== this._p1y) {
            this._p1y = value;
            this.recalculate();
        }

    }

    /**
    * @name Phaser.Hermite#p2x
    * @property {number} p2x - The x coordinate of the end of the curve. Setting this value will recalculate the curve.
    */

    get p2x() {

        return this._p2x;

    }

    set p2x(value) {

        if (value !== this._p2x) {
            this._p2x = value;
            this.recalculate();
        }

    }


    /**
    * @name Phaser.Hermite#p2y
    * @property {number} p2y - The y coordinate of the end of the curve. Setting this value will recalculate the curve.
    */

    get p2y() {

        return this._p2y;

    }

    set p2y(value) {

        if (value !== this._p2y) {
            this._p2y = value;
            this.recalculate();
        }

    }



    /**
    * @name Phaser.Hermite#v1x
    * @property {number} v1x - The x component of the tangent vector for the start of the curve. Setting this value will recalculate the curve.
    */
    get v1x() {

        return this._v1x;

    }

    set v1x(value) {

        if (value !== this._v1x) {
            this._v1x = value;
            this.recalculate();
        }
    }




    /**
    * @name Phaser.Hermite#v1y
    * @property {number} v1y - The y component of the tangent vector for the start of the curve. Setting this value will recalculate the curve.
    */

    get v1y() {

        return this._v1y;

    }

    set v1y(value) {

        if (value !== this._v1y) {
            this._v1y = value;
            this.recalculate();
        }

    }

    /**
    * @name Phaser.Hermite#v2x
    * @property {number} v2x - The x component of the tangent vector for the end of the curve. Setting this value will recalculate the curve.
    */

    get v2x() {

        return this._v2x;

    }

    set v2x(value) {

        if (value !== this._v2x) {
            this._v2x = value;
            this.recalculate();
        }
    }





    /**
    * @name Phaser.Hermite#v2y
    * @property {number} v2y - The y component of the tangent vector for the end of the curve. Setting this value will recalculate the curve.
    */


    get v2y() {

        return this._v2y;

    }

    set v2y(value) {

        if (value !== this._v2y) {
            this._v2y = value;
            this.recalculate();
        }
    }
}