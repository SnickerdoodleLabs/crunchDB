import { Word, WordRoot, WordIndex } from "crunchDB/objects";
import { IIncrementalVocabulary } from "crunchDB/interfaces"; 
import { Vocabulary } from "./Vocabulary";
import {  Err } from 'neverthrow'; 

export class IncrementalVocabulary extends Vocabulary implements IIncrementalVocabulary {

  /*
  * @param words: an array of words/ word roots
  * @description: adds words/ word roots to the vocabulary
  * @throws Err if the word/ word root is already present in the vocabulary
  * */
  public addWord(word: Word | WordRoot): void {
    if (this.wordToIndex.hasOwnProperty(word)) {
      
      throw new Err(`Duplicate word "${word}" cannot be added.`);
    }
    this.wordToIndex[word] = WordIndex(this.indexToWord.length);
    this.indexToWord.push(word);
  }
}

