export enum EOperators {
    AND,
    OR,
    AND_NOT,
};

export class Query {

    terms: string[];
    operator: EOperators[];

    constructor(term: string) {
        this.terms = [ term ];
        this.operator = [];
    }

    and(term: string) : this {
        this.terms.push(term);
        this.operator.push(EOperators.AND);
        return this;
    }

    or(term: string) : this {
        this.terms.push(term);
        this.operator.push(EOperators.OR);
        return this;
    }

    andNot(term: string) : this {
        this.terms.push(term);
        this.operator.push(EOperators.AND_NOT);
        return this;
    }

}
