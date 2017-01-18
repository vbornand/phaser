export default function (angle: number): number {
    angle = angle % (2 * Math.PI);

    if (angle >= 0) {
        return angle;
    }
    else {
        return angle + 2 * Math.PI;
    }
};