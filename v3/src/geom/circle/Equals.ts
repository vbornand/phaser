import Circle from './Circle';

export default function (circle: Circle, toCompare: Circle): boolean
{
    return (
        circle.x === toCompare.x &&
        circle.y === toCompare.y &&
        circle.radius === toCompare.radius
    );
};