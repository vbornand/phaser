export default function (target: EventTarget, event: string, listener: EventListenerOrEventListenerObject): void
{
    target.removeEventListener(event, listener);
};