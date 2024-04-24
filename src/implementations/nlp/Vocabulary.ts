import { IVocabulary } from "crunchDB/interfaces";
import { VocabularySize, Word, WordRoot, WordIndex, WordToIndex } from "crunchDB/objects";

export class Vocabulary implements IVocabulary {

    /*
    * @description: a dictionary mapping words/ word roots to their respective indices
    * */
    protected wordToIndex: WordToIndex = {}; 
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
            if(! this.wordToIndex.hasOwnProperty(words[i])) // duplicate check 
            {
                this.wordToIndex[words[i] as string] = WordIndex(i);// assign index to word/ word root
                this.indexToWord[i] = words[i]; // assign word/ word root to index;
            }
        }
    }

    /*
    * @returns WordToIndex
    * @description: returns the dictionary mapping words/ word roots to their respective indices
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
    * @description: returns the index of the word/ word root
    * */
    public getWordIndex(word: Word | WordRoot): WordIndex {
        return this.wordToIndex[word];
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