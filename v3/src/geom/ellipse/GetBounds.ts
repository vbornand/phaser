import Rectangle from '../rectangle';
import Ellipse from './Ellipse';

export default function (ellipse: Ellipse, out: Rectangle = new Rectangle()): Rectangle
{
    out.x = ellipse.x - ellipse.width;
    out.y = ellipse.y - ellipse.height;
    out.width = ellipse.width;
    out.height = ellipse.height;

    return out;
}