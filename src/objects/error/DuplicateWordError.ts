import { BaseError } from "./BaseError";
import errorCodes from "./errorCodes";

export class DuplicateWordError extends BaseError {
    protected errorCode: string = errorCodes[DuplicateWordError.name];
    constructor(
      message: string,
      public src?: unknown,
    ) {
      super(message, errorCodes[DuplicateWordError.name], src);
    }
}