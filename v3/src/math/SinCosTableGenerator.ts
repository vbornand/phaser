export default function (length: number, sinAmp: number = 1, cosAmp: number = 1, frequency: number = 1) {
    frequency *= Math.PI / length;

    var cos = [];
    var sin = [];

    for (var c = 0; c < length; c++) {
        cosAmp -= sinAmp * frequency;
        sinAmp += cosAmp * frequency;

        cos[c] = cosAmp;
        sin[c] = sinAmp;
    }

    return {
        sin: sin,
        cos: cos,
        length: length
    };
};