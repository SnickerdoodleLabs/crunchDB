import { BaseError } from "./BaseError";
import errorCodes from "./errorCodes";

export class DataError extends BaseError {
    protected errorCode: string = errorCodes[DataError.name];
    constructor(
      message: string,
      public src?: unknown,
    ) {
      super(message, errorCodes[DataError.name], src);
    }
}