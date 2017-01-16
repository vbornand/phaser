import Contains from './Contains';

export default function (rect, point)
{
    return Contains(rect, point.x, point.y);
};