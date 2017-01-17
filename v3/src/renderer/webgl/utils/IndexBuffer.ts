export default class IndexBuffer {

    wordLength;
    wordCapacity;
    buffer;
    shortView;
    wordView;
    dwordLength;

    constructor(byteSize) {
        this.wordLength = 0;
        this.wordCapacity = byteSize / 2;
        this.buffer = new ArrayBuffer(byteSize);
        this.shortView = new Int16Array(this.buffer);
        this.wordView = new Uint16Array(this.buffer);
    }

    clear() {
        this.wordLength = 0;
    }

    getByteLength() {
        return this.wordLength * 2;
    }

    getByteCapacity() {
        return this.buffer.byteLength;
    }

    allocate(wordSize) {
        var currentLength = this.wordLength;
        this.wordLength += wordSize;
        return currentLength;
    }

    getUsedBufferAsShort() {
        return this.shortView.subarray(0, this.dwordLength);
    }

    getUsedBufferAsWord() {
        return this.wordView.subarray(0, this.dwordLength);
    }
}
