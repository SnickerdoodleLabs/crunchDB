# Ranking

## Approach 1 - No embedding/co-occurance
Input: (new contents, user history)

1. Build a vocabulary with more weight on new content words. No stop-words, only roots
2. Build content representation with word occurance. The representation is a vector of word frequencies.
3. Build user representation using the same approach.
4. Calculate similarity with TF-IDF weights and staking weights. Use Jaccard Similarity. Need to revisit the similarity research on this.
5. May be improved by introducing synonyms of important words.


## Approach 2 - session-based co-occurance
This is a semi-semantic approach. With co-occurance, we can partially find semantic overlap between contents and user history even when they do not share the same words.

Input: (new contents, user history)

[Details](./co-occurance.md)

## Approach 3 - embedding
Embedding lookup is O(logn). We don't need to store embeddings in the database initially. Later we need to find a way to create and cache different user preference embeddings. 

Input: (new contents, user history)

[Details](./embedding.md)