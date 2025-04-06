package com.search.core;

import java.util.LinkedList;
import java.util.List;

public class Query {
    List<String> terms = new LinkedList<>();
    List<Operator> operators = new LinkedList<>();

    public void addTerm(String term) {
        this.terms.add(term);
    }

    public String getTerm() {
        if(this.terms.isEmpty()) {
            return null;
        }
        return this.terms.removeFirst();
    }

    public void addOperator(String strOp) {
        Operator operator = Operator.valueOf(strOp);
        this.operators.add(operator);
    }

    public boolean hasOperator() {
        return !this.operators.isEmpty();
    }

    public Operator getOperator() {
        if(this.operators.isEmpty()) {
            return null;
        }
        return this.operators.removeFirst();
    }
}
