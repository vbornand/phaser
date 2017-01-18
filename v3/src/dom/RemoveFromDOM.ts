export default function (element: Node): void
{
    if (element.parentNode)
    {
        element.parentNode.removeChild(element);
    }
}