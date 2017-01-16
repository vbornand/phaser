export default function (rect, point)
{
    rect.x += point.x;
    rect.y += point.y;

    return rect;
};