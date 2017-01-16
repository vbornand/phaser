import Ellipse from './Ellipse';

export default function (ellipse: Ellipse, toCompare: Ellipse): boolean
{
    return (
        ellipse.x === toCompare.x &&
        ellipse.y === toCompare.y &&
        ellipse.width === toCompare.width &&
        ellipse.height === toCompare.height
    );
};
