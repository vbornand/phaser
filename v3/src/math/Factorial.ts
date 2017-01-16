export default function (value: number) : number
{
    if (value === 0)
    {
        return 1;
    }

    var res: number = value;

    while (--value)
    {
        res *= value;
    }

    return res;
};