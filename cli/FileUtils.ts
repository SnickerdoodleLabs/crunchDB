import * as fs from 'node:fs/promises';
import { ResultAsync } from 'neverthrow';

export class FileUtils {
    static exists(path: string): ResultAsync<void, Error>{
        return ResultAsync.fromPromise(
            fs.stat(path).then((stat) =>{
                if(stat.isFile()){
                    console.log('File exists');
                    return Promise.resolve();
                } else {
                    console.log('File does not exist');
                    return Promise.reject(new Error('Not a file'));
                }
            
            }), 
            (e) => new Error(`Error checking file: ${e}`)
            );
    }

    static async _notExists(path: string): Promise<boolean> {
        let notExists = true;
        try {
            const stat = await fs.stat(path);
            if (stat.isFile() || stat.isDirectory()) {
                notExists = false;
            }
        } catch (e) {
        }
        if (notExists) {
            return true;
        }

        throw new Error('File exists');

    }
    static notExists(path: string): ResultAsync<void, Error>{
        return ResultAsync.fromPromise(
            this._notExists(path).then((res) => {}),
            (e) => new Error(`${e}`)
        );
    }
    static writeFile(path: string, content: string): ResultAsync<void, Error> {
        return ResultAsync.fromPromise(fs.writeFile(path, content), (e) => new Error(`Error writing file: ${e}`));
    }
    static readFile(path: string): ResultAsync<string, Error> {
        return ResultAsync.fromPromise(fs.readFile(path, 'utf-8'), (e) => new Error(`Error reading file: ${e}`));
    }
}