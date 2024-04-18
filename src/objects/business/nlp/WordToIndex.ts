import { WordIndex, WordRoot } from "objects/primitive";
import { Word } from "objects/primitive/Word";
export type WordToIndex = {
    [key: Word | WordRoot]: WordIndex;
}