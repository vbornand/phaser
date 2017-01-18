export function In(v: number): number
{
    return v * v * v;
}

export function Out(v: number): number
{
    return --v * v * v + 1;
}

export function InOut(v: number): number
{
    if ((v *= 2) < 1)
    {
        return 0.5 * v * v * v;
    }
    else
    {
        return 0.5 * ((v -= 2) * v * v + 2);
    }
}