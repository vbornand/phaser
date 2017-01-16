import AddEventListener from '../../../dom/AddEventListener';

//  Adds a keydown event listener to the specified target (usually 'window')
export default function (target, listener, useCapture)
{
    AddEventListener(target, 'keydown', listener, useCapture);
};