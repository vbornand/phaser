import Ellipse from './Ellipse';

export default function (source: Ellipse): Ellipse
{
    return new Ellipse(source.x, source.y, source.width, source.height);
};
