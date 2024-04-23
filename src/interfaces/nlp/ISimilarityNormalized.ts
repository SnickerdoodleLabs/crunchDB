import { Embedding, SimilarityScoreNormalized } from "crunchDB/objects";

export interface ISimilarityNormalized {
    getNormalizedSimilarityScore(embedding1: Embedding, embedding2: Embedding): SimilarityScoreNormalized;
}