import { Embedding, SimilarityError, SimilarityScoreNormalized } from "crunchDB/objects";
import { ResultAsync } from "neverthrow";

export interface ISimilarityNormalized {
    getNormalizedSimilarityScore(embedding1: Embedding, embedding2: Embedding): ResultAsync<SimilarityScoreNormalized, SimilarityError>;
}