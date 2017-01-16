import Ellipse from './Ellipse';

export default function (ellipse: Ellipse, x: number, y: number): Ellipse
{
    ellipse.x += x;
    ellipse.y += y;

    return ellipse;
};
