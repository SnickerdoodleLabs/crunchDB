import { IVocabulary } from "interfaces";
import { VocabularySize, Word, WordRoot, WordIndex, WordToIndex } from "objects";

export class Vocabulary implements IVocabulary {

    protected wordToIndex: WordToIndex = {};
    protected indexToWord: (Word | WordRoot)[] = [];

    public constructor(words: (Word | WordRoot)[]) {

        for (let i = 0; i < words.length; i++) {
            this.wordToIndex[words[i] as string] = WordIndex(i);
            this.indexToWord[i] = words[i];
        }
    }

    public getWordToIndex(): WordToIndex {
        return this.wordToIndex;
    }
    public getVocabularySize(): VocabularySize {
        return VocabularySize(this.indexToWord.length);
    }
    public getWordIndex(word: Word | WordRoot): WordIndex {
        return this.wordToIndex[word];
    }
    public getWordFromIndex(index: WordIndex): Word | WordRoot {
        return this.indexToWord[index];
    }
    
}