# Challenges
In the browser context, having an embedding model is challenging as embedding models for words are quite large (in gigabytes). Several directions:

1. Embedding service API: Call a third-party service to get embeddings
2. Distilled embedding: (a) prune the irrelevant words for specific domains (NFT/Digital Assets/Gaming), (b) reduce embedding dimension.


# Usage

1. Long-term user preference: accumulated emmbeddings with average operator
2. Short-term user preference: 
3. Domain-specific user preference: Embedding only reflecting a certain domain (digital art). 0.3 * user_embedding + 0.7 * user_dommain_embedding

# Ranking
1. Use cosine similarity