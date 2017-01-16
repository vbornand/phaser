import Area from './Area';
import Clone from './Clone';
import Contains from './Contains';
import ContainsPoint from './ContainsPoint';
import ContainsRect from './ContainsRect';
import CopyFrom from './CopyFrom';
import Equals from './Equals';
import GetBounds from './GetBounds';
import Offset from './Offset';
import OffsetPoint from './OffsetPoint';
import Random from './Random';

export default class Ellipse {

    public static Area = Area;
    public static Clone = Clone;
    public static Contains = Contains;
    public static ContainsPoint = ContainsPoint;
    public static ContainsRect = ContainsRect;
    public static CopyFrom = CopyFrom;
    public static Equals = Equals;
    public static GetBounds = GetBounds;
    public static Offset = Offset;
    public static OffsetPoint = OffsetPoint;
    public static Random = Random;

    public x: number;
    public y: number;
    public width: number;
    public height: number;

    constructor(x = 0, y = 0, width = 0, height = 0) {
        this.x = x;

        this.y = y;

        this.width = width;

        this.height = height;
    }

    setTo (x, y, width, height)
    {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        return this;
    }

    setEmpty ()
    {
        return this.setTo(0, 0, 0, 0);
    }

    setPosition (x, y)
    {
        if (y === undefined) { y = x; }

        this.x = x;
        this.y = y;

        return this;
    }

    setSize (width, height)
    {
        if (height === undefined) { height = width; }

        this.width = width;
        this.height = height;

        return this;
    }

    isEmpty ()
    {
        return (this.width <= 0 || this.height <= 0);
    }

    //  AKA Semi Minor Axis
    getMinorRadius ()
    {
        return Math.min(this.width, this.height) / 2;
    }

    //  AKA Semi Major Axis
    getMajorRadius ()
    {
        return Math.max(this.width, this.height) / 2;
    }

    get left () {
        return this.x;
    }

    set left (value) {
        if (value >= this.right) {
            this.width = 0;
        }
        else {
            this.width = this.right - value;
        }

        this.x = value;
    }

    get right () {
        return this.x + this.width;
    }

    set right (value) {
        if (value <= this.x) {
            this.width = 0;
        }
        else {
            this.width = value - this.x;
        }
    }

    get top () {
        return this.y;
    }

    set top (value) {
        if (value >= this.bottom) {
            this.height = 0;
            this.y = value;
        }
        else {
            this.height = (this.bottom - value);
        }
    }

    get bottom () {
        return this.y + this.height;
    }

    set bottom (value) {
        if (value <= this.y) {
            this.height = 0;
        }
        else {
            this.height = value - this.y;
        }
    }
}