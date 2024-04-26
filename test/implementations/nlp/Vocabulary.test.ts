import { Vocabulary } from "crunchDB/implementations";
import { Word, WordRoot, WordIndex, WordToIndex, VocabularySize } from "crunchDB/objects"; 

describe("Vocabulary", () => {
    const words: (Word | WordRoot)[] = [Word("apple"), Word("banana"), Word("orange")];
    let vocabulary: Vocabulary;

    beforeEach(() => {
        
        const currentTestName = expect.getState().currentTestName;

        if (currentTestName === "Vocabulary should not assign an index to a word that already has an index") {
            words.push(Word("apple")); // Add a duplicate word to the vocabulary
        }

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
        const wordToIndex: WordToIndex = vocabulary.getWordToIndex();

        // Check if each word is mapped to the correct index
        words.forEach((word, index) => {
            expect(wordToIndex.get(word)).toBe(index);
        });
    });

    it("should return vocabulary size", () => {
        // Get the vocabulary size
        const size : VocabularySize = vocabulary.getVocabularySize();

        // Check if the vocabulary size matches the number of words
        expect(size).toBe(words.length);
    });

    test("should not assign an index to a word that already has an index", () => {
        // This test will have "apple" in the vocabulary due to beforeEach modification

        // Check if the vocabulary size is still the same since "apple" is a duplicate
        expect(vocabulary.getVocabularySize()).toBe(3);
    });

    it("should return null for a word that is not present in the vocabulary", () => {
        // Check if getIndex returns null for a word not present in the vocabulary
        const nonExistentWord : Word  = Word("grape");
        expect(vocabulary.getWordIndex(nonExistentWord)).toBeNull();
    });
});