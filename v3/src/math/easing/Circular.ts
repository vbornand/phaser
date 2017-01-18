export function In(v: number): number {
    return 1 - Math.sqrt(1 - v * v);
}

export function Out(v: number): number {
    return Math.sqrt(1 - (--v * v));
}

export function InOut(v: number): number {
    if ((v *= 2) < 1) {
        return -0.5 * (Math.sqrt(1 - v * v) - 1);
    }
    else {
        return 0.5 * (Math.sqrt(1 - (v -= 2) * v) + 1);
    }
}