export default class Document {
    private terms: Uint8Array;
    
    constructor() {
        this.terms = new Uint8Array(1);
    }

    addTerm(termIdx: number, hasTerm: boolean) {
        const byteIdx: number = getByteIndex(termIdx);
        if(!hasTerm && byteIdx < this.terms.length) {
            return; // We don't need to do anything
        }

        // within bounds
        if (byteIdx < this.terms.length) {
            if(hasTerm) {
                this.setTerm(termIdx);
            }
            return;
        }

        const nextTermByte = hasTerm ? new Uint8Array([128]) : new Uint8Array(1);
        this.terms = Buffer.concat([this.terms, nextTermByte]);
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