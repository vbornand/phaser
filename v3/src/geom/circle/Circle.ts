import Area from './Area';
import Circumference from './Circumference';
import CircumferencePoint from './CircumferencePoint';
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

export default class Circle
{
    public static Area = Area;
    public static Circumference = Circumference;
    public static CircumferencePoint = CircumferencePoint;
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

    private _radius: number;
    private _diameter: number;

    public x: number;
    public y: number;

    constructor (x: number = 0, y: number = 0, radius: number = 0)
    {
        this.x = x;
        this.y = y;

        this._radius = radius;
        this._diameter = radius * 2;
    }
    
    setTo(x: number, y: number, radius: number): Circle
    {
        this.x = x;
        this.y = y;
        this._radius = radius;
        this._diameter = radius * 2;

        return this;
    }

    setEmpty(): Circle
    {
        return this.setTo(0, 0, 0);
    }

    setPosition(x: number, y: number = x): Circle
    {
        this.x = x;
        this.y = y;
        return this;
    }

    isEmpty(): boolean
    {
        return (this._radius <= 0);
    }

    get radius(): number {
        return this._radius;
    }

    set radius(value: number) {
        this._radius = value;
        this._diameter = value * 2;
    }

    get diameter(): number {
        return this._diameter;
    }

    set diameter(value: number) {
        this._diameter = value;
        this._radius = value * 0.5;
    }

    get left(): number {
        return this.x - this._radius;
    }

    set left(value: number) {
        this.x = value + this._radius;
    }

    get right(): number {
        return this.x + this._radius;
    }

    set right(value: number) {
        this.x = value - this._radius;
    }

    get top(): number {
        return this.y - this._radius;
    }

    set top(value: number) {
        this.y = value + this._radius;
    }

    get bottom(): number {
        return this.y + this._radius;
    }

    set bottom(value: number) {
        this.y = value - this._radius;
    }
};
