# Architecture

## Inspirations
1. Pinecone

## Decisions
1. Each vector type will have a vector table with *id* and fixed length *vector* columns.
2. The metadata about a vector is saved into another table. The purpose of the meta-data is to find the relevant vectors first.