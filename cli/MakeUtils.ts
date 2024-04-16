import { ErrorMaker, BrandMaker } from './makers';
import { ResultAsync, okAsync } from 'neverthrow';

export class MakeUtils{
    errorMaker: ErrorMaker = new ErrorMaker();
    brandMaker: BrandMaker = new BrandMaker();
    public makeError(name: string): ResultAsync<void, Error> {
        return this.errorMaker.makeError(name);
   
    }
    public makeBrand(name: string, type: string, domain: string): ResultAsync<void, Error> {
        return this.errorMaker.makeError(name);
   
    }

    
}