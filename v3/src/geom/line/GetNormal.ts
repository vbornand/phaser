import * as MATH_CONST from '../../math/const';
import Angle from './Angle';
import Point from '../point';

export default function (line, out)
{
    if (out === undefined) { out = new Point(); }

    var a = Angle(line) - MATH_CONST.TAU;

    out.x = Math.cos(a);
    out.y = Math.sin(a);

    return out;
}
