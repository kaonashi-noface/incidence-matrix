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

## Overview

> What is an Incidence Matrix?

An Incidence Matrix is a two-dimensional array where each cell represents a term's occurrence within a given "Document".
<p>
    Typically, an incidence matrix has two axes representing:
    <ol>
        <li>the set of all Documents</li>
        <li>the set of all Terms found across all Documents</li>
    </ol>
</p>

![Incidence Matrix Example](rsc/img/incidence-matrix_001.png)

> Note: An Incidence Matrix only marks that a term occurred within a Document. It does not specify the number of occurrences with each document.

In the above image, the `x-axis` represents the `corpus` we want to search while the `y-axis` represents the set of `terms` found across all `Documents` in the `corpus`. Each cell contains a bitwise value of `1` or `0`, respectively representing their boolean values `true` or `false`.

Let's take a look at a specific `<Document, Term>` cell where `<Document="Hamlet", Term="Brutus">`. The value at cell `<Hamlet, Brutus>` is `1`. This tells us that the term `Brutus` was found in the document `Macbeth`.

If we look at the row `<Anthony, ?>`, we can see that the term `Anthony` was found in only one document - `Macbeth`; on the other hand, the term `Caesar` was found in three documents.

> What is the purpose of an Incidence Matrix?

"Information retrieval system" is an older terminology that is synonymous with "Search Engine" (e.g. Google, Yahoo, Bing, etc.). An incidence matrix is one of the more naive ways to "retrieve information" about a collection of resources (e.g. documents, web pages, articles, etc.); specifically, it is a data structure that represents queries as mathematical bitwise operations known as [Boolean Algebra](https://en.wikipedia.org/wiki/Boolean_algebra).

Expressing user queries as boolean algebra provides the benefits of boolean algebraic rules and laws. These algebraic laws allows queries to be "calculated", thus simplifying the querying logic and providing performance efficiencies. However, incidence matrices have significantly more cons related to advanced ranking functionalities, positional indexing, and - worst of all - memory inefficiency. Incidence matrices are highly impractical due to the fact that internet resources change and scale exponentially over time.

Let's take another look at the sample Shakespeare corpus:<br />
![Incidence Matrix Example](rsc/img/incidence-matrix_001.png)

TODO: add number of english words in entire dictionary, add context about the average size of a `boolean`, add estimation for total number of documents on the internet, calculate the estimated size of a naive incidence matrix.

> Why do we need to know about Incidence Matrices?

<p>
    It is still important to understand the history, nature and functionality of incidence matrices because they highlight:
    <ul>
        <li>the fundamental flaws of naive search engines</li>
        <li>the inherent difficulty of creating scalable, distributed search engines</li>
    </ul>
</p>

Understanding these flaws allow us to build upon information retrieval theory and build more advanced, robust search engines.

## Terminologies
| Term | Definition |
|------|------------|
| corpus | TODO |
| document | TODO |
| term | TODO |

# High Level Design
## 1) Problem Statement
TODO - add details.

## 2) Constraints
TODO - add details.

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

Run the following command to tokenize the `*.txt` file(s) via Maven + terminal:
```shell
mvn exec:java -Dexec.mainClass="com.search.App"
```

Run the following command to tokenize the `*.txt` file(s) via terminal:
```shell
java -cp target/incidence-matrix-1.0-SNAPSHOT.jar com.search.App
```

# License
[![Licence](https://img.shields.io/github/license/Ileriayo/markdown-badges?style=for-the-badge)](./LICENSE)