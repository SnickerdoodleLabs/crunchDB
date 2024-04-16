import { RawSimilarityScore } from "objects";

namespace nlp {
    export interface ISimilarityRaw {
        getRawSimilarityScore(): RawSimilarityScore;
    }
}