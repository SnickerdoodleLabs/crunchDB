import { FileUtils } from '../FileUtils';
import { brandTemplate} from './codeTemplates';
import { ResultAsync, okAsync } from 'neverthrow';

export class BrandMaker{
    directory: string = 'src/objects/primitive/';
    public make(name: string, type: string, domain: string): ResultAsync<void, Error> {
        return this.noExists(name, domain)
            .andThen((e) =>{
                // console.log('Brand does not exist');
                return FileUtils.writeFile(this.classPath(name, domain), this.template(name, type))
                    .andThen(() => {
                        
                        return this.addToIndex(name, domain)
                        .mapErr((e) => {
                            return new Error(`Brand adding to index. Please add ${name} to ${this.indexPath(domain)} manually.`)
                        })
                    });
            }).mapErr((e) => {
                // console.log('Brand exists', e);
                return new Error("Brand already exists"); 
            });
            
    }
    private noExists(name: string, domain: string): ResultAsync<void, Error> {
        return FileUtils.notExists(this.classPath(name, domain));
    }

    private getDirectory(domain: string): string {
        if (domain && domain !== "") {
            return this.directory.replace("primitive", "business/" + domain);
        }
        return this.directory;
    }
    private classPath(name: string, domain: string): string {
        const classPath = this.getDirectory(domain) + name + '.ts';    

        console.log('domain', domain);
        console.log('classPath', classPath);
        return classPath;   
    }

    private indexPath(domain: string): string {
        return this.getDirectory(domain) + 'index.ts';
    }
    private template(name: string, type: string): string {
        return brandTemplate.replace(new RegExp('@@@name@@@', 'g'), name).replace(new RegExp('@@@type@@@', 'g'), type);
    }

    private addToIndex(name: string, domain: string): ResultAsync<void, Error> {

        // check if the class exists in the index file
        const classRelativePath = `./${name}`;
        const indexPath = this.indexPath(domain);
        return FileUtils.readFile(indexPath)
        .andThen((content) => {
            if (content.includes("export {}")) {
                content = ""; // reset
            }
            if (content.includes(classRelativePath)) {
                return okAsync(undefined);
            } else {
                content += `export * from '${classRelativePath}';\n`;
                return FileUtils.writeFile(indexPath, content);
            }
        });
    }

}