import Document from "@src/document";


describe('Document TestSuite', () => {

    it('should successfully set the value of an existing term to true', () => {
        const doc: Document = new Document();
        doc.setTerm(4);

        const hasTerm = doc.hasTerm(4);
        expect(hasTerm).toBe(true);
    });

    it('should successfully add a new term to current term byte list', () => {
        const doc: Document = new Document();
        doc.addTerm(2, true);

        const hasTerm = doc.hasTerm(2);
        expect(hasTerm).toBe(true);
    });

    it('should successfully add a new term to overflow term byte list', () => {
        const doc: Document = new Document();
        doc.addTerm(8, true);

        const hasTerm = doc.hasTerm(8);
        expect(hasTerm).toBe(true);
    });
    
});