import { Embedding, SimilarityScoreNormalized } from "objects";

export interface ISimilarityNormalized {
    getNormalizedSimilarityScore(embedding1: Embedding, embedding2: Embedding): SimilarityScoreNormalized;
}