import { VocabularySize, Word, WordIndex, WordRoot } from "objects";
import { WordToIndex } from "objects/business/nlp/WordToIndex";

export interface IVocabulary {
    getWordToIndex(): WordToIndex;
    getVocabularySize(): VocabularySize;
    getWordIndex(word: Word | WordRoot): WordIndex;
    getWordFromIndex(index: WordIndex): Word | WordRoot;
}
export const IVocabularyType = Symbol.for("IVocabulary");
