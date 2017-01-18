export default function (value: number, place: number = 0, base: number = 10): number
{
    var p = Math.pow(base, -place);

    return Math.round(value * p) / p;
};