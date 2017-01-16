import Area from './Area';
import Ceil from './Ceil';
import CeilAll from './CeilAll';
import CenterOn from './CenterOn';
import Clone from './Clone';
import Contains from './Contains';
import ContainsPoint from './ContainsPoint';
import ContainsRect from './ContainsRect';
import CopyFrom from './CopyFrom';
import Equals from './Equals';
import FitInside from './FitInside';
import FitOutside from './FitOutside';
import Floor from './Floor';
import FloorAll from './FloorAll';
import GetAspectRatio from './GetAspectRatio';
import GetCenter from './GetCenter';
import GetSize from './GetSize';
import Inflate from './Inflate';
import MergePoints from './MergePoints';
import MergeRect from './MergeRect';
import MergeXY from './MergeXY';
import Offset from './Offset';
import OffsetPoint from './OffsetPoint';
import Overlaps from './Overlaps';
import Perimeter from './Perimeter';
import Random from './Random';
import Scale from './Scale';
import Union from './Union';


//  Encapsulates a 2D rectangle defined by its corner point in the top-left
//  and its extends in x (width) and y (height)

export default class Rectangle {

    x;
    y;
    width;
    height;

    public static Area = Area;
    public static Ceil = Ceil;
    public static CeilAll = CeilAll;
    public static CenterOn = CenterOn;
    public static Clone = Clone;
    public static Contains = Contains;
    public static ContainsPoint = ContainsPoint;
    public static ContainsRect = ContainsRect;
    public static CopyFrom = CopyFrom;
    public static Equals = Equals;
    public static FitInside = FitInside;
    public static FitOutside = FitOutside;
    public static Floor = Floor;
    public static FloorAll = FloorAll;
    public static GetAspectRatio = GetAspectRatio;
    public static GetCenter = GetCenter;
    public static GetSize = GetSize;
    public static Inflate = Inflate;
    public static MergePoints = MergePoints;
    public static MergeRect = MergeRect;
    public static MergeXY = MergeXY;
    public static Offset = Offset;
    public static OffsetPoint = OffsetPoint;
    public static Overlaps = Overlaps;
    public static Perimeter = Perimeter;
    public static Random = Random;
    public static Scale = Scale;
    public static Union = Union;
    
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

    setEmpty()
    {
        return this.setTo(0, 0, 0, 0);
    }

    setPosition(x, y)
    {
        if (y === undefined) { y = x; }

        this.x = x;
        this.y = y;

        return this;
    }

    setSize(width, height)
    {
        if (height === undefined) { height = width; }

        this.width = width;
        this.height = height;

        return this;
    }

    isEmpty()
    {
        return (this.width <= 0 || this.height <= 0);
    }


    get left() {
        return this.x;
    }

    set left(value) {
        if (value >= this.right) {
            this.width = 0;
        }
        else {
            this.width = this.right - value;
        }

        this.x = value;
    }

    get right() {
        return this.x + this.width;
    }

    set right(value) {
        if (value <= this.x) {
            this.width = 0;
        }
        else {
            this.width = value - this.x;
        }
    }

    get top() {
        return this.y;
    }

    set top(value) {
        if (value >= this.bottom) {
            this.height = 0;
            this.y = value;
        }
        else {
            this.height = (this.bottom - value);
        }
    }

    get bottom() {
        return this.y + this.height;
    }

    set bottom(value) {
        if (value <= this.y) {
            this.height = 0;
        }
        else {
            this.height = value - this.y;
        }
    }
}