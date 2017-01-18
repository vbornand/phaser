export default function (value: number, epsilon: number = 0.0001): number {
    return Math.floor(value + epsilon);
}