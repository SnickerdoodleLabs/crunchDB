import { DuplicateWordError, Word, WordRoot } from "crunchDB/objects";
import { IVocabulary } from "./IVocabulary";
import { ResultAsync } from "neverthrow";

export interface IIncrementalVocabulary extends IVocabulary {
    /*
    * @param word: a word/ word root
    * @description: adds a word/ word root to the vocabulary 
    * @returns ResultAsync<void, DuplicateWordError>
    * @throws DuplicateWordError if the word/ word root is already present in the vocabulary
    * */
    addWord(word: Word | WordRoot): ResultAsync<void, DuplicateWordError>;
}
export const IIncrementalVocabularyType = Symbol.for("IIncrementalVocabulary");
