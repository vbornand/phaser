import Point from './Point';

export default function (point, out)
{
    if (out === undefined) { out = new Point(); }

    return out.setTo(-point.x, -point.y);
}