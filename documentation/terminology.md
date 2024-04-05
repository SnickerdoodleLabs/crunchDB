# Terminology: 

**WordToIndex**: vocabulary with word to token mappings (Index is used for conventions)

**WordToEmbedding**: vocabulary with word to semantic embedding (dense vectors)

**VocabularySize**: == len(WordToIndex) == len(WordToEmbedding)

**Token**: numeric id assigned to words (Label Encoding)

**OHE**: One hot encoding 

**Embedding**: dense semantic word vector (word2vec/glove)

**Word root**: running → run

**Co-occurrence**: P(word1, word2)

**Co-occurance matrix**:  VocabularySize x VocabularySize matrix with pair counts (excludes self)

**TF-IDF**: a weight function to give more weights to rare words.