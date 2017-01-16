import Circle from './Circle';

export default function (source: Circle): Circle
{
    return new Circle(source.x, source.y, source.radius);
};