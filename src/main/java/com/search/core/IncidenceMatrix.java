package com.search.core;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

public class IncidenceMatrix {
    private final byte[][] matrix;
    private final int length;

    private Map<String, Integer> terms;
    private List<String> corpus;
    
    public IncidenceMatrix(byte[][] matrix, List<String> corpus, Map<String, Integer> terms) {
        this.matrix = matrix;
        this.length = this.matrix[0].length;
        this.corpus = corpus;
        this.terms = terms;
    }

    public byte[] evaluate(Query query) {
        if (query == null) {
            return null;
        }
        byte[] result = new byte[this.length];
        String lOperand = query.getTerm();
        String rOperand = query.getTerm();
        Operator operator = query.getOperator();

        if(!this.terms.containsKey(lOperand) || !this.terms.containsKey(rOperand)) {
            return null;
        }

        int lTermId = this.terms.get(lOperand);
        int rTermId = this.terms.get(rOperand);

        byte[] lTermDocList = matrix[lTermId];
        byte[] rTermDocList = matrix[rTermId];

        for(int i = 0; i < this.length; ++i) {
            byte lDocByte = lTermDocList[i];
            byte rDocByte = rTermDocList[i];
            result[i] = switch (operator) {
                case AND -> (byte) (lDocByte & rDocByte);
                case OR -> (byte) (lDocByte | rDocByte);
                case NAND -> (byte) (~lDocByte & ~rDocByte);
                case NOR -> (byte) ~(lDocByte | rDocByte);
                case XOR -> (byte) (lDocByte ^ rDocByte);
            };
        }

        return result;
    }

    public List<String> getDocuments(byte[] results) {
        List<String> documents = new LinkedList<>();
        int bytePtr = 0;
        byte b = results[bytePtr];
        for(int docPtr = 0; docPtr < corpus.size(); ++docPtr) {
            int bitPtr = docPtr % 8;
            if (bitPtr == 0 && docPtr > 0) {
                bytePtr++;
            }
            if (bitPtr == 0) {
                b = results[bytePtr];
            }
            boolean isPresent = (b & 0b10000000) == (0b10000000);
            if(isPresent) {
                documents.add(corpus.get(docPtr));
            }
            b = (byte) (b << 1);
        }
        return documents;
    }
}
