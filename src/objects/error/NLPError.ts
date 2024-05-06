import { BaseError } from "./BaseError";
import errorCodes from "./errorCodes";

export class NLPError extends BaseError {
    protected errorCode: string = errorCodes[NLPError.name];
    constructor(
      message: string,
      public src?: unknown,
    ) {
      super(message, errorCodes[NLPError.name], src);
    }
}