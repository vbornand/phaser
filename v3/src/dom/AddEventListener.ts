export default function (target: EventTarget, event: string, listener?: EventListenerOrEventListenerObject, useCapture: boolean = false): void
{
    target.addEventListener(event, listener, useCapture);
};