import Contains from './Contains';
import Circle from './Circle';
import Rectangle from '../rectangle';

export default function (circle: Circle, rect: Rectangle): boolean
{
    return (
        Contains(circle, rect.x, rect.y) &&
        Contains(circle, rect.right, rect.y) &&
        Contains(circle, rect.x, rect.bottom) &&
        Contains(circle, rect.right, rect.bottom)
    );
};