import Point from './Point';
import Dot from './Dot';

export default function (pointA, pointB, out)
{
    if (out === undefined) { out = new Point(); }

    var amt = Dot(pointA, pointB);

    if (amt !== 0)
    {
        out.x = amt * pointB.x;
        out.y = amt * pointB.y;
    }

    return out;
}
