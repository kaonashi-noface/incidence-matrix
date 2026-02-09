import Document from "@src/document";


describe('Document TestSuite', () => {

    it('should successfully create empty Document', () => {
        const doc: Document = new Document(1);

        const hasTerm = doc.hasTerm(3);
        expect(hasTerm).toBe(false);
    });

    it('should successfully set the value of a term to true', () => {
        const doc: Document = new Document(1);
        doc.setTerm(4);

        const hasTerm = doc.hasTerm(4);
        expect(hasTerm).toBe(true);
    });

    it('should successfully set the value of a term in the next byte to true', () => {
        const doc: Document = new Document(9);
        doc.setTerm(8);

        const hasTerm = doc.hasTerm(8);
        expect(hasTerm).toBe(true);
        expect(doc.terms[0]).toBe(0b00000000);
        expect(doc.terms[1]).toBe(0b10000000);
    });

});