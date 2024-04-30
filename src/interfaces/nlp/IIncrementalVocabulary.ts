import { Word, WordRoot } from "crunchDB/objects";
import { IVocabulary } from "./IVocabulary";
import { ResultAsync } from "neverthrow";

export interface IIncrementalVocabulary extends IVocabulary {
    addWord(word: Word | WordRoot): ResultAsync<void, never>;
}
export const IIncrementalVocabularyType = Symbol.for("IIncrementalVocabulary");
