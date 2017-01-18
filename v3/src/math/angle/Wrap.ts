import MathWrap from '../Wrap';

export default function (angle: number): number {
    return MathWrap(angle, -Math.PI, Math.PI);
};