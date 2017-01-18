export default function (a: number, b: number, base: number = 0): number {
    if (a > b || base > b) {
        return 1;
    }
    else if (a < base || base > a) {
        return 0;
    }
    else {
        return (a - base) / b;
    }
};
