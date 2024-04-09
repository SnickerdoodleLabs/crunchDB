import { FileUtils } from '../FileUtils';
import { errorTemplate, errorCodesTemplate } from './codeTemplates';
import errorCodes from '../../src/objects/error/errorCodes';

export class ErrorMaker{
    errorDirectory: string = 'src/objects/error/';
    public async makeError(name: string): Promise<boolean> {
        if (await this.hasError(name)) {
            return false;
        }
        return FileUtils.writeFile(this.errorPath(name), this.errorTemplate(name)).then((createdErrorClass) => {

            if (createdErrorClass) {
                return this.addErrorType(name).then((addedType) => {
                    if (addedType) {
                        return this.addToIndex(name).then((addedToIndex) => {
                            if (addedToIndex) {
                                return true;
                            } else {
                                console.error(`Error adding to index. Please add ${name} to ${this.errorIndexPath()} manually.`);
                                return false;
                            }
                        });
                    } else {
                        return false;
                    }
                });
            } else {
                return false;
            }
        })
    }
    private async hasError(name: string): Promise<boolean> {
        return FileUtils.exists(this.errorPath(name));
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
    private addErrorType(name: string): Promise<boolean> {
        const newErrorCodes = { ...errorCodes, [name]: `ERR_${name}` };
        let strBuff: string[] = [];
        for (const key in newErrorCodes) {
            strBuff.push(`    ${key}: "${newErrorCodes[key]}",`);
        }
        const body = strBuff.join('\n');
        const content = errorCodesTemplate.replace(new RegExp('@@@errorCodes@@@', 'g'), body);
        console.log(content);
        return FileUtils.writeFile(this.errorCodePath(), content).then((res) => {
            if (res) {
                return this.addToIndex(this.errorDirectory + 'index.ts', `./${name}`);
            } else {
                return false;
            }
        });
    }

    private addToIndex(name: string): Promise<boolean> {

        // check if the class exists in the index file
        const classRelativePath = `./${name}`;
        return FileUtils.readFile(this.errorIndexPath()).then((content) => {
            if (content.includes(classRelativePath)) {
                return Promise.resolve(true);
            } else {
                content += `export * from '${classRelativePath}';\n`;
                return FileUtils.writeFile(this.errorIndexPath(), content);
            }
        });
    }

    private cleanUpErrorCodesCompiled(): Promise<boolean> {
        // return FileUtils.exists(this.errorCodePath(name));
        return Promise.resolve(true); // TODO
    }


}