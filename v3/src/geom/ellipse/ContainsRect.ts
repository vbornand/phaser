import Ellipse from './Ellipse';
import Contains from './Contains';
import Rectangle from '../rectangle';

export default function (ellipse: Ellipse, rect: Rectangle): boolean
{
    return (
        Contains(ellipse, rect.x, rect.y) &&
        Contains(ellipse, rect.right, rect.y) &&
        Contains(ellipse, rect.x, rect.bottom) &&
        Contains(ellipse, rect.right, rect.bottom)
    );
};
