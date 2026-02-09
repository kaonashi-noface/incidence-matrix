import IncidenceMatrix from "@src/incidence-matrix";
import Document from "@src/document";

describe('Incidence Matrix TestSuite', () => {

    it('should successfully add new term to single Document', () => {
        const docName: string = "doc";
        const term: string = "hello";
        const matrix: IncidenceMatrix = new IncidenceMatrix();
        matrix.addTerm(docName, term);

        const doc: Document = matrix.getDocument(docName)!;
        const termIdx: number | undefined = matrix.getTermIndex(term);
        expect(termIdx).toBeDefined();

        const hasTerm: boolean = doc.hasTerm(termIdx!);
        expect(hasTerm).toBe(true);
    });

    it('should successfully successfully parse two Documents', () => {
        const corpus = [
            {
                docName: "doc1",
                terms: "the mysterious air pirate whose robberies were ruining transcontinental airways".split(/\s+/g)
            },
            {
                docName: "doc2",
                terms: "the pirate wade was a brilliant but neurotic chemist who had discovered among other things the secret of invisibility".split(/\s+/g)
            }
        ];
        // TODO: finish unit test here...
    });

});