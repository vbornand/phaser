export default function (x1: number, y1: number, x2: number, y2: number, pow: number = 2) {
    return Math.sqrt(Math.pow(x2 - x1, pow) + Math.pow(y2 - y1, pow));
};