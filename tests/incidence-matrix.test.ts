import IncidenceMatrix from "@src/incidence-matrix";
import { Query } from "@src/query";

describe('Incidence Matrix TestSuite - Corpus Building', () => {

    it('should successfully add new term to single Document', () => {
        const docName1: string = "doc1";
        const docName2: string = "doc2";
        const corpus = [
            {
                docName: docName1,
                terms: "word1 word2 word3 word4 word5 word6 word7 word8".split(/\s+/g)
            },
            {
                docName: docName2,
                terms: "abcd word2 efgh word4 ijkl mnop".split(/\s+/g)
            }
        ];
        const matrix = new IncidenceMatrix();
        corpus.forEach(({docName, terms}) => matrix.addDocumentToCorpus(docName, terms));
        matrix.buildDocumentTermMap();

        // 1111 1111 0000 0000 =    255 0
        const actualDoc1 = matrix.documentMap.get(docName1);
        expect(actualDoc1).toBeDefined()
        expect(actualDoc1?.terms[0]).toBe(0b11111111);
        expect(actualDoc1?.terms[1]).toBe(0b00000000);
        // 0101 0000 1111 0000 =    80  240
        const actualDoc2 = matrix.documentMap.get(docName2);
        expect(actualDoc2).toBeDefined()
        expect(actualDoc2?.terms[0]).toBe(0b01010000);
        expect(actualDoc2?.terms[1]).toBe(0b11110000);
    });

});

describe('Incidence Matrix TestSuite - Querying', () => {

    it('should fail to query for a missing term', () => {
        const matrix = new IncidenceMatrix();
        matrix.addDocumentToCorpus("document", [ "term" ])
        matrix.buildDocumentTermMap();
        
        const query: Query = new Query("invalid");
        const actualResults: string[] = matrix.search(query);
        expect(actualResults.length).toBe(0);
    });

    it('should successfully query for a single term', () => {
        const expectedDocument = "document";
        const matrix = new IncidenceMatrix();
        matrix.addDocumentToCorpus(expectedDocument, [ "term" ])
        matrix.buildDocumentTermMap();
        
        const query: Query = new Query("term");
        const actualResults: string[] = matrix.search(query);
        expect(actualResults.length).toBe(1);
        expect(actualResults[0]).toBe(expectedDocument);
    });

    it('should successfully perform an AND query', () => {
        // 
    });

    it('should successfully perform an OR query', () => {
        // 
    });

    it('should successfully perform an AND NOT query', () => {
        // 
    });

    it('should successfully perform complex chained query', () => {
        // 
    });

});