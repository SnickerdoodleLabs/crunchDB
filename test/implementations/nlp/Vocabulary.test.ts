import { Vocabulary } from "crunchDB/implementations";
import { Word, WordRoot, WordIndex } from "crunchDB/objects";

describe("Vocabulary", () => {
    const words: (Word | WordRoot)[] = [Word("apple"), Word("banana"), Word("orange")];
    let vocabulary: Vocabulary;

    beforeEach(() => {
        vocabulary = new Vocabulary(words);
    });
    
    it("should build vocabulary correctly", () => {
        // Check if each word is mapped to the correct index
        words.forEach((word, index) => {
            expect(vocabulary.getWordIndex(word)).toBe(index);
        });

        // Check if each index maps to the correct word
        for (let i = 0; i < words.length; i++) {
            expect(vocabulary.getWordFromIndex(WordIndex(i))).toBe(words[i]);
        }
    });

    it("should return word to index mapping", () => {
        // Get the word to index mapping from the vocabulary
        const wordToIndex = vocabulary.getWordToIndex();

        // Check if each word is mapped to the correct index
        words.forEach((word, index) => {
            expect(wordToIndex[word]).toBe(index);
        });
    });

    it("should return vocabulary size", () => {
        // Get the vocabulary size
        const size = vocabulary.getVocabularySize();

        // Check if the vocabulary size matches the number of words
        expect(size).toBe(words.length);
    });
});