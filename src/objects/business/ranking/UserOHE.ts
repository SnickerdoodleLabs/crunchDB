import { Brand, make } from "ts-brand";
import { OHE } from "objects/primitive/OHE";

export type UserOHE = Brand<OHE, "UserOHE">;
export const UserOHE = make<UserOHE>();
