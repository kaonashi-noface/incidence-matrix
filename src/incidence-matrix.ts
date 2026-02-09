import Document from "./document";

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

        // scan all words across all documents again (yes, redundant) 
        // and mark the document map:
        for (const [docName, terms] of this.corpus.entries()) {
            const doc: Document = new Document(this.termIdMap.size);
            this.documentMap.set(docName, doc);
            for (const term of terms) {
                /**
                 * Get the term index
                 * Set the term for the current Document
                 */
                const termIdx: number = this.termIdMap.get(term)!;
                doc.setTerm(termIdx);
            }
        }
    }

    addDocumentToCorpus(documentName: string, terms: string[]) {
        this.corpus.set(documentName, terms);
    }

    and(termOne: string, termTwo: string) {
        // 
    }

    or(termOne: string, termTwo: string) {
        // 
    }
}
