export default function (value: number, min: number, max: number): number {
    var range = max - min;

    if (range <= 0) {
        return 0;
    }

    var result = (value - min) % range;

    if (result < 0) {
        result += range;
    }

    return result + min;
};