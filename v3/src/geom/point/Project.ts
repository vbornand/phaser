import Dot from './Dot';
import Point from './Point';
import GetMagnitudeSq from './GetMagnitudeSq';

export default function (pointA, pointB, out)
{
    if (out === undefined) { out = new Point(); }

    var amt = Dot(pointA, pointB) / GetMagnitudeSq(pointB);

    if (amt !== 0)
    {
        out.x = amt * pointB.x;
        out.y = amt * pointB.y;
    }

    return out;
}
