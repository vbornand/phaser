//  Takes value and returns the nearest power of 2
export default function (value: number): number {
    //  Math.log(2)
    var index = Math.log(value) / 0.6931471805599453;

    return (1 << Math.ceil(index));
}