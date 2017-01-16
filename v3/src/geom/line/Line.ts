import Angle from './Angle';
import CenterOn from './CenterOn';
import Clone from './Clone';
import CopyFrom from './CopyFrom';
import Equals from './Equals';
import GetMidPoint from './GetMidPoint';
import GetNormal from './GetNormal';
import GetPointsOnLine from './GetPointsOnLine';
import Height from './Height';
import Length from './Length';
import NormalAngle from './NormalAngle';
import NormalX from './NormalX';
import NormalY from './NormalY';
import PerpSlope from './PerpSlope';
import Random from './Random';
import ReflectAngle from './ReflectAngle';
import Rotate from './Rotate';
import RotateAroundPoint from './RotateAroundPoint';
import RotateAroundXY from './RotateAroundXY';
import SetToAngle from './SetToAngle';
import Slope from './Slope';
import Width from './Width';

//  Defines a Line segment, a part of a line between two endpoints
export default class Line {

    public static Angle = Angle;
    public static CenterOn = CenterOn;
    public static Clone = Clone;
    public static CopyFrom = CopyFrom;
    public static Equals = Equals;
    public static GetMidPoint = GetMidPoint;
    public static GetNormal = GetNormal;
    public static GetPointsOnLine = GetPointsOnLine;
    public static Height = Height;
    public static Length = Length;
    public static NormalAngle = NormalAngle;
    public static NormalX = NormalX;
    public static NormalY = NormalY;
    public static PerpSlope = PerpSlope;
    public static Random = Random;
    public static ReflectAngle = ReflectAngle;
    public static Rotate = Rotate;
    public static RotateAroundPoint = RotateAroundPoint;
    public static RotateAroundXY = RotateAroundXY;
    public static SetToAngle = SetToAngle;
    public static Slope = Slope;
    public static Width = Width;

    x1;
    y1;
    x2;
    y2;

    constructor(x1, y1, x2, y2) {
        if (x1 === undefined) { x1 = 0; }
        if (y1 === undefined) { y1 = 0; }
        if (x2 === undefined) { x2 = 0; }
        if (y2 === undefined) { y2 = 0; }

        this.x1 = x1;

        this.y1 = y1;

        this.x2 = x2;

        this.y2 = y2;
    }


    setTo(x1, y1, x2, y2) {
        if (x1 === undefined) { x1 = 0; }
        if (y1 === undefined) { y1 = 0; }
        if (x2 === undefined) { x2 = 0; }
        if (y2 === undefined) { y2 = 0; }

        this.x1 = x1;
        this.y1 = y1;

        this.x2 = x2;
        this.y2 = y2;

        return this;
    }



    get left() {
        return Math.min(this.x1, this.x2);
    }

    set left(value) {
        if (this.x1 <= this.x2) {
            this.x1 = value;
        }
        else {
            this.x2 = value;
        }
    }



    get right() {
        return Math.max(this.x1, this.x2);
    }

    set right(value) {
        if (this.x1 > this.x2) {
            this.x1 = value;
        }
        else {
            this.x2 = value;
        }
    }


    get top() {
        return Math.min(this.y1, this.y2);
    }

    set top(value) {
        if (this.y1 <= this.y2) {
            this.y1 = value;
        }
        else {
            this.y2 = value;
        }
    }
    
    get bottom() {
        return Math.max(this.y1, this.y2);
    }

    set bottom(value) {
        if (this.y1 > this.y2) {
            this.y1 = value;
        }
        else {
            this.y2 = value;
        }
    }

}
