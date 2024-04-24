import { IncrementalVocabulary } from  "crunchDB/implementations";
import { Word, WordRoot } from "crunchDB/objects";
import { Err } from 'neverthrow';
describe("IncrementalVocabulary", () => {
  const words: (Word | WordRoot)[] = [Word("apple"), Word("banana"), Word("orange")];
  let vocabulary: IncrementalVocabulary;

  beforeEach(() => {
    vocabulary = new IncrementalVocabulary(words);
  });

  it("should add words to the vocabulary", () => {

    expect(vocabulary.getVocabularySize()).toBe(3);
  });

  it("should throw error for duplicate word", () => {
    
    try {
        vocabulary.addWord(Word("apple"));

        // Fail the test if no error is thrown
        fail("Expected an error to be thrown for duplicate word.");
    } catch (error) {
        // Check if the error is an instance of Err from neverthrow
        expect(error).toBeInstanceOf(Err);

        if (error instanceof Err) {
          // Access the error message from the error object
          const errorMessage = error.error;
          expect(errorMessage).toContain('Duplicate word "apple" cannot be added.');
      } else {
          // Log an error message if 'error' is not of type 'Err'
          console.error("Error is not of type 'Err'");
          fail("Unexpected error type");
      }
    }
});
});
