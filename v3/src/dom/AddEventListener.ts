export default function (target, event, listener, useCapture)
{
    if (useCapture === undefined) { useCapture = false; }

    target.addEventListener(event, listener, useCapture);
};