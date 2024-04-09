import * as fs from 'node:fs/promises';
import { ResultAsync } from 'neverthrow';

export class FileUtils {
    static exists(path: string): ResultAsync<void, Error>{
        // const p = fs.access(path)
        //     .then(() => true)
        //     .catch((e) => false);
        // return ResultAsync.fromSafePromise(p)
        return ResultAsync.fromPromise(
            fs.stat(path).then((stat) =>{
                if(stat.isFile()){
                    return Promise.resolve();
                } else {
                    return Promise.reject(new Error('Not a file'));
                }
            
            }), 
            (e) => new Error(`Error checking file: ${e}`)
            );
    }
    static writeFile(path: string, content: string): ResultAsync<void, Error> {
        // const p = fs.writeFile(path, content)
        //         .then(() => true)
        //         .catch(() => false);
        return ResultAsync.fromPromise(fs.writeFile(path, content), (e) => new Error(`Error writing file: ${e}`));
    }
    static readFile(path: string): ResultAsync<string, Error> {
        return ResultAsync.fromPromise(fs.readFile(path, 'utf-8'), (e) => new Error(`Error reading file: ${e}`));
    }
}