import Normalize from './Normalize';
import Multiply from './Multiply';

export default function (point, magnitude)
{
    Normalize(point);

    return Multiply(point, magnitude, magnitude);
}
