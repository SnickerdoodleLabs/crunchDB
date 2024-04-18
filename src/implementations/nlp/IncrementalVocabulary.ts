import { IIncrementalVocabulary } from "interfaces";
import { Word, WordRoot, VocabularySize, WordIndex } from "objects";
import { WordToIndex } from "objects/business/nlp/WordToIndex";
import { Vocabulary } from "./Vocabulary";

export class IncrementalVocabulary extends Vocabulary implements IIncrementalVocabulary {
    public addWord(word: Word | WordRoot): void {
        this.wordToIndex[word] = WordIndex(this.indexToWord.length);
        this.indexToWord.push(word);
    }

}