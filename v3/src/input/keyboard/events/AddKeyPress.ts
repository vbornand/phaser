import AddEventListener from '../../../dom/AddEventListener';

//  Adds a keypress event listener to the specified target (usually 'window')
export default function (target, listener, useCapture)
{
    AddEventListener(target, 'keypress', listener, useCapture);
};