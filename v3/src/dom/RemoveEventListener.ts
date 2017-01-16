export default function (target, event, listener)
{
    target.removeEventListener(event, listener);
};