import Line from './Line';

export default function (source)
{
    return new Line(source.x1, source.y1, source.x2, source.y2);
}
