import Point from '../point';

export default function (line, out)
{
    if (out === undefined) { out = new Point(); }

    out.x = (line.x1 + line.x2) / 2;
    out.y = (line.y1 + line.y2) / 2;

    return out;
}