import Document from "@src/document";


describe('Document TestSuite', () => {

    it('should successfully set the value of an existing term to true', () => {
        const doc: Document = new Document();
        doc.setTerm(4);

        const hasTerm = doc.hasTerm(4);
        expect(hasTerm).toBe(true);
    });

    it.skip('should successfully add a new term to overflow term list', () => {
        const doc: Document = new Document();
        doc.addTerm(32, true);

        const hasTerm = doc.hasTerm(0);
        expect(hasTerm).toBe(true);
    });
    
});