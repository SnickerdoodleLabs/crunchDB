import { Embedding, SimilarityError, SimilarityScoreNormalized } from "crunchDB/objects";
import { ISimilarityNormalized } from "crunchDB/interfaces";
import { ResultAsync, errAsync, okAsync } from "neverthrow";

export class SampleSimilarity implements ISimilarityNormalized {
    getNormalizedSimilarityScore(embedding1: Embedding, embedding2: Embedding): ResultAsync<SimilarityScoreNormalized, SimilarityError> {
        
        if (JSON.stringify(embedding1) === JSON.stringify(embedding2)) {
            const similarity = SimilarityScoreNormalized(0.05);
            return okAsync(similarity);
        } else {
            return errAsync(new SimilarityError("Embeddings are not the same"));
        }
    }
}