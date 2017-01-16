import Add from './Add';
import Ceil from './Ceil';
import Clone from './Clone';
import CopyFrom from './CopyFrom';
import Cross from './Cross';
import Divide from './Divide';
import Dot from './Dot';
import Equals from './Equals';
import Floor from './Floor';
import GetCentroid from './GetCentroid';
import GetMagnitude from './GetMagnitude';
import GetMagnitudeSq from './GetMagnitudeSq';
import GetRectangleFromPoints from './GetRectangleFromPoints';
import Interpolate from './Interpolate';
import Invert from './Invert';
import Multiply from './Multiply';
import Negative from './Negative';
import Normalize from './Normalize';
import NormalizeRightHand from './NormalizeRightHand';
import Perp from './Perp';
import Project from './Project';
import ProjectUnit from './ProjectUnit';
import RPerp from './RPerp';
import SetMagnitude from './SetMagnitude';
import Subtract from './Subtract';

export default class Point {

    public static Add = Add;
    public static Ceil = Ceil;
    public static Clone = Clone;
    public static CopyFrom = CopyFrom;
    public static Cross = Cross;
    public static Divide = Divide;
    public static Dot = Dot;
    public static Equals = Equals;
    public static Floor = Floor;
    public static GetCentroid = GetCentroid;
    public static GetMagnitude = GetMagnitude;
    public static GetMagnitudeSq = GetMagnitudeSq;
    public static GetRectangleFromPoints = GetRectangleFromPoints;
    public static Interpolate = Interpolate;
    public static Invert = Invert;
    public static Multiply = Multiply;
    public static Negative = Negative;
    public static Normalize = Normalize;
    public static NormalizeRightHand = NormalizeRightHand;
    public static Perp = Perp;
    public static Project = Project;
    public static ProjectUnit = ProjectUnit;
    public static RPerp = RPerp;
    public static SetMagnitude = SetMagnitude;
    public static Subtract = Subtract;

    x: number;
    y: number;

    constructor(x: number = 0, y: number = x) {
        this.x = x;

        this.y = y;
    }

    setTo (x: number = 0, y: number = x) : Point {
        this.x = x;
        this.y = y;

        return this;
    }
}