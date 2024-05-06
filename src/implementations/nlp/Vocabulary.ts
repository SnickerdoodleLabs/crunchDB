import { IVocabulary } from "crunchDB/interfaces";
import { VocabularySize, Word, WordRoot, WordIndex, WordToIndex } from "crunchDB/objects";

export class Vocabulary implements IVocabulary {

  /*
  * @description: a map mapping words/ word roots to their respective indices
  * */
  protected wordToIndex : WordToIndex = new Map<Word | WordRoot, WordIndex>();

  /*
  * @description: an array containing words/ word roots at their respective indices
  * */
  protected indexToWord: (Word | WordRoot)[] = [];

  public constructor(words: (Word | WordRoot)[]) {
    this.buildVocabulary(words);
  }

  /*
  * @param words: an array of words/ word roots
  * @returns void
  * @description: builds the vocabulary by assigning an index to each word/ word root, here we consider that each word is unique
  * */
  private buildVocabulary(words: (Word | WordRoot)[]) {
    for (let i = 0; i < words.length; i++) {
      if (!this.wordToIndex.has(words[i])) // duplicate check
      {
        this.wordToIndex.set(words[i], WordIndex(i)); // assign index to word/ word root
        this.indexToWord[i] = words[i]; // assign word/ word root to index;
      }
    }
  }

  /*
  * @returns WordToIndex
  * @description: returns the map mapping words/ word roots to their respective indices
  * */
  public getWordToIndex(): WordToIndex {
    return this.wordToIndex;
  }
/*
    * @returns VocabularySize
    * @description: returns the size of the vocabulary
    * */
    public getVocabularySize(): VocabularySize {
        return VocabularySize(this.indexToWord.length);
    }
    /*
    * @param word: a word/ word root
    * @returns WordIndex
    * @description: returns the index of the word/ word root and null if the word/ word root is not found
    * */
    public getWordIndex(word: Word | WordRoot): WordIndex | null {
      const wordIndex = this.wordToIndex.get(word);
      return wordIndex !== undefined ? wordIndex : null;
    }
    /*
    * @param index: an index
    * @returns Word | WordRoot
    * @description: returns the word/ word root at the given index
    * */
    public getWordFromIndex(index: WordIndex): Word | WordRoot {
        return this.indexToWord[index];
    }
    
}