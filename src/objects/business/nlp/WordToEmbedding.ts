import { Embedding } from "objects/primitive";
import { Word } from "objects/primitive/Word";
export type WordToEmbedding = {
    [key: Word]: Embedding;
}