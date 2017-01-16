import Wrap from '../../math/Wrap';
import * as MATH_CONST from '../../math/const';
import Angle from './Angle';

export default function (line)
{
    var angle = Angle(line) - MATH_CONST.TAU;

    return Wrap(angle, -Math.PI, Math.PI);
}