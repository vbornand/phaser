export default function (value: number, gap: number, start: number = 0): number {
    if (gap === 0) {
        return value;
    }

    value -= start;
    value = gap * Math.round(value / gap);

    return start + value;
};