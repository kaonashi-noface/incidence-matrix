import Document from "./document";

export default class IncidenceMatrix {
    private termIdMap: Map<string, number>;
    private documentMap: Map<string, Document>;

    constructor() {
        this.termIdMap = new Map<string, number>();
        this.documentMap = new Map<string, Document>();
    }

    addDocument(document: string) {
        // 
    }

    addTerm(documentName: string, term: string) {
        // const doc: Document = this.documentMap.get(documentName);
    }

    and(termOne: string, termTwo: string) {
        // 
    }

    or(termOne: string, termTwo: string) {
        // 
    }
}
