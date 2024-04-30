import { ISimilarityNormalized } from "crunchDB/interfaces";
import { Embedding, SimilarityError, SimilarityScoreNormalized } from "crunchDB/objects";
import { ResultAsync, errAsync, okAsync } from "neverthrow";

export class CosineSimilarity implements ISimilarityNormalized {
    getNormalizedSimilarityScore(embedding1: Embedding, embedding2: Embedding):  ResultAsync<SimilarityScoreNormalized, SimilarityError>{
        if (embedding1.length !== embedding2.length) {
            return errAsync(new SimilarityError("Vectors must be of the same length"));
        }

        let dotProduct = 0;
        let normA = 0;
        let normB = 0;

        for (let i = 0; i < embedding1.length; i++) {
            dotProduct += embedding1[i] * embedding2[i];
            normA += embedding1[i] * embedding1[i];
            normB += embedding2[i] * embedding2[i];
        }

        if (normA === 0 || normB === 0) {
            return errAsync(new SimilarityError("Norm of vector cannot be zero"));
        }
        
        const similarity = dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
        return okAsync(SimilarityScoreNormalized(similarity));
    }
}