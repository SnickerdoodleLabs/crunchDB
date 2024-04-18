import { Brand, make } from "ts-brand";
import { Embedding } from "objects/primitive/Embedding";

export type ContentEmbedding = Brand<Embedding, "ContentEmbedding">;
export const ContentEmbedding = make<ContentEmbedding>();
