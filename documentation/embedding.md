# Challenges
In the browser context, having an embedding model is challenging as embedding models for words are quite large (in gigabytes). Several directions:

1. Embedding service API: Call a third-party service to get embeddings
2. Distilled embedding: (a) prune the irrelevant words for specific domains (NFT/Digital Assets/Gaming), (b) reduce embedding dimension.