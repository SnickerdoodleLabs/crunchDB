import { Embedding, SimilarityError, SimilarityScoreNormalized } from "crunchDB/objects";
import { ISimilarityNormalized } from "crunchDB/interfaces";
import { ResultAsync, errAsync, okAsync } from "neverthrow";

export class JaccardSimilarity implements ISimilarityNormalized {
    getNormalizedSimilarityScore(embedding1: Embedding, embedding2: Embedding): ResultAsync<SimilarityScoreNormalized, SimilarityError> {
        if (embedding1.length !== embedding2.length) {
            return errAsync(new SimilarityError("Vectors must be of the same length"));
        }

        let intersection = 0;
        let union = 0;

        for (let i = 0; i < embedding1.length; i++) {
            if (embedding1[i] > 0 && embedding2[i] > 0) intersection++;
            if (embedding1[i] > 0 || embedding2[i] > 0) union++;
        }

        const similarity = intersection === 0 ? 0 : intersection / union;
        return okAsync(SimilarityScoreNormalized(similarity));
    }
}