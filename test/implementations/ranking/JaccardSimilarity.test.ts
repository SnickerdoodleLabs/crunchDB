import { Embedding, SimilarityScoreNormalized, SimilarityError } from 'crunchDB/objects';
import { JaccardSimilarity } from 'crunchDB/implementations';

describe('JaccardSimilarity', () => {
    const jaccard = new JaccardSimilarity();

    it('should compute Jaccard similarity correctly for simple case', async () => {
        const vectorA = Embedding([1, 0, 2, 1]);
        const vectorB = Embedding([1, 2, 0, 1]);
        const expected = SimilarityScoreNormalized(0.5);
        const result = await jaccard.getNormalizedSimilarityScore(vectorA, vectorB);
        expect(result.isOk()).toBe(true);
        expect(result._unsafeUnwrap()).toEqual(expected);
    });

    it('should handle vectors with no intersection', async () => {
        const vectorA = Embedding([1, 0, 0, 0]);
        const vectorB = Embedding([0, 1, 1, 1]);
        const expected = SimilarityScoreNormalized(0);
        const result = await jaccard.getNormalizedSimilarityScore(vectorA, vectorB);
        expect(result.isOk()).toBe(true);
        expect(result._unsafeUnwrap()).toEqual(expected);
    });

    it('should handle zero vectors', async () => {
        const vectorA = Embedding([0, 0, 0, 0]);
        const vectorB = Embedding([0, 0, 0, 0]);
        const expected = SimilarityScoreNormalized(0);
        const result = await jaccard.getNormalizedSimilarityScore(vectorA, vectorB);
        expect(result.isOk()).toBe(true);
        expect(result._unsafeUnwrap()).toEqual(expected);
    });

    it('should handle full intersection', async () => {
        const vectorA = Embedding([1, 1, 1, 1]);
        const vectorB = Embedding([1, 1, 1, 1]);
        const expected = SimilarityScoreNormalized(1);
        const result = await jaccard.getNormalizedSimilarityScore(vectorA, vectorB);
        expect(result.isOk()).toBe(true);
        expect(result._unsafeUnwrap()).toBeCloseTo(expected);
    });

    it('should throw for vectors of different lengths', async () => {
        const vectorA = Embedding([1, 2]);
        const vectorB = Embedding([1, 2, 3]);
        const result = await jaccard.getNormalizedSimilarityScore(vectorA, vectorB);
        expect(result.isErr()).toBe(true);
        expect(result._unsafeUnwrapErr()).toEqual(new SimilarityError("Vectors must be of the same length"));
    });
});