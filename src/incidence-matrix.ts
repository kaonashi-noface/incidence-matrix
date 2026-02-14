import Document from "./document";
import { Query } from "./query";

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

    search(query: Query) : Uint8Array {
        // TODO: implement later
        return new Uint8Array();
    }
}
