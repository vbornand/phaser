export default function (values: number[]): number {
    var sum: number = 0;

    for (var i: number = 0; i < values.length; i++) {
        sum += (+values[i]);
    }

    return sum / values.length;
}