import { VocabularySize, Word, WordIndex, WordRoot, WordToIndex } from "crunchDB/objects";

export interface IVocabulary {
    getWordToIndex(): WordToIndex;
    getVocabularySize(): VocabularySize;
    getWordIndex(word: Word | WordRoot): WordIndex;
    getWordFromIndex(index: WordIndex): Word | WordRoot;
}
export const IVocabularyType = Symbol.for("IVocabulary");
