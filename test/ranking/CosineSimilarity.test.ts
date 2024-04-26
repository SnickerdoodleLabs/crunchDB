import { CosineSimilarity } from '../../src/implementations/ranking/CosineSimilarity';

describe('CosineSimilarity', () => {
    const cosine = new CosineSimilarity();

    it('should compute cosine similarity correctly', () => {
        const vectorA = [1, 2, 3];
        const vectorB = [4, 5, 6];
        const expected = 0.9746318461970762; // Computed beforehand or with a calculator
        expect(cosine.compute(vectorA, vectorB)).toEqual(expected);
    });

    it('should throw for vectors of different lengths', () => {
        const vectorA = [1, 2];
        const vectorB = [1, 2, 3];
        expect(() => cosine.compute(vectorA, vectorB)).toThrow("Vectors must be of the same length");
    });

    it('should handle zero vectors', () => {
        const vectorA = [0, 0, 0];
        const vectorB = [1, 2, 3];
        expect(() => cosine.compute(vectorA, vectorB)).toThrow("Norm of vector cannot be zero");
    });

    it('should handle both vectors being zero vectors', () => {
        const vectorA = [0, 0, 0];
        const vectorB = [0, 0, 0];
        expect(() => cosine.compute(vectorA, vectorB)).toThrow("Norm of vector cannot be zero");
    });

    it('should handle orthogonal vectors', () => {
        const vectorA = [1, 0];
        const vectorB = [0, 1];
        const expected = 0; // Dot product is zero, cosine similarity is zero
        expect(cosine.compute(vectorA, vectorB)).toEqual(expected);
    });
});