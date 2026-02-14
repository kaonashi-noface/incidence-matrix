enum EOperators {
    AND,
    OR,
    NOT,
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

    not(term: string) : this{
        this.terms.push(term);
        this.operator.push(EOperators.NOT);
        return this;
    }

}
