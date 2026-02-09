import Document from "./document";

export default class IncidenceMatrix {
    private termIdMap: Map<string, number>;
    private documentMap: Map<string, Document>;

    constructor() {
        this.termIdMap = new Map<string, number>();
        this.documentMap = new Map<string, Document>();
    }

    addDocument(documentName: string) {
        this.documentMap.set(documentName, new Document());
    }

    addTerm(documentName: string, term: string) {
        const haveProcessedTerm: boolean = this.termIdMap.has(term);
        if (!haveProcessedTerm) {
            this.termIdMap.set(term, this.termIdMap.size);
        }
        const termIdx: number = this.termIdMap.get(term)!;

        // TODO: handle new Document edge case
        const doc: Document = this.documentMap.get(documentName)!;
        doc.addTerm(termIdx, true);

    }

    and(termOne: string, termTwo: string) {
        // 
    }

    or(termOne: string, termTwo: string) {
        // 
    }
}
