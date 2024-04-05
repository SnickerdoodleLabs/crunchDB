import { FileUtils } from './FileUtils';

export class MakeUtils{
    errorDirectory: string = 'src/objects/error/';
    public async makeError(name: string): Promise<boolean> {
        if (await this.hasError(name)) {
            return false;
        }
        return await FileUtils.writeFile(this.errorPath(name), this.errorTemplate(name));
    }
    private async hasError(name: string): Promise<boolean> {
        return FileUtils.exists(this.errorPath(name));
    }
    private errorPath(name: string): string {
        return this.errorDirectory + name + '.ts';    
    }
    private errorTemplate(name: string): string {
        return `export class ${name} extends Error {}`;
    }


}