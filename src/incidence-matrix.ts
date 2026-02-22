import Document from "./document";
import { EOperators, Query } from "./query";

export default class IncidenceMatrix {
    corpus: Map<string, string[]>;
    termIdMap: Map<string, number>;
    documentMap: Map<string, Document>;

    constructor() {
        this.corpus = new Map<string, string[]>();
        this.termIdMap = new Map<string, number>();
        this.documentMap = new Map<string, Document>();
    }

    buildDocumentTermMap() {
        for (const [, terms] of this.corpus.entries()) {
            for (const term of terms) {
                if (!this.termIdMap.has(term)) {
                    this.termIdMap.set(term, this.termIdMap.size);
                }
            }
        }

        // scan all words across all documents again and mark the 
        // document map (yes, i know it's redundant, I want to get
        // to more complex concepts):
        for (const [docName, terms] of this.corpus.entries()) {
            const doc: Document = new Document(this.termIdMap.size);
            this.documentMap.set(docName, doc);
            for (const term of terms) {
                const termIdx: number = this.termIdMap.get(term)!;
                doc.setTerm(termIdx);
            }
        }
    }

    addDocumentToCorpus(documentName: string, terms: string[]) {
        this.corpus.set(documentName, terms);
    }

    /**
     * Because there is order of operation defined in this problem 
     * set/ scenario, we can just process the query and operators 
     * from left to right (e.g. no Reverse Polish Notation).
     * 
     * @param query 
     * @returns 
     */
    search(query: Query) : string[] {
        if(query.terms.length === 0) {
            return [];
        }
        const matchedDocs: string[] = [];
        if(query.operator.length === 0) {
            const term = query.terms.shift();
            const termIdx = this.termIdMap.get(term!)!;
            for (const [docName, doc] of this.documentMap.entries()) {
                const hasTerm: boolean = doc.hasTerm(termIdx);
                if (hasTerm) {
                    matchedDocs.push(docName);
                }
            }
        }
        
        while (query.operator.length > 0) {
            const operator: EOperators = query.operator.shift()!;
            const t1: string = query.terms.shift()!;
            const t2: string = query.terms.shift()!;
            const msg = "";
        }
        return matchedDocs;
    }
}
