import { FileUtils } from '../FileUtils';
import { brandTemplate} from './codeTemplates';
import { ResultAsync, okAsync } from 'neverthrow';

export class BrandMaker{
    errorDirectory: string = 'src/objects/primitive/';
    public make(name: string, domain): ResultAsync<void, Error> {
        return this.noExists(name)
            .andThen((e) =>{
                // console.log('Error does not exist');
                return FileUtils.writeFile(this.classPath(name), this.template(name))
                    .andThen(() => {
                        
                        return this.addToIndex(name)
                        .mapErr((e) => {
                            return new Error(`Error adding to index. Please add ${name} to ${this.indexPath()} manually.`)
                        })
                    });
            }).mapErr((e) => {
                // console.log('Error exists', e);
                return new Error("Error already exists"); 
            });
            
    }
    private noExists(name: string): ResultAsync<void, Error> {
        return FileUtils.notExists(this.classPath(name));
    }
    private classPath(name: string): string {
        return this.errorDirectory + name + '.ts';    
    }
    private indexPath(): string {
        return this.errorDirectory + 'index.ts';
    }
    private template(name: string): string {
        return brandTemplate.replace(new RegExp('@@@name@@@', 'g'), name);
    }

    private addToIndex(name: string): ResultAsync<void, Error> {

        // check if the class exists in the index file
        const classRelativePath = `./${name}`;
        return FileUtils.readFile(this.indexPath())
        .andThen((content) => {
            if (content.includes("export {}")) {
                content = ""; // reset
            }
            if (content.includes(classRelativePath)) {
                return okAsync(undefined);
            } else {
                content += `export * from '${classRelativePath}';\n`;
                return FileUtils.writeFile(this.indexPath(), content);
            }
        });
    }

}