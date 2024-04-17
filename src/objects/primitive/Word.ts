import { Brand, make } from "ts-brand";
export type Word = Brand<string, "Word">;
export const Word = make<Word>();
