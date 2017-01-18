import Normalize from './Normalize';

export default function (angle: number): number {
    return Normalize(angle + Math.PI);
};