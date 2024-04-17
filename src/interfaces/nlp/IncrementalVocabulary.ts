import { Word, WordRoot } from "objects";
import { IVocabulary } from "./IVocabulary";

export interface IncrementalVocabulary extends IVocabulary {
    addWord(word: Word | WordRoot): void;
}
export const IncrementalVocabularyType = Symbol.for("IncrementalVocabulary");
