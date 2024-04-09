import { ErrorMaker } from './makers';

export class MakeUtils{
    errorMaker: ErrorMaker = new ErrorMaker();
    public async makeError(name: string): Promise<boolean> {
        return this.errorMaker.makeError(name);
   
    }
}