export default function (x1: number, y1: number, x2: number, y2: number): number {
    var dx = x1 - x2;
    var dy = y1 - y2;

    return dx * dx + dy * dy;
};