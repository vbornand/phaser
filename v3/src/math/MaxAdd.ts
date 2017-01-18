export default function (value: number, amount: number, max: number): number {
    return Math.min(value + amount, max);
};