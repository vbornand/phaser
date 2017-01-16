export default function (rect)
{
    return (rect.height === 0) ? NaN : rect.width / rect.height;
};