import { FileUtils } from '../FileUtils';
import { BaseMaker } from './BaseMaker';
import { interfaceTemplate } from './codeTemplates';
import { ResultAsync, okAsync } from 'neverthrow';

export class InterfaceMaker extends BaseMaker {
    directory: string = 'src/interfaces/';
    public make(name: string, domain: string): ResultAsync<void, Error> {
        return this.noExists(name, domain)
            .andThen((e) =>{
                return FileUtils.writeFile(this.classPath(name, domain), this.template(name))
                    .andThen(() => {
                        
                        return this.addToIndex(name, domain)
                        .mapErr((e) => {
                            return new Error(`Interface adding to index. Please add ${name} to ${this.indexPath(domain)} manually.`)
                        })
                    });
            }).mapErr((e) => {
                return new Error("Interface already exists at " + this.classPath(name, domain)); 
            });
            
    }
    private noExists(name: string, domain: string): ResultAsync<void, Error> {
        return FileUtils.notExists(this.classPath(name, domain));
    }

    private getDirectory(domain: string): string {
        if (domain && domain !== "") {
            return this.directory.substring(0, this.directory.length - 1) + domain + "/";
        }
        return this.directory;
    }
    private classPath(name: string, domain: string): string {
        const classPath = this.getDirectory(domain) + name + '.ts';    

        // console.log('domain', domain);
        console.log('classPath', classPath);
        return classPath;   
    }

    private indexPath(domain: string): string {
        return this.getDirectory(domain) + 'index.ts';
    }
    private template(name: string): string {
        return interfaceTemplate.replace(new RegExp('@@@name@@@', 'g'), name);
    }

    private addToIndex(name: string, domain: string): ResultAsync<void, Error> {

        // check if the class exists in the index file
        const classRelativePath = `./${name}`;
        const indexPath = this.indexPath(domain);
        return this.addToClassPathToIndex(classRelativePath, indexPath);
    }

}