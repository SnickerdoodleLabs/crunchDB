import { Embedding, SimilarityScoreNormalized, SimilarityError } from 'crunchDB/objects';
import { CosineSimilarity } from 'crunchDB/implementations';

describe('CosineSimilarity', () => {
    const cosine = new CosineSimilarity();

    it('should compute cosine similarity correctly', async () => {
        const embedding1 = Embedding([1, 2, 3]);
        const embedding2 = Embedding([4, 5, 6]);
        const expected = SimilarityScoreNormalized(0.9746318461970762); // Computed beforehand or with a calculator
        const result = await cosine.getNormalizedSimilarityScore(embedding1, embedding2);
        expect(result.isOk()).toBe(true);
        expect(result._unsafeUnwrap()).toEqual(expected);
    });

    it('should throw for vectors of different lengths', async () => {
        const embedding1 = Embedding([1, 2]);
        const embedding2 = Embedding([1, 2, 3]);
        const result = await cosine.getNormalizedSimilarityScore(embedding1, embedding2);
        expect(result.isErr()).toBe(true);
        expect(result._unsafeUnwrapErr()).toEqual(new SimilarityError("Vectors must be of the same length"));
    });

    it('should handle zero vectors', async () => {
        const embedding1 = Embedding([0, 0, 0]);
        const embedding2 = Embedding([1, 2, 3]);
        const result = await cosine.getNormalizedSimilarityScore(embedding1, embedding2);
        expect(result.isErr()).toBe(true);
        expect(result._unsafeUnwrapErr()).toEqual(new SimilarityError("Norm of vector cannot be zero"));
    });

    it('should handle both vectors being zero vectors', async () => {
        const embedding1 = Embedding([0, 0, 0]);
        const embedding2 = Embedding([0, 0, 0]);
        const result = await cosine.getNormalizedSimilarityScore(embedding1, embedding2);
        expect(result.isErr()).toBe(true);
        expect(result._unsafeUnwrapErr()).toEqual(new SimilarityError("Norm of vector cannot be zero"));
    });

    it('should handle orthogonal vectors', async () => {
        const embedding1 = Embedding([1, 0]);
        const embedding2 = Embedding([0, 1]);
        const expected = SimilarityScoreNormalized(0); // Dot product is zero, cosine similarity is zero
        const result = await cosine.getNormalizedSimilarityScore(embedding1, embedding2);
        expect(result.isOk()).toBe(true);
        expect(result._unsafeUnwrap()).toEqual(expected);
    });
});