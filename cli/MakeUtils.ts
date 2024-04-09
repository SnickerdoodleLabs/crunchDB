import { ErrorMaker } from './makers';
import { ResultAsync, okAsync } from 'neverthrow';

export class MakeUtils{
    errorMaker: ErrorMaker = new ErrorMaker();
    public makeError(name: string): ResultAsync<void, Error> {
        return this.errorMaker.makeError(name);
   
    }
}