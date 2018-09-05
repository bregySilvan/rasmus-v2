
import * as fs from 'fs-extra';
import { resolve } from 'dns';

export function copyFile(sourceFile: string, newFile: string): void {
    // Async with promises:
    fs.copy(sourceFile, newFile)
        .then(() => { })
        .catch(err => console.error(err))

}

export async function listFiles(directory: string): Promise<string[]> {
    return new Promise<string[]>((resolve, reject) => {
        fs.readdir(directory, (err, files) => {
            if (err) {
                console.error(err);
                return resolve([]);
            }
            resolve(files);
        })
    });
}
