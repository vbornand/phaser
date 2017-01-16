import DistanceBetween from '../../math/distance/DistanceBetween';

export default function (circleA, circleB)
{
    return (DistanceBetween(circleA.x, circleA.y, circleB.x, circleB.y) <= (circleA.radius + circleB.radius));
}
