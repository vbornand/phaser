//  Is value a power of 2?
export default function (value: number): boolean {
    return (value > 0 && (value & (value - 1)) === 0);
};