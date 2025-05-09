<p align="center">
    <a href="https://www.graalvm.org/">
        <img src="https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white" alt="Java" />
    </a>
    <br />
    <a href="https://maven.apache.org/">
        <img src="https://img.shields.io/badge/apachemaven-C71A36.svg?style=for-the-badge&logo=apachemaven&logoColor=white" alt="Maven" />
    </a>
</p>

# Incidence Matrix
This repository contains an implementation of a Boolean Incidence Matrix.

## 1) Overview

> What is an Incidence Matrix?

An Incidence Matrix is a two-dimensional array where each cell represents a term's occurrence within a given "Document".
<p>
    Typically, an incidence matrix has two axes representing:
    <ol>
        <li>the set of all Documents</li>
        <li>the set of all Terms found across all Documents</li>
    </ol>
</p>

![Incidence Matrix Shakespeare Example](rsc/img/incidence-matrix_001.png)

> Note:
> * An Incidence Matrix only marks that a term occurred within a Document. It does not specify the number of occurrences for each document.
> * There are more than 4 words across the 4 Shakespeare documents. Only 4 terms were tracked in the incidence matrix to simply the example scenario.

In the above image, the `x-axis` represents the `corpus` we want to search while the `y-axis` represents the set of `terms` found across all `Documents` in the `corpus`. Each cell contains a bitwise value of `1` or `0`, respectively representing their boolean values `true` or `false`.

Let's take a look at a specific `<Document, Term>` cell where `<Document="Hamlet", Term="Brutus">`. The value at cell `<Hamlet, Brutus>` is `1`. This tells us that the term `Brutus` was found in the document `Macbeth`.

If we look at the row `<Anthony, ?>`, we can see that the term `Anthony` was found in only one document - `Macbeth`; on the other hand, the term `Caesar` was found in three documents.

> What is the purpose of an Incidence Matrix?

"Information retrieval system" is an older terminology that is synonymous with "Search Engine" (e.g. Google, Yahoo, Bing, etc.). An incidence matrix is one of the more naive ways to "retrieve information" about a collection of resources (e.g. documents, web pages, articles, etc.); specifically, it is a data structure that represents queries as mathematical bitwise operations known as [Boolean Algebra](https://en.wikipedia.org/wiki/Boolean_algebra).

Expressing user queries as boolean algebra provides the benefits of boolean algebraic rules and laws. These algebraic laws allow queries to be "calculated", thus simplifying the querying logic and providing performance efficiencies. However, incidence matrices have significantly more cons than pros related to a lack of advanced ranking functionalities, positional indexing, and - worst of all - memory inefficiency. Incidence matrices are highly impractical due to the fact that internet resources change and scale exponentially over time.

![Incidence Matrix Generic Example](rsc/img/incidence-matrix_002.png)

As mentioned above, incidence matrices are extremely impractical due to their memory inefficiency. If we look at the Sharkspeare example from above, we can see that 16 cells are required to represent the Shakespeare incidence matrix - `M terms * N documents`. Each cell contains a boolean. Although the size of a boolean depends on the nature of the programming language and the system platform, most booleans tend to be a byte. This means `the number of cells * 1 byte = the number of bytes needed to represent the incidence matrix`.

Let's consider the following example:
* The English language has approximately 1,000,000 words
* Wikipedia has approximatly 7,000,000 documents

`M terms * N documents * 1 byte` = `1,000,000 words * 7,000,000 documents * 1 byte` -><br />
`1,000,000 words * 7,000,000 documents * 1 byte` = `7,000,000,000,000 bytes` -><br />
`7,000,000,000,000 bytes` = `7 Terrabytes`

It would take 7 Terrabytes to represent the entire Wikipedia Corpus in English. This information retrieval model does not scale over time. Consider the size of an incidence matrix containing all languages and hundred million documents - if not billions - across the entire world. It's also important to note that incidence matrices capture both the presence and absence of terms in a corpus. This is inefficient because we technically only need to know if a term is present in a document to inform a user that said document is relevant to their query; however, incidence matrices insist on representing rows and columns as the same size in order to take advantage of bitwise operations. Getting rid of "unused" `0`s result in a new information retrieval data structure known as a `postings list`.

> Why do we need to know about Incidence Matrices?

<p>
    It is still important to understand the history, nature and functionality of incidence matrices because they highlight:
    <ul>
        <li>the fundamental flaws of naive search engines</li>
        <li>the inherent difficulty of creating scalable, distributed search engines</li>
    </ul>
</p>

Understanding these flaws allow us to build upon information retrieval theory and build more advanced, robust search engines.

## 2) Terminologies
| Term | Definition |
|------|------------|
| corpus | The collection of documents, articles, journals, web pages, etc. to impose a search query against. |
| document | A body of text that encapsulates a singular item in a corpus. |
| term | A single search "unit" (e.g. word or phrase) that a user is interested in or was found in a document. |

# High Level Design
## 1) Problem Statement
The goal of this repository is to create a Boolean Incidence Matrix that is capable of:
* evaluating `AND`, `OR`, `AND NOT`, `NOR` and `XOR` queries
* handling a "reasonable" number of terms in a query (no large queries)

## 2) Constraints
This incidence matrix implementation will not:
* force order of operations (e.g. `(` and `)`)
* parse and tokenize documents
* be multithreaded

## 3) Implementation
As mentioned in the above sections, we know that incidence matrices are static data structures due to the fact that Boolean Algebra requires two logical variables to have the same length. This means we represent the incidence matrix as a contiguous data structure of fixed size on the heap (e.g. `boolean[][]`, `Vector<Vector<T>>`, `ArrayList<ArrayList<T>>`, etc.).

Assume the following scenario while referencing the `MxN` incidence matrix from above:
* There exists documents `d1`, `d2` and `d3` in the corpus of size N.
* We want to query for all documents that match the expression `t1 & t2`

Given the above requirements, the follow (sideways) truth table is formed:

![Incidence Matrix Generic Example](rsc/img/incidence-matrix_003.png)

As code we could express this as:
```java
// Assume M and N are defined
boolean[][] iMatrix = new boolean[M][N];

int term1Idx = getTermIndex("t1");
int term2Idx = getTermIndex("t2");

boolean[] docList1 = iMatrix[term1Idx];
boolean[] docList2 = iMatrix[term2Idx];
boolean[] t1ANDt2 = new boolean[docList1.length];
for(int i=0; i<docList1.length; ++i) {
    t1ANDt2[i] = docList1[i] & docList2[i];
}
return t1ANDt2;
```

We could take the incidence matrix one step further by performing byte compression where each bit in a cell represents a `<Document, Term>` occurrence:

![Incidence Matrix Generic Example](rsc/img/incidence-matrix_004.png)

We can take advantage of this byte compression because we know that most platforms represent a boolean as a byte. Why waste the unused bits in a boolean when we can represent each bit as a byte?

# Prerequisites
This project requires the following:
* SDKMAN
* Java Runtime
* Maven

# Installation
Follow the instructions below to install SDKMAN:
```
https://sdkman.io/install
```

Run the following command to install the exact Java Graal version:
```bash
sdk env install
```

Run the following command to install the exact Maven Version:
```bash
sdk install maven 3.9.9
```

# Build
Run the following command to clean install dependencies:
```shell
mvn clean install
```

Run the following command to run unit tests via terminal:
```shell
mvn test
```

Run the following command to query the incidence matrix via Maven + terminal:
```shell
mvn exec:java -Dexec.mainClass="com.search.App"
```

Run the following command to query the incidence matrix via terminal:
```shell
java -cp target/incidence-matrix-1.0-SNAPSHOT.jar com.search.App
```

# License
[![Licence](https://img.shields.io/github/license/Ileriayo/markdown-badges?style=for-the-badge)](./LICENSE)