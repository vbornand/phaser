export default function (point, angle)
{
    var x = point.x;
    var y = point.y;

    point.x = (x * Math.cos(angle)) - (y * Math.sin(angle));
    point.y = (x * Math.sin(angle)) + (y * Math.cos(angle));

    return point;
};