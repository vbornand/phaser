import Circle from './Circle';
import Rectangle from '../rectangle';

export default function (circle: Circle, out: Rectangle = new Rectangle()): Rectangle
{
    out.x = circle.left;
    out.y = circle.top;
    out.width = circle.diameter;
    out.height = circle.diameter;

    return out;
};