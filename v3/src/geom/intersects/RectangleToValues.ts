export default function (rect, left, right, top, bottom, tolerance = 0)
{
    return !(
        left > rect.right + tolerance ||
        right < rect.left - tolerance ||
        top > rect.bottom + tolerance ||
        bottom < rect.top - tolerance
    );
}