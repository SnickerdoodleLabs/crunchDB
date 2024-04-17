import { Brand, make } from "ts-brand";
import { Embedding } from "objects/primitive/Embedding";

export type UserEmbedding = Brand<Embedding, "UserEmbedding">;
export const UserEmbedding = make<UserEmbedding>();
