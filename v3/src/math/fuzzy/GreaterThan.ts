export default function (a: number, b: number, epsilon: number = 0.0001): boolean {
    return a > b - epsilon;
};