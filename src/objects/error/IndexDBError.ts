import { BaseError } from "./BaseError";
import errorCodes from "./errorCodes";

export class IndexDBError extends BaseError {
    protected errorCode: string = errorCodes[IndexDBError.name];
    constructor(
      message: string,
      public src?: unknown,
    ) {
      super(message, errorCodes[IndexDBError.name], src);
    }
}