import { IncrementalVocabulary } from  "crunchDB/implementations";
import {  Word, WordRoot } from "crunchDB/objects";
describe("IncrementalVocabulary", () => {
  const words: (Word | WordRoot)[] = [Word("apple"), Word("banana"), Word("orange")];
  let iVocabulary: IncrementalVocabulary;

  beforeEach(() => {
    iVocabulary = new IncrementalVocabulary(words);
  });

  it("should add words to the vocabulary", async () => {

    const word = Word("grape");
    const result = await iVocabulary.addWord(word);
    expect(result.isOk()).toBe(true);
    expect(iVocabulary.getVocabularySize()).toBe(4);
  });

  it("should not add duplicate words to the vocabulary", async () => {
    const word = Word("apple");
    const result = await iVocabulary.addWord(word);
    expect(result.isErr()).toBe(true);
    expect(iVocabulary.getVocabularySize()).toBe(3);
  });
});
