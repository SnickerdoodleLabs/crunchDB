import { FileUtils } from '../FileUtils';
import { errorTemplate, errorCodesTemplate } from './codeTemplates';
import errorCodes from '../../src/objects/error/errorCodes';
import { ResultAsync, okAsync } from 'neverthrow';

export class ErrorMaker{
    errorDirectory: string = 'src/objects/error/';
    public makeError(name: string): ResultAsync<void, Error> {
        return this.noExists(name)
            .andThen((e) =>{
                // console.log('Error does not exist');
                return FileUtils.writeFile(this.errorPath(name), this.errorTemplate(name))
                    .andThen(() => {
                        return this.addErrorType(name)
                            .andThen(() => {
                                return this.addToIndex(name)
                            })
                            .mapErr((e) => {
                                return new Error(`Error adding to index. Please add ${name} to ${this.errorIndexPath()} manually.`)
                            })
                    });
            }).mapErr((e) => {
                // console.log('Error exists', e);
                return new Error("Error already exists"); 
            });
            
    }
    private noExists(name: string): ResultAsync<void, Error> {
        return FileUtils.notExists(this.errorPath(name));
    }
    private errorPath(name: string): string {
        return this.errorDirectory + name + '.ts';    
    }
    private errorCodePath(): string {
        return this.errorDirectory + "errorCodes" + '.ts';    
    }
    private errorIndexPath(): string {
        return this.errorDirectory + 'index.ts';
    }
    private errorTemplate(name: string): string {
        return errorTemplate.replace(new RegExp('@@@name@@@', 'g'), name);
    }
    private addErrorType(name: string): ResultAsync<void, Error> {
        const newErrorCodes = { ...errorCodes, [name]: `ERR_${name}` };
        let strBuff: string[] = [];
        for (const key in newErrorCodes) {
            strBuff.push(`    ${key}: "${newErrorCodes[key]}",`);
        }
        const body = strBuff.join('\n');
        const content = errorCodesTemplate.replace(new RegExp('@@@errorCodes@@@', 'g'), body);
        console.log(content);
        return FileUtils.writeFile(this.errorCodePath(), content);
    }

    private addToIndex(name: string): ResultAsync<void, Error> {

        // check if the class exists in the index file
        const classRelativePath = `./${name}`;
        return FileUtils.readFile(this.errorIndexPath())
        .andThen((content) => {
            if (content.includes("export {}")) {
                content = ""; // reset
            }
            if (content.includes(classRelativePath)) {
                return okAsync(undefined);
            } else {
                content += `export * from '${classRelativePath}';\n`;
                return FileUtils.writeFile(this.errorIndexPath(), content);
            }
        });
    }

}