import { ISimilarityMeasure } from '../../interfaces/ranking/ISimilarityMeasure';

export class CosineSimilarity implements ISimilarityMeasure {
    compute(a: number[], b: number[]): number {
        if (a.length !== b.length) {
            throw new Error("Vectors must be of the same length");
        }

        let dotProduct = 0;
        let normA = 0;
        let normB = 0;

        for (let i = 0; i < a.length; i++) {
            dotProduct += a[i] * b[i];
            normA += a[i] * a[i];
            normB += b[i] * b[i];
        }

        if (normA === 0 || normB === 0) {
            throw new Error("Norm of vector cannot be zero");
        }

        return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
    }
}
