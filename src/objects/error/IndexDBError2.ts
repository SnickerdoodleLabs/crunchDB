import { BaseError } from "./BaseError";
import errorCodes from "./errorCodes";

export class IndexDBError2 extends BaseError {
    protected errorCode: string = errorCodes[IndexDBError2.name];
    constructor(
      message: string,
      public src?: unknown,
    ) {
      super(message, errorCodes[IndexDBError2.name], src);
    }
}