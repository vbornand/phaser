/**
* Copies the x, y and diameter properties from any given object to this Circle.
* @method Phaser.Circle#copyFrom
* @param {any} source - The object to copy from.
* @return {Circle} This Circle object.
*/
export default function (source, dest)
{
    return dest.setTo(source.x, source.y);
}
