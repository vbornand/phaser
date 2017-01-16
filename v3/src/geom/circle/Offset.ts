import Circle from './Circle';

export default function (circle: Circle, x: number, y: number): Circle
{
    circle.x += x;
    circle.y += y;

    return circle;
};
