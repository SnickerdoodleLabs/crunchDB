import { BaseError } from "./BaseError";
import errorCodes from "./errorCodes";

export class MatrixOperatorsError extends BaseError {
    protected errorCode: string = errorCodes[MatrixOperatorsError.name];
    constructor(
      message: string,
      public src?: unknown,
    ) {
      super(message, errorCodes[MatrixOperatorsError.name], src);
    }
}