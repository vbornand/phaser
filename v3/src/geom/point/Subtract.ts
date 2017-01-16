export default function (point, x, y)
{
    point.x -= x;
    point.y -= y;

    return point;
}