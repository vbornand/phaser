import Wrap from '../Wrap';

export default function (angle: number): number {
    return Wrap(angle, -180, 180);
};