package com.search.core;

import java.util.*;

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
        String firstTerm = query.getTerm();
        byte[] initBytes = matrix[this.terms.get(firstTerm)];
        byte[] result = Arrays.copyOf(initBytes, initBytes.length);

        while(query.hasOperator()) {
            String rOperand = query.getTerm();
            Operator operator = query.getOperator();
            int rTermId = this.terms.get(rOperand);
            byte[] rTermDocList = matrix[rTermId];

            for(int i = 0; i < this.length; ++i) {
                byte lDocByte = result[i];
                byte rDocByte = rTermDocList[i];
                result[i] = switch (operator) {
                    case AND -> (byte) (lDocByte & rDocByte);
                    case OR -> (byte) (lDocByte | rDocByte);
                    case NAND -> (byte) ~(lDocByte & rDocByte);
                    case NOR -> (byte) ~(lDocByte | rDocByte);
                    case XOR -> (byte) (lDocByte ^ rDocByte);
                };
            }
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
