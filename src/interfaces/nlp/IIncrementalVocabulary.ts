import { Word, WordRoot } from "crunchDB/objects";
import { IVocabulary } from "./IVocabulary";

export interface IIncrementalVocabulary extends IVocabulary {
    addWord(word: Word | WordRoot): void;
}
export const IIncrementalVocabularyType = Symbol.for("IIncrementalVocabulary");
