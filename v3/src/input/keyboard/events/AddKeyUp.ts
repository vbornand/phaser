import AddEventListener from '../../../dom/AddEventListener';

//  Adds a keyup event listener to the specified target (usually 'window')
export default function (target, listener, useCapture)
{
    AddEventListener(target, 'keyup', listener, useCapture);
};