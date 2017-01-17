import Attribute from './Attribute';

export default function (gl, program, name, size, type, normalized, stride, offset)
{
    return new Attribute(
        gl.getAttribLocation(program, name),
        size,
        type,
        normalized,
        stride,
        offset
    );
}