export default function (value: number, amount: number, min: number): number {
    return Math.max(value - amount, min);
};