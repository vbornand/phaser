import Pad from '../../string/Pad';
import CheckMatrix from './CheckMatrix';

//  Generates a string (which you can pass to console.log) from the given
//  Array Matrix.

 export default function (matrix)
 {
    var str = '';

    if (!CheckMatrix(matrix))
    {
        return str;
    }

    for (var r = 0; r < matrix.length; r++)
    {
        for (var c = 0; c < matrix[r].length; c++)
        {
            var cell = matrix[r][c].toString();

            if (cell !== 'undefined')
            {
                str += Pad(cell, 2);
            }
            else
            {
                str += '?';
            }

            if (c < matrix[r].length - 1)
            {
                str += ' |';
            }
        }

        if (r < matrix.length - 1)
        {
            str += '\n';

            for (var i = 0; i < matrix[r].length; i++)
            {
                str += '---';

                if (i < matrix[r].length - 1)
                {
                    str += '+';
                }
            }

            str += '\n';
        }

    }

    return str;
};
