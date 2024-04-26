import { SimilarityError, SimilarityScoreRaw } from "crunchDB/objects";
import { ResultAsync } from "neverthrow";

export interface ISimilarityRaw {
    getRawSimilarityScore(): ResultAsync<SimilarityScoreRaw, SimilarityError>;
}