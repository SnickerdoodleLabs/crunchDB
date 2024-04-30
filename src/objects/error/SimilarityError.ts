import { BaseError } from "./BaseError";
import errorCodes from "./errorCodes";

export class SimilarityError extends BaseError {
    protected errorCode: string = errorCodes[SimilarityError.name];
    constructor(
      message: string,
      public src?: unknown,
    ) {
      super(message, errorCodes[SimilarityError.name], src);
    }
}