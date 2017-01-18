export default function (x1: number, y1: number, x2: number, y2: number): number {
    return Math.atan2(x2 - x1, y2 - y1);
};