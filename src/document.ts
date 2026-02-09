export default class Document {
    terms: Uint8Array;
    
    constructor(numTerms: number) {
        // The number of 8 bit chunks required in the Uint8Array 
        // to represent total number of terms:
        const numUInt8Bytes: number = Math.ceil(numTerms / 8);
        this.terms = new Uint8Array(numUInt8Bytes);
    }

    setTerm(termIdx: number) {
        const byteIdx: number = getByteIndex(termIdx);
        const bitIdx: number = getBitIndex(termIdx);
        const oldTermByte: number = this.terms[byteIdx];
        const newTermByte = setBit(oldTermByte, bitIdx);
        this.terms[byteIdx] = newTermByte;
    }

    hasTerm(termIdx: number) : boolean {
        const byteIdx: number = getByteIndex(termIdx);
        const bitIdx: number = getBitIndex(termIdx);
        const termByte: number = this.terms[byteIdx];
        return getBit(termByte, bitIdx);
    }
}

function getByteIndex(termIdx: number) {
    return Math.floor(termIdx / 8);
}

function getBitIndex(termIdx: number) {
    return termIdx % 8;
}

function setBit(bytes: number, bitIdx: number) {
    const bitmask = bitIdx === 0 ? 128 : 128 >> bitIdx;
    return bitmask | bytes;
}

function getBit(bytes: number, bitIdx: number) : boolean {
    const bitmask = bitIdx === 0 ? 128 : 128 >> bitIdx;
    return (bitmask & bytes) === bitmask;
}