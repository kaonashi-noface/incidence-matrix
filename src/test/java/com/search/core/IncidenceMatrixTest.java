package com.search.core;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.*;

import static java.util.Map.entry;

public class IncidenceMatrixTest {
    static List<String> corpus = IncidenceMatrixTest.initCorpus();
    static Map<String, Integer> terms = new HashMap<>(
        Map.ofEntries(
            entry("hello", 0),
            entry("world", 1),
            entry("batman", 2),
            entry("forever", 3)
        )
    );
    static byte[][] iMatrix = {
        { (byte) 0b11010101, (byte) 0b00110101, },
        { (byte) 0b10010011, (byte) 0b00010111, },
        { (byte) 0b01010111, (byte) 0b01101101, },
        { (byte) 0b11101110, (byte) 0b11011101, },
    };

    @Test
    public void shouldEvaluateAndQuery() {
        IncidenceMatrix iMatrix = this.getIMatrix();
        Query q = new Query();
        q.addTerm("hello"); // 11010101 00110101
        q.addTerm("world"); // 10010011 00010111
        q.addOperator("AND");
        byte[] actualResult = iMatrix.evaluate(q); // 10010001 00010101
        assertEquals((byte) 0b10010001, actualResult[0]);
        assertEquals((byte) 0b00010101, actualResult[1]);
        // 0, 3, 7, 11, 13, 15
        List<String> expectedDocuments = Arrays.asList(
            "document0", "document3", "document7",
            "document11", "document13", "document15"
        );
        List<String> actualDocuments = iMatrix.getDocuments(actualResult);
        assertEquals(expectedDocuments, actualDocuments);
    }

    @Test
    public void shouldEvaluateOrQuery() {
        IncidenceMatrix iMatrix = this.getIMatrix();
        Query q = new Query();
        q.addTerm("world"); // 10010011 00010111
        q.addTerm("batman"); // 01010111 01101101
        q.addOperator("OR");
        byte[] actualResult = iMatrix.evaluate(q); // 11010111 01111111
        assertEquals((byte) 0b11010111, actualResult[0]);
        assertEquals((byte) 0b01111111, actualResult[1]);
        // 0, 1, 3, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15
        List<String> expectedDocuments = Arrays.asList(
            "document0", "document1", "document3", "document5", "document6",
            "document7", "document9", "document10", "document11", "document12",
            "document13", "document14", "document15"
        );
        List<String> actualDocuments = iMatrix.getDocuments(actualResult);
        assertEquals(expectedDocuments, actualDocuments);
    }

    @Test
    public void shouldEvaluateNandQuery() {
        IncidenceMatrix iMatrix = this.getIMatrix();
        Query q = new Query();
        q.addTerm("hello"); // 11010101 00110101
        q.addTerm("world"); // 10010011 00010111
        q.addOperator("NAND");
        byte[] actualResult = iMatrix.evaluate(q); // 01101110 11101010
        assertEquals((byte) 0b01101110, actualResult[0]);
        assertEquals((byte) 0b11101010, actualResult[1]);
        // 1, 2, 4, 5, 6, 8, 9, 10, 12, 14
        List<String> expectedDocuments = Arrays.asList(
            "document1", "document2", "document4", "document5", "document6",
            "document8", "document9", "document10", "document12", "document14"
        );
        List<String> actualDocuments = iMatrix.getDocuments(actualResult);
        assertEquals(expectedDocuments, actualDocuments);
    }

    @Test
    public void shouldEvaluateNorQuery() {
        IncidenceMatrix iMatrix = this.getIMatrix();
        Query q = new Query();
        q.addTerm("world"); // 10010011 00010111
        q.addTerm("batman"); // 01010111 01101101
        q.addOperator("NOR");
        byte[] actualResult = iMatrix.evaluate(q); // 00101000 10000000
        assertEquals((byte) 0b00101000, actualResult[0]);
        assertEquals((byte) 0b10000000, actualResult[1]);
        // 2, 4, 8
        List<String> expectedDocuments = Arrays.asList(
            "document2", "document4", "document8"
        );
        List<String> actualDocuments = iMatrix.getDocuments(actualResult);
        assertEquals(expectedDocuments, actualDocuments);
    }

    @Test
    public void shouldEvaluateXorQuery() {
        IncidenceMatrix iMatrix = this.getIMatrix();
        Query q = new Query();
        q.addTerm("batman"); // 01010111 01101101
        q.addTerm("forever"); // 11101110 11011101
        q.addOperator("XOR");
        byte[] actualResult = iMatrix.evaluate(q); // 10111001 10110000
        assertEquals((byte) 0b10111001, actualResult[0]);
        assertEquals((byte) 0b10110000, actualResult[1]);
        // 0, 2, 3, 4, 7, 8, 10, 11
        List<String> expectedDocuments = Arrays.asList(
            "document0", "document2", "document3", "document4",
            "document7", "document8", "document10", "document11"
        );
        List<String> actualDocuments = iMatrix.getDocuments(actualResult);
        assertEquals(expectedDocuments, actualDocuments);
    }

    private static List<String> initCorpus() {
        List<String> corpus = new ArrayList<>(16);
        for(int i = 0; i< 16; ++i) {
            corpus.add("document" + i);
        }
        return corpus;
    }

    private IncidenceMatrix getIMatrix() {
        return new IncidenceMatrix(
            IncidenceMatrixTest.iMatrix,
            IncidenceMatrixTest.corpus,
            IncidenceMatrixTest.terms
        );
    }
}
