import { Word, WordRoot, WordIndex, DuplicateWordError } from "crunchDB/objects";
import { IIncrementalVocabulary } from "crunchDB/interfaces"; 
import { Vocabulary } from "./Vocabulary";
import {  okAsync, errAsync,  ResultAsync } from 'neverthrow'; 

export class IncrementalVocabulary extends Vocabulary implements IIncrementalVocabulary {

  /*
  * @param words: an array of words/ word roots
  * @description: adds words/ word roots to the vocabulary
  * @throws Err if the word/ word root is already present in the vocabulary
  * */
  public addWord(word: Word | WordRoot): ResultAsync<void, DuplicateWordError> {
    if (this.wordToIndex.has(word)) { // duplicate check 
      return errAsync( new DuplicateWordError("Word already exists in the vocabulary")); 
    }
    else{
      this.wordToIndex.set(word, WordIndex(this.wordToIndex.size));
      this.indexToWord.push(word); 
      return okAsync(void 0);
    }

  }
}

