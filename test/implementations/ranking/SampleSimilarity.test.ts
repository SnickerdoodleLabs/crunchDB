import { Embedding, SimilarityScoreNormalized } from 'crunchDB/objects';
import { SampleSimilarity } from 'crunchDB/implementations';

describe("SampleSimilarity", () => {

    it("should get ok", async () => {
        // Arrange
        const measure = new SampleSimilarity();
        const embedding1 = Embedding([1, 1, 1]);
        const embedding2 = Embedding([1, 1, 1]);
        const expected = SimilarityScoreNormalized(0.05);

        // Act
        const result = await measure.getNormalizedSimilarityScore(embedding1, embedding2); // await converts ResultAsync to Result object

        // Assert
        expect(result.isOk()).toBe(true);
        const value = result._unsafeUnwrap(); // extracts the value
        expect(value).toEqual(expected);

    });
    it("should get error", async () => {
        // Arrange
        const measure = new SampleSimilarity();
        const embedding1 = Embedding([1, 1, 1]);
        const embedding2 = Embedding([1, 1, 10]);

        // Act
        const result = await measure.getNormalizedSimilarityScore(embedding1, embedding2);

        // Assert
        expect(result.isErr()).toBe(true);

    });
});