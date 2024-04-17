import { BaseError } from './BaseError';
import errorCodes from './errorCodes';

export class PersistenceError extends BaseError {
  protected errorCode: string = errorCodes[PersistenceError.name];
  constructor(message: string, public src?: unknown) {
    super(message, errorCodes[PersistenceError.name], src);
  }
}
