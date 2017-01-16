import Ellipse from './Ellipse';

export default function (ellipse: Ellipse): number
{
    if (ellipse.isEmpty())
    {
        return 0;
    }

    //  units squared
    return (ellipse.getMajorRadius() * ellipse.getMinorRadius() * Math.PI);
};
