export default class VertexBuffer {

    dwordLength;
    dwordCapacity;
    buffer;
    floatView;
    intView;
    uintView;

    constructor(byteSize) {
        this.dwordLength = 0;
        this.dwordCapacity = byteSize / 4;
        this.buffer = new ArrayBuffer(byteSize);
        this.floatView = new Float32Array(this.buffer);
        this.intView = new Int32Array(this.buffer);
        this.uintView = new Uint32Array(this.buffer);
    }

    clear() {
        this.dwordLength = 0;
    }

    getByteLength() {
        return this.dwordLength * 4;
    }

    getByteCapacity() {
        return this.buffer.byteLength;
    }

    allocate(dwordSize) {
        var currentLength = this.dwordLength;
        this.dwordLength += dwordSize;
        return currentLength;
    }

    getUsedBufferAsFloat() {
        return this.floatView.subarray(0, this.dwordLength);
    }

    getUsedBufferAsInt() {
        return this.intView.subarray(0, this.dwordLength);
    }

    getUsedBufferAsUint() {
        return this.uintView.subarray(0, this.dwordLength);
    }
}