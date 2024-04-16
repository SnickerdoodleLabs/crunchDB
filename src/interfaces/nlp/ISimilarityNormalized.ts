import { SimilarityScoreNormalized } from "objects";

export interface ISimilarityNormalized {
    getNormalizedSimilarityScore(): SimilarityScoreNormalized;
}