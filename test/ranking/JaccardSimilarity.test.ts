import { JaccardSimilarity } from '../../src/implementations/ranking/JaccardSimilarity';

describe('JaccardSimilarity', () => {
    const jaccard = new JaccardSimilarity();

    it('should compute Jaccard similarity correctly for simple case', () => {
        const vectorA = [1, 0, 2, 1];
        const vectorB = [1, 2, 0, 1];
        // Both vectors are considered as binary presence, thus they are treated as [1,0,1,1] and [1,1,0,1]
        const expected = 0.5; // Intersection = 2 (positions 0 and 3), Union = 4 (positions 0, 1, 2, 3)
        expect(jaccard.compute(vectorA, vectorB)).toBeCloseTo(expected);
    });

    it('should handle vectors with no intersection', () => {
        const vectorA = [1, 0, 0, 0];
        const vectorB = [0, 1, 1, 1];
        const expected = 0; // No intersection, non-zero union
        expect(jaccard.compute(vectorA, vectorB)).toBeCloseTo(expected);
    });

    it('should handle zero vectors', () => {
        const vectorA = [0, 0, 0, 0];
        const vectorB = [0, 0, 0, 0];
        const expected = 0; // Intersection = 0, Union = 0, return 0 to handle division by zero
        expect(jaccard.compute(vectorA, vectorB)).toBeCloseTo(expected);
    });

    it('should handle full intersection', () => {
        const vectorA = [1, 1, 1, 1];
        const vectorB = [1, 1, 1, 1];
        const expected = 1; // Full intersection, same vectors
        expect(jaccard.compute(vectorA, vectorB)).toBeCloseTo(expected);
    });

    it('should throw for vectors of different lengths', () => {
        const vectorA = [1, 2];
        const vectorB = [1, 2, 3];
        expect(() => jaccard.compute(vectorA, vectorB)).toThrow("Vectors must be of the same length");
    });
});
