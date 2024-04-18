import { FileUtils } from '../FileUtils';
import { interfaceTemplate } from './codeTemplates';
import { ResultAsync, okAsync } from 'neverthrow';

export abstract class BaseMaker{
    public addToClassPathToIndex(classRelativePath: string, indexPath: string): ResultAsync<void, Error> {

        // check if the class exists in the index file
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