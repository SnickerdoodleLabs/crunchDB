# Challenges
Co-occurrence matrices are quite large. A 50k vocabulary will have 2.5B entries requiring 2.5GB. There is no point having a co-occurrence matrix instead of a 1GB embedding.

## Solution #1 - Session-based

1. Build session-based co-occurrence matrix with available words. e.g. 
2. Create session based vocabulary with user's history and new contents. Assuming top 1000 words with new content words having higher weights.
3. build co-occurrence matrix for the new vocabulary
4. create user and content vectors. apply weights using p(w1, w2). Need to revise literature on this. Basically, if a word, w1, appears in a vector, we add count 1 to it and add p(w2|w1) to w2.
5. Use Jaccard Similarity. Need to revisit the similarity research on this.

