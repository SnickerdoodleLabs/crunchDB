import { Brand, make } from "ts-brand";
import { Vector } from "./Vector";
export type Embedding = Brand<Vector, "Embedding">;
export const Embedding = make<Embedding>();
