import Ellipse from './Ellipse';
import Contains from './Contains';

export default function (ellipse: Ellipse, point: any): boolean
{
    return Contains(ellipse, point.x, point.y);
};