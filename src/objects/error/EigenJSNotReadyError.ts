import { BaseError } from "./BaseError";
import errorCodes from "./errorCodes";

export class EigenJSNotReadyError extends BaseError {
    protected errorCode: string = errorCodes[EigenJSNotReadyError.name];
    constructor(
      message: string,
      public src?: unknown,
    ) {
      super(message, errorCodes[EigenJSNotReadyError.name], src);
    }
}