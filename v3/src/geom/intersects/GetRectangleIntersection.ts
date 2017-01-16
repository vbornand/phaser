import Rectangle from '../rectangle/Rectangle';
import RectangleToRectangle from './RectangleToRectangle';

export default function (rectA, rectB, output)
{
    if (output === undefined) { output = new Rectangle(); }

    if (RectangleToRectangle(rectA, rectB))
    {
        output.x = Math.max(rectA.x, rectB.x);
        output.y = Math.max(rectA.y, rectB.y);
        output.width = Math.min(rectA.right, rectB.right) - output.x;
        output.height = Math.min(rectA.bottom, rectB.bottom) - output.y;
    }

    return output;
}