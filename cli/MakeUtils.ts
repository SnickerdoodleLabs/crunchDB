import { ErrorMaker, BrandMaker, InterfaceMaker } from './makers';
import { ResultAsync, okAsync } from 'neverthrow';

export class MakeUtils{
    errorMaker: ErrorMaker = new ErrorMaker();
    brandMaker: BrandMaker = new BrandMaker();
    interfaceMaker: InterfaceMaker = new InterfaceMaker();
    public makeError(name: string): ResultAsync<void, Error> {
        return this.errorMaker.makeError(name);
   
    }
    public makeBrand(name: string, type: string, domain: string): ResultAsync<void, Error> {
        if (!type || type === "") {
            type = "unknown";
        }
        return this.brandMaker.make(name, type, domain);
   
    }
    public makeInterface(name: string, domain: string): ResultAsync<void, Error> {
        if (!name.startsWith("I")) {
            name = "I" + name;
        }
        return this.interfaceMaker.make(name, domain);
   
    }


    
}