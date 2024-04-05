import { FileUtils } from './FileUtils';
import { errorTemplate, errorCodesTemplate } from './codeTemplates';
import errorCodes from '../src/objects/error/errorCodes';

export class MakeUtils{
    errorDirectory: string = 'src/objects/error/';
    public async makeError(name: string): Promise<boolean> {
        if (await this.hasError(name)) {
            return false;
        }
        const res = await FileUtils.writeFile(this.errorPath(name), this.errorTemplate(name));
        if (res) {
            return this.addErrorType(name);
        } else {
            return false;
        }
    }
    private async hasError(name: string): Promise<boolean> {
        return FileUtils.exists(this.errorPath(name));
    }
    private errorPath(name: string): string {
        return this.errorDirectory + name + '.ts';    
    }
    private errorCodePath(name: string): string {
        return this.errorDirectory + "errorCodes" + '.ts';    
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
        return FileUtils.writeFile(this.errorCodePath(name), content);
    }

    private cleanUpErrorCodesCompiled(): Promise<boolean> {
        // return FileUtils.exists(this.errorCodePath(name));
        return Promise.resolve(true); // TODO
    }


}