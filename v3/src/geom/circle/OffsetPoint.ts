import Circle from './Circle';

export default function (circle: Circle, point: any): Circle
{
    circle.x += point.x;
    circle.y += point.y;

    return circle;
};