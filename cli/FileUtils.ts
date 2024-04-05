import * as fs from 'node:fs/promises';

export class FileUtils {
    static exists(path: string): Promise<boolean> {
        return fs.access(path)
            .then(() => true)
            .catch(() => false);
    }
    static writeFile(path: string, content: string): Promise<boolean> {
        return fs.writeFile(path, content)
                .then(() => true)
                .catch(() => false);
    }
}