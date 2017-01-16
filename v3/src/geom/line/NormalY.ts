import * as MATH_CONST from '../../math/const';
import Angle from './Angle';

export default function (line)
{
    return Math.sin(Angle(line) - MATH_CONST.TAU);
}
