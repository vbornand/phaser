export default function (x: number, min: number, max: number): number {
    x = Math.max(0, Math.min(1, (x - min) / (max - min)));

    return x * x * (3 - 2 * x);
};