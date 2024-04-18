import { Brand, make } from "ts-brand";
import { OHE } from "objects/primitive/OHE";

export type ContentOHE = Brand<OHE, "ContentOHE">;
export const ContentOHE = make<ContentOHE>();
