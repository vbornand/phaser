import Ellipse from './Ellipse';

export default function (ellipse: Ellipse, point): Ellipse
{
    ellipse.x += point.x;
    ellipse.y += point.y;

    return ellipse;
};
