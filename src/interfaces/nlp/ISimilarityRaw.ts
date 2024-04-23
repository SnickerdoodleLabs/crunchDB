import { SimilarityScoreRaw } from "crunchDB/objects";

export interface ISimilarityRaw {
    getRawSimilarityScore(): SimilarityScoreRaw;
}