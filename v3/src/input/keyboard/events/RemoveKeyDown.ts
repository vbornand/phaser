import RemoveEventListener from '../../../dom/RemoveEventListener';

export default function (target, listener)
{
    RemoveEventListener(target, 'keydown', listener);
};